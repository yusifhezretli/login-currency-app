import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from './authSlice';
import LoginPage from './LoginPage';
import Home from './Home';
import './App.css';

const App = () => {
  const isAuthenticated = useSelector(selectAuth);

  return (
    
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </Router>
   
  );
};

export default App;