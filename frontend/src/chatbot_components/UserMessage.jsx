import React from "react";

export default function UserMessage({ text, avatar }) {
  return (
    <div className="message-container user-message-container">
      <img src={avatar} alt="User Avatar" className="avatar" />
      <div className="user-message">{text}</div>
    </div>
  );
}