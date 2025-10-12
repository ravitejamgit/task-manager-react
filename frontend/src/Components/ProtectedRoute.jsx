import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute( { children } ) {

    if(!(JSON.parse(localStorage.getItem('loggedIn'))))
        return <Navigate to = "/" replace />

    

    return children;
}