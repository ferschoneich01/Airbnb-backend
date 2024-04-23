const controller = require('../../controllers/pagosController');
const express = require('express');
const router = express.Router();

router.get('/:id', controller.obtenerPagoReserva); // Agregar esta línea para manejar la búsqueda por ID

module.exports = router;