from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicMessageApiView, ProtectedMessageApiView, AdminMessageApiView, EventViewSet, create_user

# Set up router for events API
router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('public', PublicMessageApiView.as_view(), name='public-message'),
    path('protected', ProtectedMessageApiView.as_view(), name='protected-message'),
    path('admin', AdminMessageApiView.as_view(), name='admin-message'),
    path('', include(router.urls)),  # Includes event API routes
    path('create-user/', create_user, name='create-user'),
]
