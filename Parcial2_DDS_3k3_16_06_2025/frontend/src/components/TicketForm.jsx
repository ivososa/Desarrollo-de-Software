import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
          
// URL base de la API
const API_URL = 'http://localhost:4000/api/tickets';

function TicketForm({ onTicketCreated }) {
  // Estados para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Función que se ejecuta cuando se envía el formulario
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      // Preparamos los datos para enviar al backend
      const ticketData = {
        nombreTarea: data.nombreTarea,
        fecha: data.fecha,
        prioridad: parseInt(data.prioridad, 10), // Convertimos a número entero
      };

      console.log('Enviando datos:', ticketData);

      // Realizamos la petición POST al backend
      const response = await axios.post(API_URL, ticketData);

      console.log('Respuesta del servidor:', response.data);

      // Si la creación fue exitosa, notificamos al componente padre
      if (onTicketCreated) {
        onTicketCreated(response.data);
      }

      // Limpiamos el formulario
      reset();

      // Mostramos mensaje de éxito
      setSubmitMessage('¡Ticket creado exitosamente!');

      // Limpiamos el mensaje después de 3 segundos
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error al crear el ticket:', error);
      
      // Manejamos diferentes tipos de errores
      let errorMessage = 'Error al crear el ticket. Intente nuevamente.';
      
      if (error.response) {
        // El servidor respondió con un error
        errorMessage = `Error del servidor: ${error.response.status}`;
        if (error.response.data && error.response.data.message) {
          errorMessage += ` - ${error.response.data.message}`;
        }
      } else if (error.request) {
        // No se pudo conectar con el servidor
        errorMessage = 'No se pudo conectar con el servidor. Verifique que esté ejecutándose.';
      }

      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo: Nombre de la Tarea */}
          <div className="mb-3">
            <label htmlFor="nombreTarea" className="form-label">
              Nombre de la Tarea <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.nombreTarea ? 'is-invalid' : ''}`}
              id="nombreTarea"
              placeholder="Ingrese el nombre de la tarea"
              {...register('nombreTarea', {
                required: 'El nombre de la tarea es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 100,
                  message: 'El nombre no puede exceder los 100 caracteres'
                }
              })}
            />
            {errors.nombreTarea && (
              <div className="invalid-feedback">
                {errors.nombreTarea.message}
              </div>
            )}
          </div>

          {/* Campo: Fecha */}
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">
              Fecha <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
              id="fecha"
              {...register('fecha', {
                required: 'La fecha es obligatoria'
              })}
            />
            {errors.fecha && (
              <div className="invalid-feedback">
                {errors.fecha.message}
              </div>
            )}
          </div>

          {/* Campo: Prioridad */}
          <div className="mb-3">
            <label htmlFor="prioridad" className="form-label">
              Prioridad (1-10) <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className={`form-control ${errors.prioridad ? 'is-invalid' : ''}`}
              id="prioridad"
              placeholder="Ingrese un número del 1 al 10"
              min="1"
              max="10"
              {...register('prioridad', {
                required: 'La prioridad es obligatoria',
                min: {
                  value: 1,
                  message: 'La prioridad debe ser mayor o igual a 1'
                },
                max: {
                  value: 10,
                  message: 'La prioridad debe ser menor o igual a 10'
                },
                valueAsNumber: true // Convierte automáticamente a número
              })}
            />
            {errors.prioridad && (
              <div className="invalid-feedback">
                {errors.prioridad.message}
              </div>
            )}
            <div className="form-text">
              1-4: Baja | 5-7: Media | 8-10: Alta
            </div>
          </div>

          {/* Botón de envío */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creando...
                </>
              ) : (
                'Crear Ticket'
              )}
            </button>
          </div>

          {/* Mensaje de resultado */}
          {submitMessage && (
            <div className={`alert mt-3 ${submitMessage.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`} role="alert">
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TicketForm;