const service = require('../services/propiedadService');

const getPropiedades = async (req, res) => {
    try {
        //const { id } = req.params;
        const result = await service.getPropiedades();
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const AddPropiedad = async (req, res) => {
    try {
        const listing = req.body;
        const result = await service.AddPropiedad(listing);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findPropiedad(id);

        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updatePropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListing = req.body;
        const result = await service.updateListing(id, updatedListing);
        if (result.status === 200) {
            res.json({ status: 'Ok', message: `Listing with ID ${id} has been updated successfully` });
        } else {
            res.status(result.status).json({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.deletePropiedad(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPropiedades,
    AddPropiedad,
    findPropiedad,
    updatePropiedad,
    deletePropiedad

};
