from rest_framework import serializers
from .models import Date, Relationship

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ['id', 'title', 'description', 'date', 'images']

class RelationshipSerializer(serializers.ModelSerializer):
    dates = DateSerializer(many=True, read_only=True)
    class Meta:
        model = Relationship
        fields = ['id', 'start_date', 'dates']