const express = require("express");
const router = express.Router();

const contactos = require('../models/contactosModel');
const { Op, ValidationError } = require("sequelize");

// Obtener todos los contactos con filtros y paginación
router.get("/api/contactos", async function (req, res) {
  // #swagger.tags = ['Contactos']
  // #swagger.summary = 'obtiene todos los Contactos'
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.IdCategoria != undefined && req.query.IdCategoria !== "") {
    where.IdCategoria = req.query.IdCategoria;
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await contactos.findAndCountAll({
    attributes: [
      "IdContacto",
      "Nombre",
      "FechaNacimiento",
      "Telefono",
      "IdCategoria",
      "ImporteContribucion"
    ],
    order: [["Nombre", "ASC"]],
    where,
    // offset: (Pagina - 1) * TamañoPagina,
    // limit: TamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});

// Obtener un contacto por ID
router.get("/api/contactos/:id", async function (req, res) {
  // #swagger.tags = ['Contactos']
  // #swagger.summary = 'obtiene un Contacto'
  let item = await contactos.findOne({
    attributes: [
      "IdContacto",
      "Nombre",
      "FechaNacimiento",
      "Telefono",
      "IdCategoria",
      "ImporteContribucion"
    ],
    where: { IdContacto: req.params.id },
  });
  res.json(item);
});

// Crear un nuevo contacto
router.post("/api/contactos/", async (req, res) => {
  // #swagger.tags = ['Contactos']
  // #swagger.summary = 'agrega un Contacto'
  try {
    let item = await contactos.create({
      Nombre: req.body.Nombre,
      FechaNacimiento: req.body.FechaNacimiento,
      Telefono: req.body.Telefono,
      IdCategoria: req.body.IdCategoria,
      ImporteContribucion: req.body.ImporteContribucion
    });
    res.status(200).json(item.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      throw err;
    }
  }
});

// Actualizar un contacto
router.put("/api/contactos/:id", async (req, res) => {
  // #swagger.tags = ['Contactos']
  // #swagger.summary = 'actualiza un Contacto'
  try {
    let item = await contactos.findOne({
      attributes: [
        "IdContacto",
        "Nombre",
        "FechaNacimiento",
        "Telefono",
        "IdCategoria",
        "ImporteContribucion"
      ],
      where: { IdContacto: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Contacto no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.FechaNacimiento = req.body.FechaNacimiento;
    item.Telefono = req.body.Telefono;
    item.IdCategoria = req.body.IdCategoria;
    item.ImporteContribucion = req.body.ImporteContribucion;
    await item.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      throw err;
    }
  }
});

// Eliminar (baja lógica) un contacto
router.delete("/api/contactos/:id", async (req, res) => {
  // #swagger.tags = ['Contactos']
  // #swagger.summary = 'elimina un Contacto'
  // Baja lógica: no hay campo Activo, así que se borra físicamente
  try {
    let filasBorradas = await contactos.destroy({
      where: { IdContacto: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } catch (err) {
    if (err instanceof ValidationError) {
      const messages = err.errors.map((x) => x.message);
      res.status(400).json(messages);
    } else {
      throw err;
    }
  }
});

module.exports = router;
