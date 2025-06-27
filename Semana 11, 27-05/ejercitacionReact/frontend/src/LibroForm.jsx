import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/libros';

function LibroForm({ bookToEdit, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        Titulo: '',
        Autor: '',
        AnioPublicacion: ''
    });

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                Titulo: bookToEdit.Titulo || '',
                Autor: bookToEdit.Autor || '',
                AnioPublicacion: bookToEdit.AnioPublicacion || ''
            });
        } else {
            setFormData({
                Titulo: '',
                Autor: '',
                AnioPublicacion: ''
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (bookToEdit) {
                response = await axios.put(`${API_URL}/${bookToEdit.IdLibro}`, formData);
                alert('Libro actualizado exitosamente.');
            } else {
                response = await axios.post(API_URL, formData);
                alert('Libro creado exitosamente.');
            }

            if (onSave) onSave();
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || error.message || 'Error desconocido al guardar el libro.';
            alert(`Error al guardar el libro: ${errorMessage}`);
        }
    };

    return (
        <div className="card shadow p-4">
            <h4 className="mb-4">{bookToEdit ? '✏️ Modificar Libro' : '➕ Agregar Nuevo Libro'}</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Titulo" className="form-label">
                        Título
                    </label>
                    <input
                        type="text"
                        id="Titulo"
                        name="Titulo"
                        value={formData.Titulo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ej: Cien años de soledad"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Autor" className="form-label">
                        Autor
                    </label>
                    <input
                        type="text"
                        id="Autor"
                        name="Autor"
                        value={formData.Autor}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ej: Gabriel García Márquez"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="AnioPublicacion" className="form-label">
                        Año de Publicación
                    </label>
                    <input
                        type="number"
                        id="AnioPublicacion"
                        name="AnioPublicacion"
                        value={formData.AnioPublicacion}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Ej: 1967"
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">
                        💾 Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        ❌ Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LibroForm;
