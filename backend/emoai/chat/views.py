from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import os
from openai import OpenAI


def index(request):
    return HttpResponse("This is the chat index page.")

@csrf_exempt
@require_POST
def chat_response(request):
    try:
        chat_history = request.session.get('chat_history', [])
        data = json.loads(request.body)
        user_message = data.get('message')
        selectedType = data.get('selectedType')
        selectedTrait = data.get('selectedTrait')
        virtualFriendName = data.get('virtualFriendName')
        customPrompt = data.get('customPrompt')
        selected_model = data.get('selectedModel')
        model_mapping = {
        'gpt-3.5': "ft:gpt-3.5-turbo-1106:personal::8RuIR1zs",  # replace with your actual GPT-3.5 model
        'gpt-4': "gpt-4-1106-preview",  # replace with your actual GPT-4 model
        }
        model_to_use = model_mapping.get(selected_model, "gpt-4-1106-preview")
        os.environ["OPENAI_API_KEY"] = "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"

        if user_message == '':
           bot_response = f"""
            Your name is {virtualFriendName}. You are a virtual friend of mine who has a MBTI personality type of {selectedType},
            with a variant of {selectedTrait}. So you are a {selectedType}-{selectedTrait} person.
            You have the following traits: {customPrompt}.
            Keep the greeting and each response brief and engaging.
            And this is actually the first time you meet with your user friend.
            So make the experience memorable.
            Make the conversation relatively casual.
            """
           chat_history.append({"role": "system", "content": bot_response})
        else:
            # Append the user message to the chat history
            chat_history.append({"role": "user", "content": user_message})
        
        client = OpenAI()
        response = client.chat.completions.create(
            model=model_to_use, # Replace with the correct model
            messages=chat_history  # Pass the entire chat history
        )
        
        # Extract the bot response and append to history
        bot_response = response.choices[0].message.content
        chat_history.append({"role": "system", "content": bot_response})
        
        # Save the updated chat history in the session
        request.session['chat_history'] = chat_history
        
        return JsonResponse({'message': bot_response})
    except Exception as e:
        # Properly log the error for debugging
        print(f"Error: {str(e)}")
        return JsonResponse({'message': "Something went wrong."}, status=500)





#### working version ####
# from django.shortcuts import render
# from django.http import HttpResponse
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
# import json
# import os
# from openai import OpenAI


# def index(request):
#     return HttpResponse("This is the chat index page.")

# @csrf_exempt
# @require_POST
# def chat_response(request):
#     try:
#         data = json.loads(request.body)
#         user_message = data.get('message')
#         selectedType = data.get('selectedType')
#         selectedTrait = data.get('selectedTrait')
#         virtualFriendName = data.get('virtualFriendName')
#         customPrompt = data.get('customPrompt')
#         selected_model = data.get('selectedModel')
#         model_mapping = {
#         'gpt-3.5': "ft:gpt-3.5-turbo-1106:personal::8RuIR1zs",  # replace with your actual GPT-3.5 model
#         'gpt-4': "gpt-4-1106-preview",  # replace with your actual GPT-4 model
#         }
#         model_to_use = model_mapping.get(selected_model, "gpt-4-1106-preview")

#         if user_message == '':
#            user_message = f"""
#             Your name is {virtualFriendName}. You are a virtual friend of mine who has a MBTI personality type of {selectedType},
#             with a variant of {selectedTrait}. So you are a {selectedType}-{selectedTrait} person.
#             You have the following traits: {customPrompt}.
#             Keep the greeting and each response brief and engaging.
#             And this is actually the first time you meet with your user friend.
#             So make the experience memorable.
#             Make the conversation relatively casual.
#             """
#         os.environ["OPENAI_API_KEY"] = "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"

#         client = OpenAI()
#         response = client.chat.completions.create(
#             # model="gpt-4-1106-preview",  
#             # model = "ft:gpt-3.5-turbo-1106:personal::8Rc4iGPO",
#             # model = "ft:gpt-3.5-turbo-1106:personal::8RuIR1zs",
#             # model = "ft:gpt-3.5-turbo-1106:personal::8Ruy346E",
#             model = model_to_use,
#             messages=[
#                 {"role": "user", "content": user_message}
#             ]
#         )
        
#         message = response.choices[0].message.content
#         return JsonResponse({'message': message})
#     except Exception as e:
#         # Properly log the error for debugging
#         print(f"Error: {str(e)}")
#         return JsonResponse({'message': "Something went wrong"}, status=500)
    



##############################################################################################################

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
# import json
# import os
# import openai
# from pathlib import Path
# from openai import OpenAI
# from langchain.chat_models import ChatOpenAI
# from langchain.prompts import PromptTemplate
# from langchain.chains import ConversationChain, LLMChain
# from langchain.memory import ConversationBufferMemory
# from django.contrib.sessions.models import Session
# from django.core.files.storage import default_storage
# import random

# @csrf_exempt
# @require_POST

# def chat_response(request):
#     try:
#         # Initialize chat history
        
#         chat_history = request.session.get('chat_history', [])
        
#         data = json.loads(request.body)
#         user_message = data.get('message')

#         if user_message == "":
#             user_message = """
#             Act as a virtual friend who has a MBTI personality type of ENFJ. 
#             Do not explicitly say you are an ENFJ at the beginning, but act like one.
#             Keep the greeting and each response brief and engaging.
#             And this is actually the first time you meet with your user friend.
#             So make the experience memorable.
#             Make the conversation relatively casual.
#             And your favorite sport is rock climbing.
#             """
        
#         # Append the user message to the chat history
#         chat_history.append({"role": "user", "content": user_message})
        
#         os.environ["OPENAI_API_KEY"] = "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"
        
#         client = OpenAI()
#         response = client.chat.completions.create(
#             model="gpt-4-1106-preview",  # Replace with the correct model
#             messages=chat_history  # Pass the entire chat history
#         )
        
#         # Extract the bot response and append to history
#         bot_response = response.choices[0].message.content
#         chat_history.append({"role": "assistant", "content": bot_response})
        
#         # Save the updated chat history in the session
#         request.session['chat_history'] = chat_history
        
#         return JsonResponse({'message': bot_response})
#     except Exception as e:
#         # Properly log the error for debugging
#         print(f"Error: {str(e)}")
#         return JsonResponse({'message': "Something went wrong."}, status=500)