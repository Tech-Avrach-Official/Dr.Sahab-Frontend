import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Providers from './global_redux/provider/provider.jsx';
// import Providers from './global_redux/provider/provider.jsx/index.jsx';
// import Providers from './provider/provider.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);