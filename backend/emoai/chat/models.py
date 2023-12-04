from django.db import models
from django.contrib.auth.models import User
from virtualfriend.models import VirtualFriend

class Conversation(models.Model):
    friend = models.ForeignKey(VirtualFriend, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    num_tokens = models.IntegerField()
    num_words = models.IntegerField()
    summary = models.TextField()
    current_personality = models.TextField()
    emotion_trend = models.TextField()

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sender_type = models.CharField(max_length=50)
    message_text = models.TextField()
    message_timestamp = models.DateTimeField(auto_now_add=True)

