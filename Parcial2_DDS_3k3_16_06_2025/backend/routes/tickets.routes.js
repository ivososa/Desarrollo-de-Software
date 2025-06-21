// backend/routes/tickets.routes.js
const { Router } = require('express');
const Ticket = require('../models/ticket.model');

const router = Router();

// Endpoint: GET /api/tickets
// Retorna todos los tickets ordenados por ID de forma descendente.
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      order: [['idTicket', 'DESC']] // Muestra los más nuevos primero
    });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Endpoint: POST /api/tickets
// Crea un nuevo ticket con los datos enviados en el body.
router.post('/', async (req, res) => {
  try {
    const { nombreTarea, fecha, prioridad } = req.body;

    // Sequelize se encarga de las validaciones definidas en el modelo.
    const nuevoTicket = await Ticket.create({
      nombreTarea,
      fecha,
      prioridad,
    });

    // Retorna el nuevo ticket creado con un estado 201 (Creado).
    res.status(201).json(nuevoTicket);
  } catch (error) {
    // Si hay un error de validación de Sequelize, lo manejamos.
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors: messages });
    }
    console.error("Error al crear ticket:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;