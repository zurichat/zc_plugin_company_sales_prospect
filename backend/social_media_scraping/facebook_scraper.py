import itertools
import logging
from urllib.parse import urljoin
import warnings
import re
from functools import partial
from typing import Iterator, Union
import json
from urllib.parse import parse_qs, urlparse

from requests import RequestException
# from requests_html import HTMLSession


from typing import Any, Dict

from urllib.parse import urljoin

Profile = Dict[str, Any]

logger = logging.getLogger(__name__)


class FacebookScraper:
    """Class for creating FacebookScraper Iterators"""

    base_url = 'https://m.facebook.com/'
    default_headers = {
        'Accept-Language': 'en-US,en;q=0.5',
        "Sec-Fetch-User": "?1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36",
    }
    have_checked_locale = False

    def __init__(self, session=None, requests_kwargs=None):
        if session is None:
            session = HTMLSession()
            session.headers.update(self.default_headers)

        if requests_kwargs is None:
            requests_kwargs = {}

        self.session = session
        self.requests_kwargs = requests_kwargs



    def get_profile(self, account, **kwargs) -> Profile:
        account = account.replace("profile.php?id=", "")
        result = {}

        if kwargs.get("allow_extra_requests", True):
            logger.debug(f"Requesting page from: {account}")
            response = self.get(account)
 
        about_url = urljoin('https://m.facebook.com/', f'/{account}/about/')
        logger.debug(f"Requesting page from: {about_url}")
        response = self.get(about_url)
        match = re.search(r'entity_id:(\d+),', response.html.html)
        if match:
            result["id"] = match.group(1)
        # Profile name is in the title
        title = response.html.find("title", first=True).text
        if " | " in title:
            title = title.split(" | ")[0]
        result["Name"] = title

        about = response.html.find("div#main_column,div.aboutme", first=True)
        if not about:
            logger.warning("No about section found")
            return result
        for card in about.find("div[data-sigil='profile-card']"):
            header = card.find("header", first=True).text
            if header.startswith("About"):
                header = "About"  # Truncate strings like "About Mark"
            if header in ["Work, Education"]:
                experience = []
                for elem in card.find("div.experience"):
                    xp = {}
                    try:
                        xp["link"] = elem.find("a", first=True).attrs["href"]
                    except:
                        pass
                    bits = elem.text.split("\n")
                    if len(bits) == 2:
                        xp["text"], xp["type"] = bits
                    elif len(bits) == 3:
                        xp["text"], xp["type"], xp["year"] = bits
                    else:
                        xp["text"] = elem.text
                    experience.append(xp)
                result[header] = experience
            elif header == "Places lived":
                places = []
                for elem in card.find("div.touchable"):
                    place = {}
                    try:
                        place["link"] = elem.find("a", first=True).attrs["href"]
                    except:
                        pass
                    if "\n" in elem.text:
                        place["text"], place["type"] = elem.text.split("\n")
                    else:
                        place["text"] = elem.text
                    places.append(place)
                result[header] = places
            else:
                bits = card.text.split("\n")[1:]  # Remove header
                if len(bits) >= 3 and header == "Relationship":
                    result[header] = {"to": bits[0], "type": bits[1], "since": bits[2]}
                elif len(bits) == 1:
                    result[header] = bits[0]
                elif (
                    header in ["Contact Info", "Basic info", "Other names"] and len(bits) % 2 == 0
                ):  # Divisible by two, assume pairs
                    pairs = {}
                    for i in range(0, len(bits), 2):
                        if bits[i + 1] == "Websites":
                            if "Websites" not in pairs:
                                pairs["Websites"] = []
                            pairs["Websites"].append(bits[i])
                        else:
                            pairs[bits[i + 1]] = bits[i]
                    result[header] = pairs
                else:
                    result[header] = "\n".join(bits)
        if kwargs.get("friends"):
            result["Friends"] = list(self.get_friends(account, **kwargs))
        return result
        
    def check_locale(self, response):
        if self.have_checked_locale:
            return
        match = re.search(r'"IntlCurrentLocale",\[\],{code:"(\w{2}_\w{2})"}', response.text)
        if match:
            locale = match.groups(1)[0]
            if locale != "en_US":
                warnings.warn(f"Locale detected as {locale} - for best results, set to en_US")
            self.have_checked_locale = True

    def get(self, url, **kwargs):
        try:
            if not url.startswith("http"):
                url = urljoin('https://m.facebook.com/', url)
            response = self.session.get(url=url, **self.requests_kwargs, **kwargs)
            response.html.html = response.html.html.replace('<!--', '').replace('-->', '')
            response.raise_for_status()
            self.check_locale(response)
            if "cookie/consent-page" in response.url:
                response = self.submit_form(response)
            if (
                response.url.startswith('https://m.facebook.com/')
                and not response.html.find("script", first=True)
                and "script" not in response.html.html
                and self.session.cookies.get("noscript") != "1"
            ):
                warnings.warn(
                    f"Facebook served mbasic/noscript content unexpectedly on {response.url}"
                )
            title = response.html.find("title", first=True)
            not_found_titles = ["page not found", "content not found"]
            temp_ban_titles = [
                "you can't use this feature at the moment",
                "you can't use this feature right now",
                "you’re temporarily blocked",
            ]
            if title:
                if title.text.lower() in not_found_titles:
                    raise exceptions.NotFound(title.text)
                elif title.text.lower() == "error":
                    raise exceptions.UnexpectedResponse("Your request couldn't be processed")
                elif title.text.lower() in temp_ban_titles:
                    raise exceptions.TemporarilyBanned(title.text)
                elif ">your account has been disabled<" in response.html.html.lower():
                    raise exceptions.AccountDisabled("Your Account Has Been Disabled")
                elif (
                    ">We saw unusual activity on your account. This may mean that someone has used your account without your knowledge.<"
                    in response.html.html
                ):
                    raise exceptions.AccountDisabled("Your Account Has Been Locked")
                elif (
                    title.text == "Log in to Facebook | Facebook"
                    or response.url.startswith(urljoin('https://m.facebook.com/', "login"))
                    or response.url.startswith(urljoin('https://www.facebook.com/', "login"))
                    or (
                        ", log in to Facebook." in response.text
                        and not response.html.find(
                            "article[data-ft],div.async_like[data-ft],div.msg"
                        )
                    )
                ):
                    raise exceptions.LoginRequired(
                        "A login (cookies) is required to see this page"
                    )
            return response
        except RequestException as ex:
            logger.exception("Exception while requesting URL: %s\nException: %r", url, ex)
            raise


# pro = FacebookScraper()
# print(pro.get_profile("zuck"))
