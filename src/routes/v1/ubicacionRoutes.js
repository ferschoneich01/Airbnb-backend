const controller = require('../../controllers/ubicacionController');
const express = require('express');
const router = express.Router();

router.get('/', controller.getUbicaciones);
router.get('/:id', controller.findUbicacion); // Agregar esta línea para manejar la búsqueda por ID
router.post('/', controller.AddUbicacion); // Agregar esta línea para manejar la creación de un nuevo elemento
router.put('/', (request, response) => { });
router.patch('/:id', controller.updateUbicacion); // Agregar esta línea para manejar la actualización de un elemento
router.delete('/:id', controller.deleteUbicacion); // Agregar esta línea para manejar la eliminación de un elemento

module.exports = router;
