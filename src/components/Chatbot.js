import React, { useState, useRef, useEffect } from 'react';
import api from '../api';
import './Chatbot.css';

// A simple function to parse basic markdown for better display
const parseResponse = (text) => {
    // Bold text: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic text: *text*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return text;
};


function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your TravelWise Assistant. How can I help you plan your trip?", sender: 'bot', type: 'intro' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { text: messageText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await api.post('/chatbot/chat', { message: userMessage.text });
      const botResponse = { text: response.data, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      const errorResponse = { text: "Sorry, I'm having trouble right now. Please try again later.", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>TravelWise Assistant</h3>
          <button onClick={toggleChat} className="close-btn">&times;</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <span dangerouslySetInnerHTML={{ __html: parseResponse(msg.text) }} />
              {msg.type === 'intro' && (
                <div className="intro-prompts">
                    <button onClick={() => handleSend("Suggest a beach vacation")}>Suggest a beach vacation</button>
                    <button onClick={() => handleSend("What are the best mountain treks?")}>Best mountain treks?</button>
                    <button onClick={() => handleSend("Plan a 3-day trip to Jaipur")}>Plan a trip to Jaipur</button>
                </div>
              )}
            </div>
          ))}
          {isLoading && <div className="message bot typing-indicator"><span></span><span></span><span></span></div>}
          <div ref={messagesEndRef} />
        </div>
        <form className="chatbot-input-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything..."
            autoComplete="off"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {/* Send Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      </div>
      <button onClick={toggleChat} className="chatbot-toggle-button">
        {/* Paper Airplane Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </div>
  );
}

export default Chatbot;

