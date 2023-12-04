import React, { useState, useEffect } from "react";

export default function BotMessage({ fetchMessage, avatar }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container bot-message-container">
      <img src={avatar} alt="Bot" className="avatar" />
      <div className="bot-message">{isLoading ? "..." : message}</div>
    </div>
  );
}