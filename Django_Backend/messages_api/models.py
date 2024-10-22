from django.db import models
from django.contrib.auth.models import User

# Existing Message and Metadata models
class Message:
    def __init__(self, text=""):
        self.metadata = Metadata()
        self.text = text

class Metadata:
    def __init__(self):
        self.api = "api_django_python_hello-world"
        self.branch = "basic-authorization"

# New Event model
class Event(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField(null=True, blank=True)
    description = models.TextField(blank=True)  # Ensure this is present
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
