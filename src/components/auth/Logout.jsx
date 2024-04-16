import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync, selectLoggedInUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAsync(user));
    navigate('/');
  }, []);

  return <div>Logout</div>;
};

export default Logout;
