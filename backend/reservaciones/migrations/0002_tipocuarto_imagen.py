# Generated by Django 5.0.6 on 2024-07-22 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservaciones', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tipocuarto',
            name='imagen',
            field=models.URLField(default='http://example.com/default-image.jpg'),
        ),
    ]