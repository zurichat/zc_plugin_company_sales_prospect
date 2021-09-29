"""
Django settings for conf project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from pathlib import Path
from decouple import config
# from corsheaders.defaults import default_headers
# import mimetypes
# mimetypes.add_type("text/css", ".css", True)
# mimetypes.add_type("text/html", ".css", True)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = config("DEBUG", cast=bool)
DEBUG = True
ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #third party apps
    'rest_framework',    
    'drf_spectacular',
    "corsheaders",
    #local apps
    "deals",
    "prospect",
    "onboarding",
    # Centrifugo
    # "instant",
    # "cent",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware", # CORS
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

SESSION_ENGINE = "django.contrib.sessions.backends.cache"

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ORIGIN_ALLOW_ALL = True

# CORS_ALLOW_HEADERS = default_headers + (
#     'Access-Control-Allow-Origin',
# )

REST_FRAMEWORK = {'DEFAULT_SCHEMA_CLASS':'rest_framework.schemas.coreapi.AutoSchema' }

ROOT_URLCONF = 'conf.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR,'build/root'), # rootApp
            os.path.join(BASE_DIR, 'common/templates/common')
            ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'libraries': {  
                'staticfiles': 'django.templatetags.static',
            },
        },
    },
]

WSGI_APPLICATION = 'conf.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT =  os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR,'common/static/common'),
    os.path.join(BASE_DIR,'build/root'), #root_DIST
    os.path.join(BASE_DIR,'build/main'), # main_DIST
]


############### Plugin Details #######################
PLUGIN_ID = "614105b66173056af01b4cca"
PLUGIN_NAME = "Company Sales Prospects"
ORGANISATION_ID = "6153d9c4a999ef8386e80804"
DESCRIPTION = "We provide a list of potential clients for your business"

PROSPECTS_COLLECTION_NAME = "prospects"
DEALS_COLLECTION_NAME = "deals"
ROOM_COLLECTION_NAME = "sales_room"
ADDED_ROOM_COLLECTION_NAME = "added_sales_room"
PROSPECTS_ROOM_NAME = "Prospects"
PROSPECTS_ROOM_ID = "614e65b2f31a74e068e4d6dd"

DEALS_ROOM_NAME = "Deals"
DEALS_ROOM_ID = "614e670af31a74e068e4d6e4"

API_KEY = "2f822967-1774-45fb-8966-97751382451f"
CENTRIFUGO_DEBUG_ENDPOINT = "http://localhost:8400/api"

ZURI_API_KEY = "58c2400b-831d-411d-8fe8-31b6e337738b"
CENTRIFUGO_LIVE_ENDPOINT = "https://realtime.zuri.chat/api"

#email config
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' 
EMAIL_HOST_USER = 'support@test.com'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
    ],

    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# API DOCS SETTINGS
SPECTACULAR_SETTINGS = {
    'TITLE': 'SalesProspects API',
    'DESCRIPTION': 'SalesProspects Backend',
    'VERSION': '1.0.0',
    'SCHEMA_PATH_PREFIX': '/api',
}

# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_HTTPONLY = True
# CSRF_COOKIE_SECURE = True

# CENTRIFUGO_HOST = "http://localhost"
# CENTRIFUGO_PORT = 8200
# CENTRIFUGO_HMAC_KEY = "df5d3a41-1e93-4f45-98ae-ffce52c4def1"
# CENTRIFUGO_API_KEY = "2f822967-1774-45fb-8966-97751382451f"
# SITE_NAME = "My site"
# CENTRIFUGO_TOKEN = "58c2400b-831d-411d-8fe8-31b6e337738b"
