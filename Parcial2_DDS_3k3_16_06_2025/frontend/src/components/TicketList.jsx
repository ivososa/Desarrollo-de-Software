function TicketList({ tickets, isLoading, error }) {
    // Si está cargando, mostramos el mensaje de carga
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-muted">Cargando tickets...</p>
          </div>
        </div>
      );
    }
  
    // Si hay error, mostramos el mensaje de error
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      );
    }
  
    // Si no hay tickets, mostramos el mensaje correspondiente
    if (!tickets || tickets.length === 0) {
      return (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          No se encontraron tickets
        </div>
      );
    }
  
    // Si hay tickets, renderizamos la tabla
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre de la Tarea</th>
              <th scope="col">Fecha</th>
              <th scope="col">Prioridad</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.idTicket}>
                <td>{ticket.idTicket}</td>
                <td>{ticket.nombreTarea}</td>
                <td>
                  {/* Formateamos la fecha para mostrarla de manera más legible */}
                  {new Date(ticket.fecha).toLocaleDateString('es-AR')}
                </td>
                <td>
                  {/* Agregamos un badge con color según la prioridad */}
                  <span className={`badge ${getPriorityBadgeClass(ticket.prioridad)}`}>
                    {ticket.prioridad}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Información adicional sobre la cantidad de tickets */}
        <div className="mt-3">
          <small className="text-muted">
            Total de tickets: {tickets.length}
          </small>
        </div>
      </div>
    );
  }
  
  // Función auxiliar para asignar colores a los badges según la prioridad
  function getPriorityBadgeClass(prioridad) {
    if (prioridad >= 8) return 'bg-danger';      // Prioridad alta (8-10): rojo
    if (prioridad >= 5) return 'bg-warning';     // Prioridad media (5-7): amarillo
    return 'bg-success';                         // Prioridad baja (1-4): verde
  }
  
  export default TicketList;