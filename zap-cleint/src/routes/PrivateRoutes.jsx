import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {


    const { authInfo } = useAuth();
    const { user, loading } = authInfo;
    const location =  useLocation();
    console.log("Location", location);

    if (loading) {
        return <div>
            <span className="loading loading-ring loading-lg"></span>

        </div>
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }}></Navigate>
    }
    return children;
}

export default PrivateRoutes
