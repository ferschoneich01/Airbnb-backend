const service = require('../services/reservacionService');

const getReservaciones = async (req, res) => {
    try {
        //const { id } = req.params;
        const result = await service.getReservaciones();
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const AddReservacion = async (req, res) => {
    try {
        const listing = req.body;
        const result = await service.AddReservacion(listing);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const findReservacionByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findReservacionByUser(id);
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findReservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.findReservacion(id);
        if (result.status === 200) {
            res.send({ status: 'Ok', data: result.data });
        } else {
            res.status(result.status).send({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedListing = req.body;
        const result = await service.updateReservacion(id, updatedListing);
        if (result.status === 200) {
            res.json({ status: 'Ok', message: `Listing with ID ${id} has been updated successfully` });
        } else {
            res.status(result.status).json({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReservacion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.deleteReservacion(id);
        if (result.status === 200) {
            res.json({ status: 'Ok', message: `Listing with ID ${id} has been updated successfully` });
        } else {
            res.status(result.status).json({ status: 'Error', message: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    findReservacionByUser,
    getReservaciones,
    AddReservacion,
    findReservacion,
    updateReservacion,
    deleteReservacion

};
