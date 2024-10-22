from rest_framework import serializers
from .models import Event

# Existing serializers
class MetadataSerializer(serializers.Serializer):
    api = serializers.CharField()
    branch = serializers.CharField()

class MessageSerializer(serializers.Serializer):
    text = serializers.CharField()
    metadata = MetadataSerializer()

# New serializer for Event model
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'end', 'description', 'user']  # Specify fields explicitly
        read_only_fields = ['user']  # User will be set by the backend, not the client
