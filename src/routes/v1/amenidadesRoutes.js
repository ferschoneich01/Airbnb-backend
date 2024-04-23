const controller = require('../../controllers/amenidadController');
const express = require('express');
const router = express.Router();

//router.get('/', controller.getPropiedades);
router.get('/:id', controller.getAmenidadById); // Agregar esta línea para manejar la búsqueda por ID
router.post('/', controller.AddAmenidad); // Agregar esta línea para manejar la creación de un nuevo elemento
/*router.put('/', (request, response) => { });
router.patch('/:id', controller.updatePropiedad); // Agregar esta línea para manejar la actualización de un elemento
router.delete('/:id', controller.deletePropiedad); // Agregar esta línea para manejar la eliminación de un elemento
*/
module.exports = router;
