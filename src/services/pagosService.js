const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson-objectid'); // Importa ObjectId desde bson-objectid

const ObtenerPagoReserva = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('pagos');

        const result = await collection.findOne({ reserva_id: id });

        if (!result) {
            return {
                status: 404,
                message: `No listing found with username: ${usuario}`
            };
        }

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en el servicio findOne:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = {
    ObtenerPagoReserva
};