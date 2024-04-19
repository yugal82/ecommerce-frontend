import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../../features/auth/authSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  if (!user)
    return (
      <>
        {alert('Please login')}
        <Navigate to="/login" replace={true} />;
      </>
    );

  return children;
};

export default Protected;
