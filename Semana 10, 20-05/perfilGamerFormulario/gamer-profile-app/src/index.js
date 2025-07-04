// src/index.js o src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // o solo 'react-dom' si es App.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
