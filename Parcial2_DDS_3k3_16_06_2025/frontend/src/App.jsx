import { useState, useEffect } from 'react';
import axios from 'axios';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// URL base de la API. ¡Asegúrate de que el puerto sea 4000!
const API_URL = 'http://localhost:4000/api/tickets';

function App() {
  // Estado para almacenar la lista de tickets
  const [tickets, setTickets] = useState([]);
  // Estado para manejar el mensaje de "Cargando..."
  const [isLoading, setIsLoading] = useState(true);
  // Estado para manejar errores de carga
  const [error, setError] = useState(null);

  // useEffect para cargar los tickets cuando el componente se monta por primera vez
  useEffect(() => {
    fetchTickets();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  // Función para obtener los tickets del backend
  const fetchTickets = async () => {
    try {
      setIsLoading(true); // Inicia la carga
      setError(null); // Limpia errores previos
      const response = await axios.get(API_URL);
      setTickets(response.data); // Actualiza el estado con los datos de la API
    } catch (err) {
      console.error("Error al obtener los tickets:", err);
      setError("No se pudieron cargar los tickets. Intente más tarde.");
    } finally {
      setIsLoading(false); // Finaliza la carga, sin importar si fue exitosa o no
    }
  };

  // Función que se pasará al formulario para actualizar la lista cuando se cree un nuevo ticket.
  // Recibe el nuevo ticket creado desde el componente hijo (TicketForm).
  const handleTicketCreated = (newTicket) => {
    // Añade el nuevo ticket al principio de la lista para una visibilidad inmediata
    // sin necesidad de volver a llamar a la API.
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="display-4 text-center">Sistema de Gestión de Tickets</h1>
        <p className="text-center text-muted">Parcial DDS - React</p>
      </header>
      
      <main>
        <div className="row">
          <div className="col-md-5">
            <h2 className="mb-3">Crear Nuevo Ticket</h2>
            {/* Pasamos la función como prop al formulario */}
            <TicketForm onTicketCreated={handleTicketCreated} />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">Tickets Pendientes</h2>
            {/* Pasamos los datos y estados a la lista */}
            <TicketList 
              tickets={tickets} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;