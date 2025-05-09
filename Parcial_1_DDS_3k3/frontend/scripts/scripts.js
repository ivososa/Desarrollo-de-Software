// Referencias a elementos del DOM
const buscarMarcaInput = document.getElementById('buscarMarca');
const btnBuscar = document.getElementById('btnBuscar');
const tablaMotos = document.getElementById('tablaMotos');
const mensajes = document.getElementById('mensajes');
const noResultados = document.getElementById('noResultados');

// URL base del backend
const API_URL = 'http://localhost:3000/api/motos';

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'info') {
    mensajes.textContent = mensaje;
    mensajes.className = `alert alert-${tipo}`;
    mensajes.classList.remove('d-none');
}

// Función para ocultar mensajes
function ocultarMensaje() {
    mensajes.classList.add('d-none');
}

// Función para formatear fecha (YYYY-MM-DD a DD/MM/YYYY)
function formatearFecha(fechaStr) {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES');
}

// Función para formatear precio (con símbolo $ y 2 decimales)
function formatearPrecio(precio) {
    if (precio === null || precio === undefined) return '';
    return `$${Number(precio).toFixed(2)}`;
}

// Función para cargar todas las motos o filtradas por marca
async function cargarMotos(marcaBusqueda = '') {
    try {
        mostrarMensaje('Cargando motos...');
        noResultados.style.display = 'none';
        
        let url = API_URL;
        if (marcaBusqueda) {
            url += `?buscarMarca=${encodeURIComponent(marcaBusqueda)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error al obtener datos del servidor');
        }
        
        const motos = await response.json();
        
        // Limpiar tabla
        tablaMotos.innerHTML = '';
        
        if (motos.length === 0) {
            ocultarMensaje();
            noResultados.style.display = 'block';
            return;
        }
        
        // Agregar cada moto a la tabla
        motos.forEach(moto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${moto.IdMoto}</td>
                <td>${moto.Marca}</td>
                <td>${moto.Modelo}</td>
                <td>${moto.AñoFabricacion}</td>
                <td>${moto.Cilindrada}</td>
                <td>${formatearFecha(moto.FechaIngreso)}</td>
                <td>${formatearPrecio(moto.Precio)}</td>
            `;
            tablaMotos.appendChild(fila);
        });
        
        ocultarMensaje();
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje(`Error al cargar datos: ${error.message}`, 'danger');
    }
}

// Event Listener para botón de búsqueda
btnBuscar.addEventListener('click', () => {
    const marcaBusqueda = buscarMarcaInput.value.trim();
    cargarMotos(marcaBusqueda);
});

// Event Listener para búsqueda con Enter
buscarMarcaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnBuscar.click();
    }
});

// Cargar todas las motos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarMotos();
});