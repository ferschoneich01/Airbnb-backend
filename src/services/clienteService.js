const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson-objectid'); // Importa ObjectId desde bson-objectid

const getClientes = async () => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes');

        const result = await collection.find({ estado: 1 }).toArray();

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


const addCliente = async (listingData) => {

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
        const collection = database.collection('clientes');

        const listing = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            nombres: listingData.nombres,
            apellidos: listingData.apellidos,
            usuario: listingData.usuario,
            clave: listingData.clave,
            estado: listingData.estado,
            rol: listingData.rol

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

const findClienteById = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes');

        const result = await collection.findOne({ _id: id });

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

const findUsuarioCliente = async (usuario) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes');

        const result = await collection.findOne({ usuario: usuario });

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

const updateCliente = async (id, updatedData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes');

        // Verificar si el listado existe antes de intentar actualizarlo
        const existingListing = await collection.findOne({ _id: id });
        if (!existingListing) {
            return {
                status: 404,
                message: `No se encontró el listado con ID: ${id}`
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

const deleteCliente = async (id) => {
    console.log(id);
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const result = await client.db('airbnb').collection('clientes').updateOne({ _id: id }, { $set: { estado: 0 } }); // Usar directamente el ID proporcionado

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
    addCliente,
    findUsuarioCliente,
    updateCliente,
    deleteCliente,
    getClientes,
    findClienteById
};
