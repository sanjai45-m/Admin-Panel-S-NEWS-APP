import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import LoginPage from './LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user-list"
          element={<ProtectedRoute element={<UsersList />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
