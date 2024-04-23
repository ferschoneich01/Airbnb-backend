const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson-objectid'); // Importa ObjectId desde bson-objectid

const getPropiedades = async () => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('propiedades');

        const result = await collection.find({ estado: 1 }).toArray();

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en el metodo getPropiedades:', error);
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

const AddPropiedad = async (propiedadData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('propiedades');

        // Crear el documento de propiedad con la estructura proporcionada
        const propiedad = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            ubicacion_id: propiedadData.ubicacion_id,
            propietarios: propiedadData.propietarios,
            descripcion: propiedadData.descripcion,
            capacidad: propiedadData.capacidad,
            cantidad_banos: propiedadData.cantidad_banos,
            precio_por_noche: propiedadData.precio_por_noche,
            img: propiedadData.img,
            amenidad_id: propiedadData.amenidad_id,
            estado: 1
        };

        // Insertar la propiedad en la colección
        const result = await collection.insertOne(propiedad);

        return {
            status: 201,
            data: result
        };
    } catch (error) {
        console.error('Error al insertar la propiedad:', error);
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

const findPropiedad = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('propiedades');

        const result = await collection.findOne({ _id: id });

        if (!result) {
            return {
                status: 404,
                message: `No se encotro Propiedad: ${id}`
            };
        }

        return {
            status: 200,
            data: result
        };
    } catch (error) {
        console.error('Error en buscar Propiedad:', error);
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

const updatePropiedad = async (id, updatedData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('propiedades');

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

const deletePropiedad = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log(id);
        const result = await client.db('airbnb').collection('propiedades').updateOne({ _id: id }, { $set: { estado: 0 } }); // Usar directamente el ID proporcionado
        console.log(result)
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
    getPropiedades,
    findPropiedad,
    updatePropiedad,
    deletePropiedad,
    AddPropiedad
};
