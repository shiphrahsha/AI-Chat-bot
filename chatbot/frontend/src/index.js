import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import { CssBaseline } from '@mui/material';

// Create a root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);