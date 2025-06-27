import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Tu componente principal
// import './index.css'; // Opcional: Archivo CSS global

// Punto de entrada de la aplicación React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);