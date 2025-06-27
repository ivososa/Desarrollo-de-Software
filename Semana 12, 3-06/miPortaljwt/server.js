// server.js 
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3001; // Puerto 3001 para evitar conflictos

// Configuración de middleware para procesamiento de JSON
app.use(express.json());

// CLAVE SECRETA: En un entorno de producción, esta debe ser una variable de entorno
// segura y compleja, nunca hardcodeada en el código fuente
const JWT_SECRET = 'clave-super-secreta-para-alumnos-utn-frc-dss-123';

// Base de datos simulada de usuarios registrados
// NOTA IMPORTANTE: En producción, las contraseñas deben estar hasheadas con bcrypt
const users = [
    {
        id: 1, 
        username: 'ana.perez', 
        password: 'password123', 
        role: 'alumno', 
        nombre: 'Ana Pérez'
    },
    {
        id: 2, 
        username: 'juan.lopez', 
        password: 'password456', 
        role: 'alumno', 
        nombre: 'Juan López'
    },
    {
        id: 3, 
        username: 'carlos.gomez', 
        password: 'passdocente', 
        role: 'docente', 
        nombre: 'Carlos Gómez'
    },
    {
        id: 4, 
        username: 'laura.diaz', 
        password: 'passadmin', 
        role: 'admin', 
        nombre: 'Laura Díaz'
    }
];

// Mostrar credenciales de prueba en consola
console.log("Credenciales de usuarios para testing (usuario/contraseña):");
users.forEach(user => console.log(`  → ${user.username} / ${user.password} (Rol: ${user.role})`));
console.log("-------------------------------------------");

// === MIDDLEWARE PARA VERIFICACIÓN DE TOKENS ===
function authenticateToken(req, res, next) {
    // Obtener el header de autorización
    const authHeader = req.headers['authorization']; // Esperamos formato: "Bearer TOKEN"
    
    // Extraer solo el token de la cadena "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        // Token no proporcionado en la solicitud
        return res.status(401).json({ 
            message: 'Acceso denegado. Token de autorización requerido.' 
        });
    }

    // Verificar la validez del token
    jwt.verify(token, JWT_SECRET, (err, userPayload) => {
        if (err) {
            // Token inválido o expirado
            console.error('Fallo en verificación de JWT:', err.message);
            
            let errorMessage = 'Token inválido.';
            if (err.name === 'TokenExpiredError') {
                errorMessage = 'Token expirado. Debe iniciar sesión nuevamente.';
            }
            
            return res.status(403).json({ 
                message: `Acceso prohibido. ${errorMessage}` 
            });
        }

        // Token válido - agregar datos del usuario al request
        req.user = userPayload;
        next(); // Continuar con el siguiente middleware
    });
}

// === MIDDLEWARE PARA CONTROL DE ACCESO POR ROLES ===
// Función factory que retorna middleware de autorización
// Parámetro: array de roles permitidos. Ej: ['admin'], ['docente'], ['alumno', 'docente']
function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        // Verificar que el usuario tenga rol asignado (debería existir tras authenticateToken)
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: 'Acceso prohibido. No se pudo determinar el rol del usuario.'
            });
        }

        // Comprobar si el rol del usuario está en la lista de roles permitidos
        const hasPermission = allowedRoles.includes(req.user.role);
        
        if (!hasPermission) {
            return res.status(403).json({
                message: `Acceso prohibido. Su rol ('${req.user.role}') no tiene permisos suficientes. Se requiere: ${allowedRoles.join(' o ')}.`
            });
        }

        next(); // Usuario autorizado, continuar
    };
}

// === ENDPOINTS DEL SISTEMA ===

// ENDPOINT PÚBLICO - Accesible sin autenticación
app.get('/api/public/noticias', (req, res) => {
    res.json({
        titulo: "¡Bienvenidos al Portal de la UTN FRC!",
        contenido: "Aquí encontrarás las últimas novedades y eventos importantes.",
        fecha: new Date().toLocaleDateString()
    });
});

// === ENDPOINT DE AUTENTICACIÓN ===
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Validar que se proporcionen ambos campos
    if (!username || !password) {
        return res.status(400).json({ 
            message: 'Los campos usuario y contraseña son obligatorios.' 
        });
    }

    // Buscar usuario con credenciales coincidentes
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ 
            message: 'Las credenciales proporcionadas son incorrectas.' 
        });
    }

    // Crear payload para el JWT
    const payload = {
        userId: user.id,
        username: user.username,
        role: user.role,
        nombre: user.nombre
    };

    // Generar token firmado con expiración
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
        message: `¡Bienvenido ${user.nombre}! Sesión iniciada correctamente.`,
        token: token,
        user: payload // Información del usuario para el cliente
    });
});

// ENDPOINT PROTEGIDO - Requiere autenticación (cualquier usuario logueado)
app.get('/api/me/perfil', authenticateToken, (req, res) => {
    // req.user fue establecido por authenticateToken
    res.json({
        message: `Información de perfil para ${req.user.nombre}`,
        usuario: req.user // Datos completos del token
    });
});

// ENDPOINT EXCLUSIVO PARA ALUMNOS
app.get('/api/alumnos/mis-notas', authenticateToken, authorizeRoles(['alumno']), (req, res) => {
    // Datos simulados de calificaciones
    const notas = [
        { materia: "Desarrollo de Software", nota: 8 },
        { materia: "Base de Datos", nota: 7 },
        { materia: "Sistemas Operativos", nota: 9 }
    ];

    res.json({
        message: `Calificaciones del alumno ${req.user.nombre}`,
        notas: notas,
        promedio: (notas.reduce((sum, n) => sum + n.nota, 0) / notas.length).toFixed(2)
    });
});

// ENDPOINT EXCLUSIVO PARA DOCENTES
app.post('/api/docentes/cargar-nota', authenticateToken, authorizeRoles(['docente']), (req, res) => {
    const { alumnoId, materia, nota } = req.body;

    // Validar datos requeridos
    if (!alumnoId || !materia || nota === undefined) {
        return res.status(400).json({
            message: 'Los campos alumnoId, materia y nota son obligatorios.'
        });
    }

    // En un sistema real, aquí se guardaría en base de datos
    res.json({
        message: `Calificación ${nota} registrada para la materia ${materia} del estudiante ID ${alumnoId} por el docente ${req.user.nombre}.`,
        dataRecibida: req.body
    });
});

// ENDPOINT EXCLUSIVO PARA ADMINISTRADORES
app.get('/api/admin/usuarios', authenticateToken, authorizeRoles(['admin']), (req, res) => {
    // Retornar lista de usuarios sin exponer contraseñas
    const usersList = users.map(u => ({
        id: u.id, 
        username: u.username, 
        role: u.role,
        nombre: u.nombre
    }));

    res.json({
        message: `Lista de usuarios del sistema consultada por ${req.user.nombre} (Administrador)`,
        usuarios: usersList
    });
});

// ENDPOINT PARA DOCENTES Y ADMINISTRADORES
app.get('/api/cursos/gestion', authenticateToken, authorizeRoles(['docente', 'admin']), (req, res) => {
    const cursos = [
        { id: "DS001", nombre: "Desarrollo de Software", creditos: 8 },
        { id: "BD002", nombre: "Bases de Datos", creditos: 6 }
    ];

    res.json({
        message: `Panel de gestión de cursos accedido por ${req.user.nombre} (Rol: ${req.user.role})`,
        cursos: cursos
    });
});

// === MANEJO DE ERRORES Y RUTAS NO ENCONTRADAS ===

// Middleware para rutas inexistentes (404)
app.use((req, res, next) => {
    res.status(404).json({
        message: `La ruta solicitada no existe: ${req.method} ${req.originalUrl}`
    });
});

// Middleware de manejo global de errores (debe tener exactamente 4 parámetros)
// Se ejecuta cuando algún middleware anterior invoca next(error) o lanza excepción
app.use((err, req, res, next) => {
    console.error("ERROR NO MANEJADO:", err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Se produjo un error inesperado en el servidor.',
        // En desarrollo podría ser útil incluir el stack trace, pero NUNCA en producción
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor del Portal JWT ejecutándose en http://localhost:${PORT}`);
    console.log("RECORDATORIO: Las contraseñas están en texto plano únicamente para propósitos de demostración.");
});