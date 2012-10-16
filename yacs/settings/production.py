from yacs.settings.base import settings
import os
import json

__all__ = ['settings']

with open(os.environ.get('YACS_SETTINGS', settings.relative_path('settings', 'production.json')), 'r') as handle:
    data = json.loads(handle.read())

with settings as s:
    s.DEBUG = False
    s.STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

    s.CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.memcached.PyLibMCCache',
            'LOCATION': '127.0.0.1:11211',
            'VERSION': s.CACHE_VERSION,
        }
    }

    @s.lazy_eval
    def debug_toolbar_configs(s):
        def debug_toolbar_callback(request):
            return request.user.is_staff

        s.DEBUG_TOOLBAR_CONFIG = {
            'INTERCEPT_REDIRECTS': False,
            'SHOW_TOOLBAR_CALLBACK': debug_toolbar_callback,
            'HIDE_DJANGO_SQL': s.DEBUG
        }

    s.STATIC_URL = data['static_url']
    s.DATABASES = data['databases']

    @s.lazy_eval
    def set_admin_media(s):
        s.ADMIN_MEDIA_PREFIX = s.STATIC_URL + 'admin/'

    s.DEBUG_TOOLBAR_PANELS = (
        'debug_toolbar.panels.version.VersionDebugPanel',
        'debug_toolbar.panels.timer.TimerDebugPanel',
        'debug_toolbar.panels.settings_vars.SettingsVarsDebugPanel',
        'debug_toolbar.panels.headers.HeaderDebugPanel',
        'debug_toolbar.panels.request_vars.RequestVarsDebugPanel',
        'debug_toolbar.panels.template.TemplateDebugPanel',
        #'debug_toolbar.panels.sql.SQLDebugPanel',
        'debug_toolbar.panels.signals.SignalDebugPanel',
        'debug_toolbar.panels.logger.LoggingPanel',
        #'debug_profiling.ProfilingPanel'
    )

    FROM_EMAIL = data['email']['from']
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_USE_TLS = data['email']['tls']
    EMAIL_HOST = data['email']['host']
    EMAIL_USER = data['email']['user']
    EMAIL_PASS = data['email']['pass']
    EMAIL_PORT = data['email']['port']
