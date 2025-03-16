import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../css/AuthPage.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/login', data);
            console.log('Login successful:', response.data);
            alert('Login successful!');

            // Store the user ID in localStorage
            localStorage.setItem('userId', response.data.user_id);

            // Fetch the chat history for the user
            const chatHistoryResponse = await axios.get('http://localhost:5000/chat/history', {
                params: { user_id: response.data.user_id },
            });

            // Navigate to the options page with the chat history
            navigate('/options', { state: { chatHistory: chatHistoryResponse.data.chat_history } });
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <AuthForm isLogin onSubmit={handleSubmit} />
            <p className="auth-page-link">
                Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
            </p>
        </div>
    );
};

export default Login;