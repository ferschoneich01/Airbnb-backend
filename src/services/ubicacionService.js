const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson-objectid'); // Importa ObjectId desde bson-objectid

const addUbicacion = async (listingData) => {

    let client;
    try {
        // Verificar si listingData es un objeto y tiene todas las propiedades requeridas
        if (!listingData || typeof listingData !== 'object' || !listingData.nombres || !listingData.apellidos || !listingData.usuario || !listingData.clave || typeof listingData.estado === 'undefined' || !listingData.rol) {
            throw new Error('Los datos del cliente son inválidos');
        }

        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('ubicacion');

        const listing = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            pais: listingData.pais,
            provincia_estado: listingData.provincia_estado,
            direccion: listingData.direccion,
            detalle: listingData.detalle

        };

        const result = await collection.insertOne(listing);

        return {
            status: 201,
            data: "Registro insertado" + result
        };
    } catch (error) {
        console.error('Error en el servicio addCliente:', error);
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

const getUbicaciones = async () => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('ubicacion');

        const result = await collection.find({}).toArray();

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en el servicio findAllListings:', error);
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

const AddUbicacion = async (listingData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('ubicacion');

        const listing = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            pais: listingData.pais,
            provincia_estado: listingData.provincia_estado,
            direccion: listingData.direccion,
            detalle: listingData.detalle
        };

        const result = await collection.insertOne(listing);

        return {
            status: 201,
            data: result
        };
    } catch (error) {
        console.error('Error al inserta ubicacion:', error);
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

const findUbicacion = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('ubicacion');

        const result = await collection.findOne({ _id: id });

        if (!result) {
            return {
                status: 404,
                message: `No se encotro ubicacion: ${id}`
            };
        }

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en buscar ubicacion:', error);
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

const updateUbicacion = async (id, updatedData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('ubicacion');

        // Verificar si el listado existe antes de intentar actualizarlo
        const existingListing = await collection.findOne({ _id: id });
        if (!existingListing) {
            return {
                status: 404,
                message: `No se encontró ubicacion con ID: ${id}`
            };
        }

        // Actualizar los campos especificados en updatedData
        const result = await collection.findOneAndUpdate(
            { _id: id },
            { $set: updatedData },
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

const deleteUbicacion = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const result = await client.db('airbnb').collection('ubicacion').deleteOne({ _id: id }); // Usar directamente el ID proporcionado

        if (result.deletedCount === 0) {
            return {
                status: 404,
                message: `No document found with ID: ${id}.`
            };
        }

        return {
            status: 200,
            message: `Listing with ID ${id} has been deleted successfully`
        };
    } catch (error) {
        console.error('Error en el servicio deleteListing:', error);
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
    addUbicacion,
    getUbicaciones,
    findUbicacion,
    updateUbicacion,
    deleteUbicacion
};
