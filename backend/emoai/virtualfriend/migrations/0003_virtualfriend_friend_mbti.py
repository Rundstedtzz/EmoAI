# Generated by Django 4.2.7 on 2023-12-01 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('virtualfriend', '0002_virtualfriend_friend_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='virtualfriend',
            name='friend_mbti',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
