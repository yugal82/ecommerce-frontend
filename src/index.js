import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 3000,
  offset: '50px',
  transition: transitions.SCALE,
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
