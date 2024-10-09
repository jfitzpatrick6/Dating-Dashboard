from django.db import models
from django.contrib.auth.models import AbstractUser

class Date(models.Model):
    title = models.CharField(max_length=100, default="") 
    description = models.TextField(default="")            
    date = models.DateField()                  
    def __str__(self):
        return self.title

class Picture(models.Model):
    date = models.ForeignKey(Date, related_name='pictures', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='pictures/')

    def __str__(self):
        return f"Picture for {self.date.title}"

class User(AbstractUser):
    pass

class Relationship(models.Model):
    start_date = models.DateField()
    dates = models.ManyToManyField(Date, related_name='relationships')
    users = models.ManyToManyField(User, related_name='relationships')

    def __str__(self):
        return f"Relationship starting on {self.start_date}"