import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authStatus = useSelector((state) => state.auth.status);

    return authStatus ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
