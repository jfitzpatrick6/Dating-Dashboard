from django.http import JsonResponse
from rest_framework import viewsets
from .models import User, Date, Relationship
from .serializers import UserSerializer, DateSerializer, RelationshipSerializer
from django.shortcuts import get_object_or_404
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DateViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

@api_view(['GET'])
def get_dates_for_relationship(request, relationship_id):
    # Fetch the relationship by ID (e.g., 3)
    relationship = get_object_or_404(Relationship, id=relationship_id)
    
    # Get all the dates associated with this relationship
    dates = relationship.dates.all()

    # Return the list of dates (you can render a template or return JSON)
    return JsonResponse({'dates': list(dates.values('id', 'title', 'description', 'date'))})

@csrf_exempt
def create_date_for_relationship(request, relationship_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        relationship = get_object_or_404(Relationship, id=relationship_id)
        new_date = Date.objects.create(
            title=data.get('title'),
            description=data.get('description'),
            date=data.get('date')
        )
        relationship.dates.add(new_date)
        relationship.save()
        return JsonResponse({
            'id': new_date.id,
            'title': new_date.title,
            'description': new_date.description,
            'date': new_date.date,
        })
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)