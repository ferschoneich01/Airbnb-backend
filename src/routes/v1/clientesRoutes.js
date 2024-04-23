const controller = require('../../controllers/ClienteController');
const express = require('express');
const router = express.Router();

router.get('/', controller.getClientes);
router.get('/:usuario', controller.findUsuarioCliente); // Agregar esta línea para manejar la búsqueda por ID
router.get('/cliente/:id', controller.findClienteById); // Agregar esta línea para manejar la búsqueda por ID
router.post('/', controller.addCliente); // Agregar esta línea para manejar la creación de un nuevo elemento
router.put('/', (request, response) => { });
router.patch('/:id', controller.updateCliente); // Agregar esta línea para manejar la actualización de un elemento
router.put('/:id', controller.deleteCliente); // Agregar esta línea para manejar la eliminación de un elemento

module.exports = router;
