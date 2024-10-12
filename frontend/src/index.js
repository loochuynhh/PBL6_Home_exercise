import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import reportWebVitals from 'reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="69967422593-7900e3kt4m5l2kg6g257rmhm3lras5de.apps.googleusercontent.com">
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
