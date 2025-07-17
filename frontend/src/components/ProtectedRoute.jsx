import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import paths from '../routes/paths.js';
import {accessControl} from '../utils/accessControl';
import Loading from './Loading';
import AuthService from '../services/auth/AuthService';

const ProtectedRoute = ({ roles, element: Component, ...rest }) => {
    const [userRoles, setUserRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        AuthService.getRole()
            .then((res) => setUserRoles(res.roles))
            .catch((err) => console.error("Error fetching roles", err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <Loading/>

    if (!accessControl(userRoles, roles))
        return <Navigate to={paths.forbidden} state={{ from: location }} />;

    return <Component {...rest} userRoles={userRoles}/>;
};

export default ProtectedRoute;
