// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
// La línea que importaba './index.css' ha sido eliminada.

// Importamos el componente principal de nuestra aplicación
import App from './App'; 

// La importación de 'reportWebVitals' y la llamada a la función han sido eliminadas.


// 1. Buscamos el elemento div con id="root" en nuestro public/index.html
const rootElement = document.getElementById('root');

// 2. Creamos el "root" de React en ese elemento del DOM.
const root = ReactDOM.createRoot(rootElement);

// 3. Renderizamos nuestra aplicación dentro de ese root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);