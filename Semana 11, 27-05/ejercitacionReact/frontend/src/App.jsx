// src/App.jsx
import React from 'react';
// import './App.css'; // Opcional: Archivo CSS de la app
import LibrosPage from './LibrosPage'; // Tu componente principal de la página de libros

function App() {
  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Gestión de Libros - DDS UTN FRC</h1>
        {/* Renderiza el componente principal de la página de libros */}
        <LibrosPage />
      </div>
    </>

  );
}

export default App;