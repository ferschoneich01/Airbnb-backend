const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson-objectid'); // Importa ObjectId desde bson-objectid

const getReservaciones = async () => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('Reservaciones');

        const result = await collection.find({ estado_reserva: "confirmada" }).toArray();

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en el metodo getrevervaciones:', error);
        return {
            status: 500,
            message: 'Error interno del servidor'
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const AddReservacion = async (listingData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('Reservaciones');

        const listing = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            cliente: {
                id: listingData.cliente
            },
            propiedades: {
                id: listingData.propiedades
            },
            fecha_ingreso: listingData.fecha_ingreso,
            fecha_salida: listingData.fecha_salida,
            numero_huspedes: {
                adultos: listingData.adultos,
                niños: listingData.ninos,
                bebés: listingData.bebes,
                mascotas: listingData.mascotas
            },
            estado_reserva: listingData.estado_reserva
        };

        const pago = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            reserva_id: listing._id,
            metodo_pago: "Tarjeta de Crédito",
            monto_pagado: listingData.monto_pago,
            estado_pago: "completado",
            fecha_pago: obtenerFechaActual(),
            numero_tarjeta: listingData.numero_tarjeta

        }

        const resultPago = await database.collection('pagos').insertOne(pago);

        const result = await collection.insertOne(listing);

        return {
            status: 201,
            data: result
        };
    } catch (error) {
        console.error('Error al inserta reserva:', error);
        return {
            status: 500,
            message: 'Error interno del servidor'
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear();

    return `${año}-${mes}-${dia}`;
};

const findReservacionByUser = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('Reservaciones');

        const result = await collection.find({ cliente: { id: id } }).sort({ fecha_ingreso: 1 }).toArray();;

        if (!result) {
            return {
                status: 404,
                message: `No se encotro Reservacion: ${id}`
            };
        }

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en buscar Reservacion:', error);
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


const findReservacion = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('Reservaciones');

        const result = await collection.findOne({ _id: id });

        if (!result) {
            return {
                status: 404,
                message: `No se encotro Reservacion: ${id}`
            };
        }

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en buscar Reservacion:', error);
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

const updateReservacion = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('Reservaciones');

        // Verificar si el listado existe antes de intentar actualizarlo
        const existingListing = await collection.updateOne({ _id: id }, { estado_reserva: "cancelada" });
        if (!existingListing) {
            return {
                status: 404,
                message: `No se encontró ubicacion con ID: ${id}`
            };
        }

        // Actualizar los campos especificados en updatedData
        const result = await collection.findOneAndUpdate(
            { _id: id },
            { $set: "reserva cancelada" },
            { returnOriginal: false }
        );

        // Listado actualizado correctamente
        return {
            status: 200,
            data: result.value
        };
    } catch (error) {
        console.error('Error en el servicio updateListing:', error);
        return {
            status: 500,
            message: 'Error interno del servidor'
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const deleteReservacion = async (id) => {
    console.log(id.id);

    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const result = await client.db('airbnb').collection('Reservaciones').updateOne({ _id: id.id }, { $set: { estado_reserva: "cancelada" } }); // Usar directamente el ID proporcionado

        // Verificar si se actualizó algún documento
        if (result.modifiedCount === 0) {
            return {
                status: 404,
                message: `No se encontró ninguna reserva con el ID: ${id}`
            };
        }

        return {
            status: 200,
            message: `Estado de la reserva con ID ${id} actualizado correctamente`
        };
    } catch (error) {
        console.error('Error en el servicio updateReservacionEstado:', error);
        return {
            status: 500,
            message: 'Error interno del servidor'
        };
    } finally {
        if (client) {
            await client.close();
        }
    }
};

module.exports = {
    findReservacionByUser,
    getReservaciones,
    findReservacion,
    updateReservacion,
    deleteReservacion,
    AddReservacion
};
