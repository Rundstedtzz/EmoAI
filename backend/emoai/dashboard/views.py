from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from virtualfriend.models import VirtualFriend
from account.models import Profile
# import os


def index(request):
    return HttpResponse("This is the dashboard index page.")

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_dashboard(request, username):
    try:
        user = User.objects.get(username=username)
        # print(request.user, user)
        if request.user != user:
            # print(request.user, user)
            return JsonResponse({'error': 'Unauthorized'}, status=403)

        # Example of fetching data
        user_profile = Profile.objects.get(user=user)
        friends = VirtualFriend.objects.filter(user=user)

        # Structure your response data
        data = {
            'user': {
                'username': user.username,
                'gender': user_profile.gender,
                'mbti': user_profile.mbti,
                'mbti_variant': user_profile.mbti_variant
                # 'avatar': user_profile.avatar_url,
                # Add other user details
            },
            # 'friends': [{'name': friend.name, 'avatar': friend.avatar_url} for friend in friends]
            'friends': [{
                'name': friend.friend_name,
                'mbti': friend.friend_mbti,
                'mbti_variant': friend.friend_mbti_variant,
                'custom_prompt': friend.friend_custom_prompt,
                'avatar': friend.friend_avatar
                # 'avatar': friend.friend_avatar.url if friend.friend_avatar else None
                # 'avatar': os.path.relpath(friend.friend_avatar.url, '/') if friend.friend_avatar else None
            } for friend in friends]
        }
        return JsonResponse(data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
