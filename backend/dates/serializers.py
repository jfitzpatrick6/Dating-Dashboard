from rest_framework import serializers
from .models import User, Date, Picture, Relationship

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'image']

class DateSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True, read_only=True)

    class Meta:
        model = Date
        fields = ['id', 'title', 'description', 'date', 'pictures']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RelationshipSerializer(serializers.ModelSerializer):
    dates = DateSerializer(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Relationship
        fields = ['id', 'start_date', 'dates', 'users']