from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, DateViewSet, RelationshipViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'dates', DateViewSet)
router.register(r'relationships', RelationshipViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
