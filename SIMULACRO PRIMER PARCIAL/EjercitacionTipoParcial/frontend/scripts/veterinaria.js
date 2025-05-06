document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api/pacientes';

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const patientsTableBody = document.getElementById('patientsTableBody');
    const noPatientsMessage = document.getElementById('no-patients-message');

    const formContainer = document.getElementById('formContainer');
    const formTitle = document.getElementById('formTitle');
    const patientForm = document.getElementById('patientForm');
    const inputId = document.getElementById('inputId');
    const inputNombre = document.getElementById('inputNombre');
    const inputPropietario = document.getElementById('inputPropietario');
    const inputTelefono = document.getElementById('inputTelefono');
    const cancelEdit = document.getElementById('cancelEdit');
    const newPatientButton = document.getElementById('newPatientButton');

    let currentPage = 1; // Página inicial

    // Mostrar formulario con datos
    function showForm(paciente) {
        formContainer.style.display = 'block';
        if (paciente) {
            formTitle.textContent = 'Editar Paciente';
            inputId.value = paciente.IdPaciente;
            inputNombre.value = paciente.NombreMascota;
            inputPropietario.value = paciente.Propietario;
            inputTelefono.value = paciente.Telefono ?? '';
        } else {
            formTitle.textContent = 'Nuevo Paciente';
            inputId.value = '';
            inputNombre.value = '';
            inputPropietario.value = '';
            inputTelefono.value = '';
        }
    }

    function hideForm() {
        formContainer.style.display = 'none';
    }

    // Eliminar paciente
    async function eliminarPaciente(id) {
        if (confirm('¿Seguro que deseas eliminar este paciente?')) {
            try {
                const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('No se pudo eliminar');
                fetchPacientes();
            } catch (err) {
                alert('Error al eliminar paciente.');
                console.error(err);
            }
        }
    }

    // Función para renderizar una fila de paciente
    function renderPaciente(paciente) {
        return `
            <tr data-id="${paciente.IdPaciente}">
                <td>${paciente.IdPaciente}</td>
                <td>${paciente.NombreMascota}</td>
                <td>${paciente.Propietario}</td>
                <td>${paciente.Telefono ?? ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1 btn-edit">Modificar</button>
                    <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
                </td>
            </tr>
        `;
    }

    function mostrarPacientes(pacientes) {
        if (pacientes.length === 0) {
            noPatientsMessage.style.display = 'block';
            patientsTableBody.innerHTML = '';
        } else {
            noPatientsMessage.style.display = 'none';
            patientsTableBody.innerHTML = pacientes.map(renderPaciente).join('');
        }
    }

    async function fetchPacientes(filtroPropietario = '') {
        try {
            const url = filtroPropietario
                ? `${API_URL}?propietario=${encodeURIComponent(filtroPropietario)}&pagina=${currentPage}`
                : `${API_URL}?pagina=${currentPage}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener pacientes');
            const data = await response.json();

            console.log('Datos recibidos:', data);  // Verificación de los datos

            const pacientes = data.Items ?? data;
            mostrarPacientes(pacientes);
            updatePagination(data.TotalPaginas);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            noPatientsMessage.textContent = 'Error al cargar pacientes.';
            noPatientsMessage.style.display = 'block';
        }
    }

    function updatePagination(totalPages) {
        const paginationControls = document.getElementById('paginationControls');
        paginationControls.innerHTML = `
            <button class="btn btn-primary" ${currentPage === 1 ? 'disabled' : ''} onclick="prevPage()">Anterior</button>
            <span>Página ${currentPage} de ${totalPages}</span>
            <button class="btn btn-primary" ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} onclick="nextPage()">Siguiente</button>
        `;
    }

    // Función para cargar la página siguiente
    function nextPage() {
        currentPage++;
        fetchPacientes(searchInput.value.trim());
    }

    // Función para cargar la página anterior
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchPacientes(searchInput.value.trim());
        }
    }

    // Delegación de eventos: eliminar o editar
    patientsTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const id = row.dataset.id;

        if (e.target.classList.contains('btn-delete')) {
            eliminarPaciente(id);
        }

        if (e.target.classList.contains('btn-edit')) {
            // Obtener datos actuales desde las celdas
            const nombre = row.children[1].textContent;
            const propietario = row.children[2].textContent;
            const telefono = row.children[3].textContent;
            showForm({
                IdPaciente: id,
                NombreMascota: nombre,
                Propietario: propietario,
                Telefono: telefono
            });
        }
    });

    // Enviar formulario (guardar cambios)
    patientForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const paciente = {
            NombreMascota: inputNombre.value.trim(),
            Propietario: inputPropietario.value.trim(),
            Telefono: inputTelefono.value.trim()
        };

        if (!paciente.NombreMascota || !paciente.Propietario) {
            alert('Nombre de mascota y propietario son obligatorios.');
            return;
        }

        try {
            const id = inputId.value;

            const url = id ? `${API_URL}/${id}` : API_URL;
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paciente)
            });
            if (!res.ok) throw new Error('Error al actualizar');
            hideForm();
            fetchPacientes();
        } catch (err) {
            alert('Error al guardar cambios');
            console.error(err);
        }
    });

    // Cancelar edición
    cancelEdit.addEventListener('click', hideForm);

    // Buscar pacientes
    searchButton.addEventListener('click', () => {
        const filtro = searchInput.value.trim();
        fetchPacientes(filtro);
    });

    // Evento para el botón nuevo paciente
    newPatientButton.addEventListener('click', () => {
        showForm(null);
    });

    // Cargar pacientes al iniciar
    fetchPacientes();
});
