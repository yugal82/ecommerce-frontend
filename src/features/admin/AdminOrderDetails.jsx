import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminOrderDetails = () => {
  const { state } = useLocation();
  console.log(state);
  return <div className="text-white">{state.id}</div>;
};

export default AdminOrderDetails;
