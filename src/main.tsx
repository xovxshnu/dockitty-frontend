import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <GoogleOAuthProvider clientId="315445638135-m43ec5hv1qhm32o2kgkeng7qbtvjg2et.apps.googleusercontent.com">
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  // </GoogleOAuthProvider>
);
