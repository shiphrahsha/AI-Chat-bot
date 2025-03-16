import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './pages/Chatbot';
import OptionsPage from './pages/OptionsPage';
import AIChatbot from './pages/AIChatbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/aichatbot" element={<AIChatbot />} />
      </Routes>
    </Router>
  );
};

export default App;