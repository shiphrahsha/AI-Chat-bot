import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, Typography } from '@mui/material';
import socket from '../socket';

const Chat = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { user_id: userId, message });
      setMessage('');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Chatbot
      </Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <Typography>
              <strong>User {msg.user_id}:</strong> {msg.message}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;