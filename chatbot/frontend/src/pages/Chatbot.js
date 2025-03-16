import React from 'react';
import Chat from '../components/Chat';

const Chatbot = () => {
  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return <div>User not logged in. Please log in to access the chatbot.</div>;
  }

  return (
    <div>
      <Chat userId={userId} />
    </div>
  );
};

export default Chatbot;