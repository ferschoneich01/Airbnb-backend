const controller = require('../../controllers/reservacionController');
const express = require('express');
const router = express.Router();

router.get('/', controller.getReservaciones);
router.get('/:id', controller.findReservacion); // Agregar esta línea para manejar la búsqueda por ID
router.get('/cliente/:id', controller.findReservacionByUser); // Agregar esta línea para manejar la búsqueda por ID
router.post('/', controller.AddReservacion); // Agregar esta línea para manejar la creación de un nuevo elemento
//router.put('/:id', controller.deleteReservacion);
router.patch('/:id', controller.updateReservacion); // Agregar esta línea para manejar la actualización de un elemento
router.put('/:id', controller.deleteReservacion); // Agregar esta línea para manejar la eliminación de un elemento

module.exports = router;
