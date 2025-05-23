import './index.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
