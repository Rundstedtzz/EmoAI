from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("This is the virtualfriend index page.")

# virtualfriend/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import VirtualFriend
from rest_framework import status
import requests
import os
from django.http import JsonResponse
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from openai import OpenAI
from django.core.files.temp import NamedTemporaryFile
from django.core.files import File
from .models import user_directory_path
from PIL import Image
from io import BytesIO


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import VirtualFriend
from django.contrib.auth.models import User
import json

@csrf_exempt
@require_POST
def create_virtual_friend(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        friend_name = data.get('friend_name')
        friend_mbti = data.get('friend_mbti')
        friend_mbti_variant = data.get('friend_mbti_variant')
        friend_custom_prompt = data.get('friend_custom_prompt')
        friend_avatar = data.get('friend_avatar')

        user = User.objects.get(username=username)  # Retrieve the user object

        virtual_friend = VirtualFriend.objects.create(
            user=user,
            friend_name=friend_name,
            friend_mbti=friend_mbti,
            friend_mbti_variant=friend_mbti_variant,
            friend_custom_prompt=friend_custom_prompt,
            friend_avatar=friend_avatar
        )

        return JsonResponse({'message': 'Virtual friend created successfully', 'friend_id': virtual_friend.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def create_virtual_friend(request):
#     try:
#         # Extract data from request
#         mbti_type = request.data.get('mbtiType')
#         trait = request.data.get('trait')
#         name = request.data.get('virtualFriendName')

#         # print(mbti_type, trait, name)
#         # Get the user from the request
#         user = request.user

#         # Create and save the new VirtualFriend object
#         virtual_friend = VirtualFriend.objects.create(
#             user=user,
#             friend_name=name,
#             friend_mbti=mbti_type,  # Adjust the field names as per your model
#             friend_mbti_variant=trait
#         )

#         return Response({
#             'message': 'Virtual friend created successfully',
#             'virtual_friend_id': virtual_friend.id
#         }, status=status.HTTP_201_CREATED)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    



# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def generate_virtual_friend_avatar(request):
#     try:
#         # Extract username and virtual friend's name from the request
#         username = request.data.get('username')
#         # username = request.user.username
#         friend_name = request.data.get('friendName')
#         print(username, friend_name)

#         # Construct the dynamic path for saving the image
#         dynamic_path = f'user_data/{username}/friend_avatar/{friend_name}/'

#         # Generate the image using OpenAI client
#         os.environ["OPENAI_API_KEY"] = "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"
#         client = OpenAI()
#         response = client.images.generate(
#             model="dall-e-3",
#             prompt="a white siamese cat",
#             size="1024x1024",
#             quality="standard",
#             n=1,
#         )

#         # Get the image URL
#         image_url = response.data[0].url
#         print(image_url)
#         # Download the image
#         image_response = requests.get(image_url)
#         # print(f"Image Response Status: {image_response.status_code}, Content Length: {len(image_response.content)}")
#         # print("Image Response Content: ", image_response.content)
#         if image_response.status_code == 200:
#             # Save the image
#             file_name = dynamic_path + 'image.png'  # Modify as needed to handle multiple images
#             file_path = default_storage.save(file_name, File(image_response.content))
            
#             return JsonResponse({'image_path': file_path})
#         else:
#             return JsonResponse({'error': 'Failed to download image'}, status=image_response.status_code)

#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)
    

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def generate_virtual_friend_avatar(request):
#     try:
#         os.environ["OPENAI_API_KEY"] = "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"
#         client = OpenAI()
#         response = client.images.generate(
#             model="dall-e-3",
#             prompt="a white siamese cat",
#             size="1024x1024",
#             quality="standard",
#             n=1,
#         )
#         # Get the image URL
#         image_url = response.data[0].url

#         # Download the image from the URL
#         image_response = requests.get(image_url)
#         if image_response.status_code == 200:
#             # Save the image to a temporary file
#             temp_file = NamedTemporaryFile()
#             temp_file.write(image_response.content)
#             temp_file.flush()

#             # Save the image to your media path
#             file_path = default_storage.save('path/to/save/image.png', File(temp_file))
#             return JsonResponse({'image_path': file_path})
#         else:
#             return JsonResponse({'error': 'Failed to download image'}, status=image_response.status_code)
    
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)
    

    #     if response.status_code == 200:
    #         image_data = response.json()['data']
    #         image_content = ContentFile(image_data)
    #         file_path = default_storage.save('path/to/save/image.png', image_content)
    #         return JsonResponse({'image_path': file_path})
    #     else:
    #         return JsonResponse({'error': 'Failed to generate image'}, status=response.status_code)
    
    # except Exception as e:
    #     return JsonResponse({'error': str(e)}, status=500)





@api_view(['POST'])
def generate_virtual_friend_avatar(request):
    try:
        print("here")
        username = request.data.get('username')
        friend_name = request.data.get('friendName')
        custom_prompt = request.data.get('customPrompt')
        dynamic_path = f'user_data/{username}/friend_avatar/{friend_name}/'
        print(dynamic_path)
        os.environ["OPENAI_API_KEY"] = "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"
        print("hhh")
        client = OpenAI()
        print("xxx")
        response = client.images.generate(
            model="dall-e-3",
            prompt=custom_prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        print("herhehre")
        image_url = response.data[0].url
        print(image_url)
        image_response = requests.get(image_url)
        if image_response.status_code == 200:
            # Open the image using Pillow
            image = Image.open(BytesIO(image_response.content))

            # Prepare a BytesIO object to save the image
            img_temp = BytesIO()
            image.save(img_temp, format='PNG')
            img_temp.seek(0)

            # Construct the file path
            file_name = dynamic_path + 'image.png'

            # Save the image using Django's default storage
            file_path = default_storage.save(file_name, ContentFile(img_temp.read()))
            return JsonResponse({'image_path': file_path})
        else:
            return JsonResponse({'error': 'Failed to download image'}, status=image_response.status_code)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
    '''
DALL-E image generation example for openai>1.2.3, saves requested images as files
-- not a code utility, has no input or return

# example pydantic models returned by client.images.generate(**img_params):
## - when called with "response_format": "url":
images_response = ImagesResponse(created=1699713836, data=[Image(b64_json=None, revised_prompt=None, url='https://oaidalleapiprodscus.blob.core.windows.net/private/org-abcd/user-abcd/img-12345.png?st=2023-11-11T13%3A43%3A56Z&se=2023-11-11T15%3A43%3A56Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-10T21%3A41%3A11Z&ske=2023-11-11T21%3A41%3A11Z&sks=b&skv=2021-08-06&sig=%2BUjl3f6Vdz3u0oRSuERKPzPhFRf7qO8RjwSPGsrQ/d8%3D')])

requires:
pip install --upgrade openai
pip install pillow
'''
# import os
# from io import BytesIO
# import openai                  # for handling error types
# from datetime import datetime  # for formatting date returned with images
# import base64                  # for decoding images if recieved in the reply
# import requests                # for downloading images from URLs
# from PIL import Image          # pillow, for processing image types
# import tkinter as tk           # for GUI thumbnails of what we got
# from PIL import ImageTk        # for GUI thumbnails of what we got

# def old_package(version, minimum):  # Block old openai python libraries before today's
#     version_parts = list(map(int, version.split(".")))
#     minimum_parts = list(map(int, minimum.split(".")))
#     return version_parts < minimum_parts

# if old_package(openai.__version__, "1.2.3"):
#     raise ValueError(f"Error: OpenAI version {openai.__version__}"
#                      " is less than the minimum version 1.2.3\n\n"
#                      ">>You should run 'pip install --upgrade openai')")

# from openai import OpenAI
# # client = OpenAI(api_key="sk-xxxxx")  # don't do this, OK?
# client = OpenAI()  # will use environment variable "OPENAI_API_KEY"

# prompt = (
#  "Subject: ballet dancers posing on a beam. "  # use the space at end
#  "Style: romantic impressionist painting."     # this is implicit line continuation
# )

# image_params = {
#  "model": "dall-e-2",  # Defaults to dall-e-2
#  "n": 1,               # Between 2 and 10 is only for DALL-E 2
#  "size": "1024x1024",  # 256x256, 512x512 only for DALL-E 2 - not much cheaper
#  "prompt": prompt,     # DALL-E 3: max 4000 characters, DALL-E 2: max 1000
#  "user": "myName",     # pass a customer ID to OpenAI for abuse monitoring
# }

# ## -- You can uncomment the lines below to include these non-default parameters --

# image_params.update({"response_format": "b64_json"})  # defaults to "url" for separate download

# ## -- DALL-E 3 exclusive parameters --
# #image_params.update({"model": "dall-e-3"})  # Upgrade the model name to dall-e-3
# #image_params.update({"size": "1792x1024"})  # 1792x1024 or 1024x1792 available for DALL-E 3
# #image_params.update({"quality": "hd"})      # quality at 2x the price, defaults to "standard" 
# #image_params.update({"style": "natural"})   # defaults to "vivid"

# # ---- START
# # here's the actual request to API and lots of error catching
# try:
#     images_response = client.images.generate(**image_params)
# except openai.APIConnectionError as e:
#     print("Server connection error: {e.__cause__}")  # from httpx.
#     raise
# except openai.RateLimitError as e:
#     print(f"OpenAI RATE LIMIT error {e.status_code}: (e.response)")
#     raise
# except openai.APIStatusError as e:
#     print(f"OpenAI STATUS error {e.status_code}: (e.response)")
#     raise
# except openai.BadRequestError as e:
#     print(f"OpenAI BAD REQUEST error {e.status_code}: (e.response)")
#     raise
# except Exception as e:
#     print(f"An unexpected error occurred: {e}")
#     raise

# # make a file name prefix from date-time of response
# images_dt = datetime.utcfromtimestamp(images_response.created)
# img_filename = images_dt.strftime('DALLE-%Y%m%d_%H%M%S')  # like 'DALLE-20231111_144356'

# # get the prompt used if rewritten by dall-e-3, null if unchanged by AI
# revised_prompt = images_response.data[0].revised_prompt

# # get out all the images in API return, whether url or base64
# # note the use of pydantic "model.data" style reference and its model_dump() method
# image_url_list = []
# image_data_list = []
# for image in images_response.data:
#     image_url_list.append(image.model_dump()["url"])
#     image_data_list.append(image.model_dump()["b64_json"])

# # Initialize an empty list to store the Image objects
# image_objects = []

# # Check whether lists contain urls that must be downloaded or b64_json images
# if image_url_list and all(image_url_list):
#     # Download images from the urls
#     for i, url in enumerate(image_url_list):
#         while True:
#             try:
#                 print(f"getting URL: {url}")
#                 response = requests.get(url)
#                 response.raise_for_status()  # Raises stored HTTPError, if one occurred.
#             except requests.HTTPError as e:
#                 print(f"Failed to download image from {url}. Error: {e.response.status_code}")
#                 retry = input("Retry? (y/n): ")  # ask script user if image url is bad
#                 if retry.lower() in ["n", "no"]:  # could wait a bit if not ready
#                     raise
#                 else:
#                     continue
#             break
#         image_objects.append(Image.open(BytesIO(response.content)))  # Append the Image object to the list
#         image_objects[i].save(f"{img_filename}_{i}.png")
#         print(f"{img_filename}_{i}.png was saved")
# elif image_data_list and all(image_data_list):  # if there is b64 data
#     # Convert "b64_json" data to png file
#     for i, data in enumerate(image_data_list):
#         image_objects.append(Image.open(BytesIO(base64.b64decode(data))))  # Append the Image object to the list
#         image_objects[i].save(f"{img_filename}_{i}.png")
#         print(f"{img_filename}_{i}.png was saved")
# else:
#     print("No image data was obtained. Maybe bad code?")

# ## -- extra fun: pop up some thumbnails in your GUI if you want to see what was saved

# if image_objects:
#     # Create a new window for each image
#     for i, img in enumerate(image_objects):
#         # Resize image if necessary
#         if img.width > 512 or img.height > 512:
#             img.thumbnail((512, 512))  # Resize while keeping aspect ratio

#         # Create a new tkinter window
#         window = tk.Tk()
#         window.title(f"Image {i}")

#         # Convert PIL Image object to PhotoImage object
#         tk_image = ImageTk.PhotoImage(img)

#         # Create a label and add the image to it
#         label = tk.Label(window, image=tk_image)
#         label.pack()

#         # Run the tkinter main loop - this will block the script until images are closed
#         window.mainloop()