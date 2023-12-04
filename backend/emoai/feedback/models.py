from django.db import models
from chat.models import Conversation

class Feedback(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    rating = models.IntegerField()
    feedback_text = models.TextField()
    emotion_trend_rating = models.IntegerField()