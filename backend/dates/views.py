from django.http import JsonResponse
from rest_framework import viewsets
from .models import Date, Relationship, DateImage
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
    dates = relationship.dates.prefetch_related('images').all()

    response_data = []
    for date in dates:
        response_data.append({
            'id': date.id,
            'title': date.title,
            'description': date.description,
            'date': date.date,
            'images': [image.image.url for image in date.images.all()]  # Fetch the URLs of associated images
        })

    return JsonResponse({'dates': response_data})

@csrf_exempt
def create_date_for_relationship(request, relationship_id):
    if request.method == 'POST':
        relationship = get_object_or_404(Relationship, id=relationship_id)
        print(request.FILES)
        title = request.POST.get('title')
        description = request.POST.get('description')
        date = request.POST.get('date')
        new_date = Date.objects.create(
            title=title,
            description=description,
            date=date
        )
        if 'images' in request.FILES:
            images = request.FILES.getlist('images')
            for image in images:
                # Save each image related to the date
                DateImage.objects.create(date=new_date, image=image)

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