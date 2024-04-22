const service = require('../services/ubicacionService');

const getUbicaciones = async (req, res) => {
    try {
        //const { id } = req.params;
        const result = await service.getUbicaciones();
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const AddUbicacion = async (req, res) => {
    try {
        const listing = req.body;
        const result = await service.AddUbicacion(listing);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findUbicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findUbicacion(id);
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUbicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListing = req.body;
        const result = await service.updateUbicacion(id, updatedListing);
        if (result.status === 200) {
            res.json({ status: 'Ok', message: `Listing with ID ${id} has been updated successfully` });
        } else {
            res.status(result.status).json({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUbicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.deleteUbicacion(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUbicaciones,
    AddUbicacion,
    findUbicacion,
    updateUbicacion,
    deleteUbicacion

};
