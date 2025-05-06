const express = require("express");
const router = express.Router();
const Paciente = require("../models/pacienteModels");
const { Op, ValidationError } = require("sequelize");

// Obtener todos los pacientes o filtrar por propietario
router.get("/", async (req, res) => {
    try {
        const { propietario } = req.query;
        const whereClause = propietario ? { Propietario: { [Op.like]: `%${propietario}%` } } : {};
        const pacientes = await Paciente.findAll({ where: whereClause });
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pacientes" });
    }
});

// Obtener un paciente específico por su ID
router.get("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el paciente" });
    }
});

// Crear un nuevo paciente
router.post("/", async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ error: "Error al crear el paciente" });
        }
    }
});

// Actualizar un paciente específico por su ID
router.put("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }
        await paciente.update(req.body);
        res.status(200).json(paciente);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ error: "Error al actualizar el paciente" });
        }
    }
});

// Eliminar un paciente específico por su ID
router.delete("/:id", async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }
        await paciente.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el paciente" });
    }
});

module.exports = router;