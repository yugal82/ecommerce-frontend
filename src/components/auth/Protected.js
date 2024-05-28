import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../features/user/userSlice';
import { useAlert } from 'react-alert';

const Protected = ({ children }) => {
  const user = useSelector(selectUserInfo);
  const alert = useAlert();
  useEffect(() => {
    if (!user) alert.error('Please login');
  }, [user]);

  if (!user) return <Navigate to="/login" replace={true} />;

  return children;
};

export default Protected;
