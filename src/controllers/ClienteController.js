const service = require('../services/clienteService');

const getClientes = async (req, res) => {
    try {
        //const { id } = req.params;
        const result = await service.getClientes();
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addCliente = async (req, res) => {
    try {
        const listingData = req.body;

        // Verifica si los datos del cliente están presentes y no son nulos
        if (!listingData) {
            throw new Error('Los datos del cliente son requeridos ');
        }
        const result = await service.addCliente(listingData);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findUsuarioCliente = async (req, res) => {
    try {
        const { usuario } = req.params;
        const result = await service.findUsuarioCliente(usuario);
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListing = req.body;
        const result = await service.updateCliente(id, updatedListing);
        if (result.status === 200) {
            res.json({ status: 'Ok', message: `Listing with ID ${id} has been updated successfully` });
        } else {
            res.status(result.status).json({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.deleteCliente(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getClientes,
    addCliente,
    findUsuarioCliente,
    updateCliente,
    deleteCliente

};
