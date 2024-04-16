import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserAsync, selectUserInfo } from './userSlice';
import { selectLoggedInUser } from '../auth/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  // const userDetailedInfo = useSelector(selectUserInfo);
  const user = useSelector(selectLoggedInUser);

  // useEffect(() => {
  //   dispatch(getLoggedInUserAsync(user));
  // }, [dispatch, user]);
  // getLoggedInUserAsync(user) gives the same data as that of selectLoggedInUser does. So instead of making multiple functions for the same thing, we just dont call getLoggedInUserAsync(). Instead, we just use the selectLoggedInUser selector whenever we want user info

  return <div className="text-white">User Profile</div>;
};

export default UserProfile;
