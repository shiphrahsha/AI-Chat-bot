import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/OptionsPage.css';

const OptionsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const chatHistory = location.state?.chatHistory || []; // Get chat history from navigation state

    const handleChatWithUsers = () => {
        navigate('/chatbot');
    };

    const handleChatWithAI = () => {
        // Pass the chat history to the AIChatbot component
        navigate('/aichatbot', { state: { chatHistory } });
    };

    return (
        <div className="options-page">
            <h2>Choose an option:</h2>
            <button className="option-button" onClick={handleChatWithUsers}>
                Chat with Users
            </button>
            <button className="option-button" onClick={handleChatWithAI}>
                Chat with AI
            </button>
        </div>
    );
};

export default OptionsPage;