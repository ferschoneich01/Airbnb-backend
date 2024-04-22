const { MongoClient, ObjectID } = require('mongodb');

const getConnection = async () => {

};

const addCliente = async (listingData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes');

        const listing = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            nombres: listingData.nombres,
            apellidos: listingData[1],
            usuario: listingData[2],
            clave: listingData[3],
            estado: listingData[4],
            rol: listingData[5]

        };

        const result = await collection.insertOne(listing);

        return {
            status: 201,
            data: result.ops[0]
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

}

const getClientes = async () => { // URI de tu base de datos MongoDB
    const client = getConnection();

    try {
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('clientes'); // Nombre de la colección "clientes"

        const resultset = await collection.find({}).toArray();

        if (resultset.length === 0) {
            return {
                status: 404,
                message: `No hay elementos registrados en la colección "clientes"`
            };
        } else {
            return {
                status: 200,
                data: resultset
            };
        }
    } catch (e) {
        return {
            status: 500,
            message: e.message
        };
    } finally {
        await client.close();
    }
};

const findUsuarioCliente = async (usuario) => {
    const client = await getConnection();
    try {
        const resultset = await client.db('airbnb').collection(collectionName).findOne({ usuario: usuario });

        if (!resultset) {
            return {
                status: 404,
                message: `No document found with ID: ${username}.`
            };
        } else {
            return {
                status: 200,
                data: resultset
            };
        }
    } catch (e) {
        return {
            status: 500,
            message: e
        };
    } finally {
        client.close();
    }
};


const updateCliente = async (id, updatedData) => {
    const client = await getConnection();
    try {
        const result = await client.db('airbnb').collection('clientes').updateOne(
            { _id: ObjectID(id) },
            { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
            return {
                status: 404,
                message: `No document found with ID: ${id}.`
            };
        }

        return {
            status: 200,
            message: `Listing with ID ${id} has been updated successfully`
        };
    } catch (error) {
        console.error('Error en el repository updateListing:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.close();
    }
};

const deleteCliente = async (id) => {
    const client = await getConnection();
    try {
        const result = await client.db('airbnb').collection('clientes').deleteOne({ _id: ObjectID(id) });

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
        console.error('Error en el repositorio deleteListing:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.close();
    }
};

module.exports = {
    findUsuarioCliente,
    addCliente,
    updateCliente,
    deleteCliente,
    getClientes,
};
