from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DateViewSet, RelationshipViewSet, get_dates_for_relationship, create_date_for_relationship


router = DefaultRouter()
router.register(r'dates', DateViewSet)
router.register(r'relationships', RelationshipViewSet)

urlpatterns = [
    path('relationships/<int:relationship_id>/dates/', get_dates_for_relationship, name='dates_for_relationship'),
    path('relationships/<int:relationship_id>/dates/create/', create_date_for_relationship, name='create_date_for_relationship'),  
    path('', include(router.urls)),
]
