import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibrosTable from './LibrosTable';
import LibroForm from './LibroForm';

const API_URL = 'http://localhost:3000/api/libros';

function LibrosPage() {
    const [libros, setLibros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = async () => {
        try {
            const response = await axios.get(API_URL);
            setLibros(response.data);
        } catch (error) {
            console.error('Error al obtener libros:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                alert('Libro eliminado.');
                fetchLibros();
            } catch (error) {
                console.error('Error al eliminar libro:', error);
            }
        }
    };

    const handleEdit = (libro) => {
        setEditingBook(libro);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setEditingBook(null);
        fetchLibros();
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    // Filtrar libros por búsqueda
    const librosFiltrados = libros.filter((libro) =>
        libro.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg shadow-sm"
                        placeholder="🔍 Buscar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row justify-content-center mb-4">
                <div className="col-md-6 text-center">
                    {!showForm && (
                        <button
                            className="btn btn-success btn-lg px-4 shadow"
                            onClick={() => {
                                setEditingBook(null);
                                setShowForm(true);
                            }}
                        >
                            ➕ Agregar Nuevo Libro
                        </button>
                    )}
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-10">
                    {showForm ? (
                        <LibroForm
                            bookToEdit={editingBook}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <LibrosTable
                            libros={librosFiltrados}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default LibrosPage;
