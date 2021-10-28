
import requests


PLUGIN_ID = "6169bdd9eb5b3de309e7e27a"


def get_queue():
    """Get queue data from the plugin information
    Returns:
        [type]: [description]
    """
    dm_plugin_url = f"https://api.zuri.chat/marketplace/plugins/{PLUGIN_ID}"
    try:
        response = requests.get(url=dm_plugin_url)
    except requests.exceptions.RequestException as _e:
        return _e
    if response.status_code == 200:
        return response.json()["data"]["queue"]
    else:
        return None


def update_queue_sync(queue_id: int):
    """Patch with the last queue id
    Args:
        queue_id (int): The last queue id that has been updated
    Returns:
        [type]: [description]
    """
    patch_queue_url = f"https://api.zuri.chat/plugins/{PLUGIN_ID}/sync"
    body = {"id": queue_id}
    try:
        response = requests.patch(url=patch_queue_url, json=body)
    except requests.exceptions.RequestException as _e:
        return _e
    if response.status_code == 200:
        return response.json()
    else:
        return None
