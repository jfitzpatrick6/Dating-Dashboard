from django.http import JsonResponse
from rest_framework import viewsets
from .models import Date, Relationship
from .serializers import DateSerializer, RelationshipSerializer
from django.shortcuts import get_object_or_404
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

class DateViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

@api_view(['GET'])
def get_dates_for_relationship(request, relationship_id):
    relationship = get_object_or_404(Relationship, id=relationship_id)
    dates = relationship.dates.all()
    return JsonResponse({'dates': list(dates.values('id', 'title', 'description', 'date'))})

@csrf_exempt
def create_date_for_relationship(request, relationship_id):
    if request.method == 'POST':
        relationship = get_object_or_404(Relationship, id=relationship_id)
        data = json.loads(request.body)
        new_date = Date.objects.create(
            title=data.get('title'),
            description=data.get('description'),
            date=data.get('date')
        )
        
        if 'images' in request.FILES:
            images = request.FILES.getlist('images')
            for image in images:
                new_date.images.save(image.name, image)

        relationship.dates.add(new_date)
        relationship.save()
        return JsonResponse({
            'id': new_date.id,
            'title': new_date.title,
            'description': new_date.description,
            'date': new_date.date,
            'images': [image.url for image in new_date.images.all()] if new_date.images else None,
        })
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)