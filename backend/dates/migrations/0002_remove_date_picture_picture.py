# Generated by Django 5.1.2 on 2024-10-09 17:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dates', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='date',
            name='picture',
        ),
        migrations.CreateModel(
            name='Picture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='pictures/')),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pictures', to='dates.date')),
            ],
        ),
    ]
