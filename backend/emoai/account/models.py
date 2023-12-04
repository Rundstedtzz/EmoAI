from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

def user_directory_path(instance, filename):
    # File will be uploaded to MEDIA_ROOT/user_data/<username>/friend_avatar/<filename>
    return 'user_data/{0}/friend_avatar/{1}'.format(instance.user.username, filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mbti = models.CharField(max_length=50, blank=True)
    gender = models.CharField(max_length=50, blank=True)
    mbti_variant = models.CharField(max_length=50, blank=True)
    # birth_date = models.DateField(null=True, blank=True)
    # image = models.ImageField(upload_to='user_data/', blank=True)

    def __str__(self):
        return self.user.username


