import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router> {/* Wrap App with Router */}
    <App />
  </Router>
);