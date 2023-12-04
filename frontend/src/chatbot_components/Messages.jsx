import React, { useEffect, useRef } from "react";
import UserMessage from './UserMessage'; // Ensure this path is correct
import BotMessage from './BotMessage'; // Ensure this path is correct

export default function Messages({ messages, userAvatar, botAvatar }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages]);

  const messageComponents = messages.map((message, index) => (
    message.type === 'user' ? (
      <UserMessage key={index} text={message.text} avatar={userAvatar} />
    ) : (
      <BotMessage key={index} fetchMessage={() => Promise.resolve(message.text)} avatar={botAvatar} />
    )
  ));

  return (
    <div className="messages">
      {messageComponents}
      <div ref={endOfMessagesRef} />
    </div>
  );
}