import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { selectLoggedInUser } from '../../features/auth/authSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (!user) toast.error('Please login', { position: 'bottom-right', autoClose: true, delay: 3000 });
  }, [user]);

  if (!user)
    return (
      <div>
        <Navigate to="/login" replace={true} />
        <ToastContainer theme="dark" />
      </div>
    );

  return children;
};

export default Protected;
