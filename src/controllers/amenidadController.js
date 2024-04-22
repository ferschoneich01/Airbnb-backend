const service = require('../services/amenidadService');

const getAmenidadById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.getAmenidadById(id);

        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAmenidadById

};
