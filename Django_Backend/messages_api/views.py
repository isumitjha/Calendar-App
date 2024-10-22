from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import exception_handler
from rest_framework import viewsets, status
from .models import Message, Event
from .serializers import MessageSerializer, EventSerializer
import logging
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.models import TokenUser
from rest_framework import serializers

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user(request):
    try:
        # Extract user details from the Auth0 JWT token
        auth0_user_id = request.user.username  # Auth0 'sub' claim in JWT token
        user_data = request.data

        # Check if the user already exists in Django's User model
        user, created = User.objects.get_or_create(
            username = user_data.get('sub', ''),
            # username=auth0_user_id,
            defaults={
                'email': user_data.get('email', ''),
                'first_name': user_data.get('given_name', ''),
                'last_name': user_data.get('family_name', ''),
                # 'username': user_data.get('sub', '')  # Store the Auth0 'sub' as external_id
            }
        )

        if created:
            logger.info(f"New user created: {auth0_user_id}")
            return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

        return Response({'message': 'User already exists.'}, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error during user creation: {str(e)}")
        return Response({'message': 'An error occurred during user creation.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Existing message views
class MessageApiView(RetrieveAPIView):
    serializer_class = MessageSerializer
    text = None

    def get_object(self):
        return Message(text=self.text)

class PublicMessageApiView(MessageApiView):
    text = "This is a public message."

class ProtectedMessageApiView(MessageApiView):
    text = "This is a protected message."
    permission_classes = [IsAuthenticated]

class AdminMessageApiView(MessageApiView):
    text = "This is an admin message."
    permission_classes = [IsAuthenticated]

class EventViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer

    def get_queryset(self):
        user = self.request.user
        # Check if user is authenticated
        if not user.is_authenticated:
            return Event.objects.none()  # Return empty queryset if not authenticated

        # Fetch events based on user
        user_id = user.id
        return Event.objects.filter(user__username=user_id)  # Use username here

    def perform_create(self, serializer):
        user = self.request.user
        print("--", user)
        user_email = user.email
        print("email", user_email)
        # Handle case where TokenUser is being used
        if isinstance(user, TokenUser):
            User = get_user_model()
            # Retrieve the actual user from the database using the identifier from the token
            try:
                # The identifier here should match how your users are saved in the database
                # Check for the format you have in the database
                user_id = user.id  # This might need to change based on your user model
                print("--", user_id)
                user_instance = User.objects.get(username=user_id)  # Adjust if you're using email or another field
                
            except User.DoesNotExist:
                logger.error("User associated with the token does not exist")
                raise serializers.ValidationError("User associated with the token does not exist")

            logger.info(f"Creating event for user: {user_instance}")
            # Save the event with the correct User instance
            serializer.save(user=user_instance)

    def perform_update(self, serializer):
        user = self.request.user
        user_instance = self.get_user_instance(user)
        logger.info(f"Updating event for user: {user_instance}")
        serializer.save(user=user_instance)

    def perform_destroy(self, instance):
        logger.info(f"Deleting event: {instance.title}")  # Log the event title before deletion
        instance.delete()

    def get_user_instance(self, user):
        # user = self.request.user
        user_id = user.id
        """Retrieve the user instance from the database."""
        if isinstance(user, TokenUser):
            try:
                return User.objects.get(username=user_id)
            except User.DoesNotExist:
                logger.error("User associated with the token does not exist")
                raise serializers.ValidationError("User associated with the token does not exist")
        return user

def api_exception_handler(exc, context=None):
    response = exception_handler(exc, context=context)
    if response is not None and isinstance(response.data, dict):
        logger.error(f"Validation error: {response.data}")  # Log the validation error
        response.data = {'message': response.data.get('detail', 'API Error')}
    else:
        logger.error("Unhandled exception: %s", exc)  # Log unhandled exceptions
        response.data = {'message': 'API Error'}
    return response
