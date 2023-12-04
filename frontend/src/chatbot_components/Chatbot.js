import React, { useState, useEffect } from 'react';
import { getChatbotResponse } from './ChatbotAPI'; // Make sure to implement getChatbotResponse
import Header from '../chatbot_components/Header';
import Messages from '../chatbot_components/Messages';
import Input from '../chatbot_components/Input';
import '../chatbot_components/styles.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Chatbot() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedType, selectedTrait, virtualFriendName, customPrompt, avatarUrl} = location.state || {};
  const [selectedModel, setSelectedModel] = useState('');
  const [showModelSelection, setShowModelSelection] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');


  // URLs for avatars from the public/avatars folder or a suitable path
  const userAvatarUrl = '/avatars/userAvatar.png'; // Update with the actual path
  // const botAvatarUrl = '/avatars/botAvatar.png'; // Update with the actual path
  const botAvatarUrl = avatarUrl;
  // Fetch the initial welcome message from the bot
  // useEffect(() => {
  //   async function fetchWelcomeMessage() {
  //     setIsLoading(true);
  //     const welcomeMessage = await getChatbotResponse('', selectedType, selectedTrait, virtualFriendName, customPrompt, selectedModel); // Fetch welcome message
  //     setMessages(prevMessages => [...prevMessages, { type: 'bot', text: welcomeMessage, avatar: botAvatarUrl }]);
  //     setIsLoading(false);
  //   }

  //   fetchWelcomeMessage();
  // }, []);

  useEffect(() => {
    async function fetchWelcomeMessage() {
      setIsLoading(true);
      const welcomeMessage = await getChatbotResponse('', selectedType, selectedTrait, virtualFriendName, customPrompt, selectedModel);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', text: welcomeMessage, avatar: botAvatarUrl }]);
      setIsLoading(false);
    }

    if (!showModelSelection) {
      fetchWelcomeMessage();
    }
  }, [showModelSelection]);

  const handleConfirm = async () => {
    setShowModelSelection(false);
  };
  const sendMessage = async (text) => {
    if (!text.trim()) return; // Prevent sending empty messages

    // Append the user message to the chat
    const userMessage = { type: 'user', text, avatar: userAvatarUrl };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsLoading(true);

    const response = await getChatbotResponse(text); // Fetch the bot response
    // Append the bot message to the chat
    setMessages(prevMessages => [...prevMessages, { type: 'bot', text: response, avatar: botAvatarUrl }]);
    
    setIsLoading(false);
  };

  const backtoDash = async () => {
    // Navigate to the chatbot page with state
    navigate(`/dashboard/${username}/`);
  };

  // return (
  //   <div className="chatbot-container">
  //     <Header friendName={virtualFriendName} />
  //     {/* <Header /> */}
  //     <Messages 
  //       messages={messages}
  //       userAvatar={userAvatarUrl}
  //       botAvatar={botAvatarUrl}
  //     />
  //     <Input onSend={sendMessage} />
  //   </div>
  // );
  return (
    <div className="chatbot-container">
      <Header friendName={virtualFriendName} />
      
      {showModelSelection && (
        <div>
          <div className="model-selection">
            <h2>Choose Your Desired Model First</h2>
            {/* <button onClick={() => setSelectedModel('gpt-3.5')} className = "GPT-3-5-button">Use Fine-tuned GPT-3.5</button>
            <button onClick={() => setSelectedModel('gpt-4')}  className = "GPT-4-button">Use GPT-4</button> */}
            <button
              onClick={() => setSelectedModel('gpt-3.5')}
              className={`GPT-3-5-button ${selectedModel === 'gpt-3.5' ? 'button-selected' : 'button-unselected'}`}
            >
            Use Fine-tuned GPT-3.5
            </button>
            <button
              onClick={() => setSelectedModel('gpt-4')}
              className={`GPT-4-button ${selectedModel === 'gpt-4' ? 'button-selected' : 'button-unselected'}`}
            >
            Use GPT-4
            </button>
          </div>
          <button onClick={handleConfirm} className = "confirm-button">Confirm</button>
        </div>
      )}
      <div className="back-to-dash-chatbot">
            <button 
              className={"dash-button-chatbot"}
              onClick={() => backtoDash()}
            >
              Go Back to Dashboard
            </button>
      </div>
      {/* Rest of your component */}
      <Messages 
        messages={messages}
        userAvatar={userAvatarUrl}
        botAvatar={botAvatarUrl}
      />
      <Input onSend={sendMessage} />
    </div>
  );
  
}

export default Chatbot;