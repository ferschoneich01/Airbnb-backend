const { MongoClient, ObjectID } = require('mongodb');

const getConnection = async () => {

};

const getPropiedades = async () => { // URI de tu base de datos MongoDB
    const client = getConnection();

    try {
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('propiedades'); // Nombre de la colección "clientes"

        const resultset = await collection.find({}).toArray();

        if (resultset.length === 0) {
            return {
                status: 404,
                message: `No hay elementos registrados en la coleccion "Propiedades"`
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

const findPropiedad = async (id) => {
    const client = await getConnection();
    try {
        const resultset = await client.db('airbnb').collection('propiedades').findOne({ _id: id });

        if (!resultset) {
            return {
                status: 404,
                message: `No document found with ID: ${id}.`
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

const updatePropiedad = async (id, updatedData) => {
    const client = await getConnection();
    try {
        const result = await client.db('airbnb').collection('propiedades').updateOne(
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

const deletePropiedad = async (id) => {
    const client = await getConnection();
    try {
        const result = await client.db('airbnb').collection('propiedades').deleteOne({ _id: ObjectID(id) });

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
    findPropiedad,
    getPropiedades,
    updatePropiedad,
    deletePropiedad
};
