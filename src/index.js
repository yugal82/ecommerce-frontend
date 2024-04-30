import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { selectUserAuthChecked } from './features/auth/authSlice';

const container = document.getElementById('root');
const root = createRoot(container);
const userAuthChecked = useSelector(selectUserAuthChecked);

root.render(
  <React.StrictMode>
    {userAuthChecked && (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )}
  </React.StrictMode>
);
