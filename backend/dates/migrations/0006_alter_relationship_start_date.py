# Generated by Django 5.1.2 on 2024-10-09 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dates', '0005_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationship',
            name='start_date',
            field=models.DateTimeField(),
        ),
    ]
