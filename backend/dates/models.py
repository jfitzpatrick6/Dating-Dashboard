from django.db import models

class Date(models.Model):
    title = models.CharField(max_length=100, default="") 
    description = models.TextField(default="")            
    date = models.DateField()
    images = models.ImageField(upload_to='date_images/', null=True, blank=True)  # Allows multiple images
                  
    def __str__(self):
        return self.title

class Relationship(models.Model):
    start_date = models.DateTimeField()
    dates = models.ManyToManyField(Date, related_name='relationships')

    def __str__(self):
        return f"Relationship starting on {self.start_date}"