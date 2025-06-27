import React from 'react';

function LibrosTable({ libros, onDelete, onEdit }) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h4 className="card-title mb-3">📚 Lista de Libros</h4>
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Año</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libros.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        No se encontraron libros.
                                    </td>
                                </tr>
                            ) : (
                                libros.map((libro) => (
                                    <tr key={libro.IdLibro}>
                                        <td>{libro.IdLibro}</td>
                                        <td>{libro.Titulo}</td>
                                        <td>{libro.Autor}</td>
                                        <td>{libro.AnioPublicacion || 'N/A'}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => onEdit(libro)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(libro.IdLibro)}
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LibrosTable;
