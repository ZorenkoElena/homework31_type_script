import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
// import reportWebVitals from './reportWebVitals';

import { store } from './store/store';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// reportWebVitals();
