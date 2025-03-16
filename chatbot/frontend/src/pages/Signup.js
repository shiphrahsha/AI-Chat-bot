import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import '../css/AuthPage.css'; // Import the CSS file
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try {
          const response = await axios.post('http://localhost:5000/signup', data); // Replace with your backend URL
          console.log('Signup successful:', response.data);
          alert('Signup successful!');
          navigate('/login');
          // Optionally, you can redirect the user or store the user ID/token in state/localStorage
        } catch (error) {
          console.error('Signup failed:', error.response?.data || error.message);
          alert(error.response?.data?.error || 'Signup failed. Please try again.');
        }
      };
    

  return (
    <div className="auth-page">
      <AuthForm isLogin={false} onSubmit={handleSubmit} />
      <p className="auth-page-link">
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  );
};

export default Signup;