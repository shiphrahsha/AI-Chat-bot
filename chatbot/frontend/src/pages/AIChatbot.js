import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/AIChatbot.css';

const AIChatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const userId = localStorage.getItem('userId');
    const location = useLocation();

    // Function to transform backend response into frontend format
    const transformChatHistory = (backendHistory) => {
        const formattedHistory = [];
        backendHistory.forEach((chat) => {
            if (chat.message) {
                formattedHistory.push({ sender: 'user', text: chat.message });
            }
            if (chat.response) {
                formattedHistory.push({ sender: 'bot', text: chat.response });
            }
        });
        return formattedHistory;
    };

    // Initialize chat history with the data passed from the options page
    useEffect(() => {
        if (location.state?.chatHistory) {
            console.log('Chat history received:', location.state.chatHistory); // Debugging
            const formattedHistory = transformChatHistory(location.state.chatHistory);
            setChatHistory(formattedHistory);
        }
    }, [location.state]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                // Send the user's message to the backend
                const response = await axios.post('http://localhost:5000/chat', {
                    user_id: userId,
                    message: message.trim(),
                });

                // Add the user's message and the bot's response to the chat history
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'user', text: message.trim() },
                    { sender: 'bot', text: response.data.message },
                ]);

                // Clear the input field
                setMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <div className="ai-chatbot">
            <h1>AI Chatbot</h1>
            <div className="chat-window">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`message ${chat.sender}`}>
                        <p>{chat.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default AIChatbot;