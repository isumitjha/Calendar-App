from django.urls import path, include
from hello_world.views import not_found, app_error
from django.contrib import admin

handler404 = not_found
handler500 = app_error

urlpatterns = [
    path('api/messages/', include('messages_api.urls')),
    path('admin/', admin.site.urls),
]
