import os
import django
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vendorbridge.settings")
django.setup()

from vendorbridge.urls import urlpatterns

def print_urls(patterns, prefix=''):
    for pattern in patterns:
        if hasattr(pattern, 'url_patterns'):
            print_urls(pattern.url_patterns, prefix + str(pattern.pattern))
        else:
            print(prefix + str(pattern.pattern))

print_urls(urlpatterns)
