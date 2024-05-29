import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../features/user/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const Protected = ({ children }) => {
  const user = useSelector(selectUserInfo);

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
