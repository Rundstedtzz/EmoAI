# EmoAI: Your Virtual Companion

## Introduction

Our project  - EmoAI - aims to address the growing need for mental health support, mental companionship and social interaction in the wake of challenges like the COVID-19 pandemic. This innovative platform offers users the ability to create virtual friends, leveraging the power of advanced technologies including Large Language Models (LLMs) for chatbot functionality, DALL-E for personalized visual design, and Whisper for audio interaction. Built with a responsive front-end using React.js and a robust Django back-end, EmoAI is not just an app – it's a companion in the digital age.

## Features

- **Virtual Friend Creation**: Design and interact with your AI-powered virtual friends.
- **Customizable Avatars**: Use DALL-E's capabilities to create unique avatars for your virtual friends.
- **Advanced Chatbot Interaction**: Engage in meaningful conversations powered by finetuned GPT models & Knowledge Retrieval (Webscraping from X & Quora & 16Personalities).
- **Voice Interaction**: Experience natural conversations with Whisper-driven audio functionality. [Under Development]
- **UI & UX**: Navigate with a user-friendly, intuitive interface built on React.js.

## Getting Started

To get started with EmoAI:

1. **Clone the Repository**

2. **Install Dependencies**
- For the front-end (React.js):
  ```
  cd EmoAI/frontend
  npm install
  ```
- For the back-end (Django):
  ```
  cd EmoAI/backend
  pip install -r requirements.txt
  ```

3. **Running the Application**
- Start the React front-end:
  ```
  npm start
  ```
- Run the Django back-end:
  ```
  python manage.py runserver
  ```

## Presentation Materials

Presentation slides: https://docs.google.com/presentation/d/1ymOvAbh-hP2Ztcd8Nbiiz-M-_oK5v5yTK_iHSk_WFK8/edit?usp=sharing

## Video Recording

Watch our Video Overview (https://github.com/Rundstedtzz/EmoAI/assets/63605514/ef820f25-8c09-451e-96ca-df6cdeae4d78) for a brief overview of EmoAI and its features.

## Model Card for EmoAI

### GPT-3.5 gpt-3.5-turbo-1106 [New Model]
- **Description**: GPT-3.5 is a state-of-the-art language model by OpenAI that can generate human-like text. It has been fine-tuned to offer better performance for specific use cases and can handle tasks with a high degree of complexity.
- **Uses**: In EmoAI, GPT-3.5 is used to power conversational capabilities, providing interactive and responsive dialogue with users.
- **Sources**: The model is provided by OpenAI, with fine-tuning capabilities allowing developers to customize the model for their specific applications
- **Permissions**: Data sent in and out of the fine-tuning API is owned by the customer and is not used by OpenAI to train other models
- **Code**: OpenAI provides API access to GPT-3.5, with comprehensive documentation and examples for developers to integrate the model into their applications

### GPT-4 gpt-4-1106-preview [New Model]
- **Description**: GPT-4 is OpenAI’s latest multimodal model capable of accepting both text and image inputs and producing text outputs. It shows human-level performance on various benchmarks and exhibits improved factuality and steerability over its predecessors
- **Uses**: GPT-4 enhances the conversational aspect of EmoAI with improved reasoning, nuanced understanding, and creative responses to complex instructions
- **Sources**: This model is available through OpenAI's API, with initial text input capability released via ChatGPT and a waitlist for broader access
- **Permissions**: OpenAI provides usage guidelines and emphasizes the importance of using the model outputs carefully, especially in high-stakes contexts
- **Code**: OpenAI provides guidelines and frameworks for developers to use GPT-4 safely and effectively in their applications
- 
### DALL-E 3 [New Model]
- **Description**: DALL-E 3 is an AI system that generates images from textual prompts, improving on the previous version by enhancing image quality and caption fidelity
- **Uses**: It is used in EmoAI to create visual representations of the virtual companions, allowing users to visualize their AI friends.
- **Sources**: OpenAI has developed and provided DALL-E 3, including its external evaluations and risk mitigations
- **Permissions**: Information regarding permissions would be in line with OpenAI’s policies, emphasizing ethical use and risk reduction.
- **Code**: OpenAI shares resources and code to enable developers to integrate DALL-E 3 into their projects

### Whisper-1
- **Description**: Whisper is an automatic speech recognition system that approaches human-level robustness and accuracy, trained on a vast and diverse dataset
- **Uses**: In EmoAI, Whisper is utilized for transcribing user speech, enabling voice-to-text capabilities for interacting with virtual companions
- **Sources**: OpenAI has trained Whisper and provides open-source access to the models and inference code
- **Permissions**: The open-sourcing of Whisper encourages its use for building applications and further research on robust speech processing
- **Code**: OpenAI provides the architecture and code, which includes an encoder-decoder Transformer model, for developers to implement Whisper in their applications

### Text-to-Speech (TTS) Model tts-1-hd-1106 [New Model]
- **Description**: A high-definition text-to-speech model capable of converting text into lifelike spoken audio.
- **Uses**: This model is used in EmoAI to provide voice responses from virtual companions, enhancing the user experience with natural-sounding speech.
- **Sources**: [New Model]
- **Permissions**: [New Model]
- **Code**: [New Model]

## Data Card for EmoAI's MBTI and Social Media Dataset

### MBTI Knowledge Data
- **Description**: This dataset consists of information related to the Myers-Briggs Type Indicator (MBTI) personality framework, scraped from publicly available educational and informational websites such as 16 Personalities website.
- **Source**: Publicly available websites offering MBTI-related content.
- **Volume**: 16 personalities * 8 sections (128 lines of JSON)
- **Fields**: MBTI types, descriptions, characteristics, potential career paths, and interpersonal relationships.
- **Usage**: To fine-tune the GPT-3.5 model or as knowledge base for GPT 4 model for personality type-based conversational behavior and to serve as a reference for personality-aligned responses.
- **Permissions**: Data scraped in compliance with the terms of service and public domain status of the source websites.

### Social Media Interaction Data
- **Description**: A dataset composed of user-generated content from social media platforms such as Twitter and Quora, focusing on topics related to personal experiences, opinions, and discussions for different MBTI personality types.
- **Source**: Public posts from Twitter and Quora (Developer API calls).
- **Volume**: 1500 posts per free developer account
- **Fields**: Post content, user interactions, hashtags, and metadata related to the posts.
- **Usage**: Employed as a knowledge base for retrieval by the GPT-4 model or fine-tune GPT 3.5 to inform and enrich the AI's conversational context and relevance.
- **Permissions**: Collected following the API terms of service and public data policies of the respective platforms.

### Ethical Considerations
- **Privacy**: All personal information is anonymized and that the data usage complies with privacy laws and regulations.
- **Bias Mitigation**: Steps have been implemented to identify and mitigate biases in the data, aiming to provide balanced and fair content.
- **Data Handling**: Secure storage and handling practices are in place to protect the integrity and confidentiality of user data.

## Critical Analysis

### Impact of the Project
EmoAI has the potential to significantly impact mental health by providing a readily available source of companionship and support. This technology bridges the gap for those who may be isolated or unable to access traditional support structures. By providing a non-judgmental, always-available AI friend, EmoAI can help reduce the weight of loneliness and may encourage individuals to take further steps in their mental health journey, potentially acting as a catalyst for seeking professional mental health services.

### What EmoAI Reveals or Suggests
Through user interactions, EmoAI can collect data that shed a light on prevalent mental health challenges and the types of support users seek from virtual companions. These insights could be invaluable for mental health professionals, allowing them to tailor their services to meet the evolving needs revealed by EmoAI interaction patterns. Additionally, it suggests the importance of emotional intelligence in AI development, underlining the role AI can play in promoting mental well-being.

### The Next Step
- AI virtual communities (AI towns)
- Audio feature
- Better UI & UX
- Feedbacks from users
- Social Media Posts for fine-tuning (more-real-life-like-interactions)
- Each MBTI type with one fine-tuned model
- A new page for Conversation logs & continue chat with friends
- More around data security & ethical concerns

The goal is to create an AI companion that not only understands but resonates with the emotional states of users from diverse linguistic backgrounds, ultimately making mental health support more universally accessible.

## Contributing

We welcome contributions to EmoAI! Whether it's improving the code, fixing bugs, or enhancing documentation, your help makes a big difference. Please read our [CONTRIBUTING.md](LINK_TO_CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the [MIT License](LINK_TO_LICENSE).

## Contact

For any queries or suggestions, feel free to contact us at qifeng.sun@vanderbilt.edu or yuning.wu@vanderbilt.edu.

## Resource Links

For further information, see the following resources:
- Literature Review
  - https://www.researchgate.net/publication/351708374_Emotional_Support_from_AI_Chatbots_Should_a_Supportive_Partner_Self-Disclose_or_Not#:~:text=,chatbot%20versus%20human%20partners%20in
  - https://www.hindawi.com/journals/hbet/2022/9601630/
  - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7385637/
  - https://www.tandfonline.com/doi/full/10.1080/17434440.2021.2013200
  - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9148050/
  - https://www.researchgate.net/publication/366774382_Artificial_Intelligence-Enabled_Chatbots_in_Mental_Health_A_Systematic_Review#:~:text=%23%20%E3%80%900%E2%80%A0Artificial%20Intelligence,all%20the%20research%20you
  - https://link.springer.com/article/10.1007/s10439-023-03326-7
  - https://pubmed.ncbi.nlm.nih.gov/37492313/
  - https://www.kff.org/mental-health/issue-brief/the-implications-of-covid-19-for-mental-health-and-substance-use/
  - https://www.16personalities.com/personality-types
 
- Webscraping
  - https://medium.com/@jonathanmondaut/scraping-tweets-using-tweepy-and-python-7f368c03fea1
  - https://developer.twitter.com/en/portal/products/basic
  - https://towardsdatascience.com/your-guide-to-web-scrape-quora-q-as-92b802f6dd9

- Front-end (React.js)
  - https://medium.com/@JeffyJeff/a-step-by-step-guide-to-creating-your-own-assistant-chatbot-using-openais-assistant-api-and-react-655391215c3a
  - https://github.com/OvidijusParsiunas/deep-chat
  - https://www.w3schools.com/REACT/DEFAULT.ASP
 
- Back-end (Django, OpenAI API)
  - https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken
  - https://platform.openai.com/docs/api-reference
  - https://platform.openai.com/docs/overview
  - https://www.w3schools.com/django/

