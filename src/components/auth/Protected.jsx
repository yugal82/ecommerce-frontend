import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../features/user/userSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectUserInfo);
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
