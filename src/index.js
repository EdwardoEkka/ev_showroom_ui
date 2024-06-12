import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from "react-dom/client"
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
);
