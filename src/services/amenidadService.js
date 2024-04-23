const { MongoClient } = require('mongodb');

const getAmenidadById = async (id) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('amenidades');

        const result = await collection.findOne({ _id: id });

        if (!result) {
            return {
                status: 404,
                message: `No se encotro amenidad: ${id}`
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

const AddAmenidad = async (amenidadData) => {
    let client;
    try {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const database = client.db('airbnb');
        const collection = database.collection('amenidades');

        // Crear el documento de propiedad con la estructura proporcionada
        const amenidades = {
            _id: Math.floor(Math.random() * 1000000000).toString(),
            piscina: amenidadData.piscina,
            jacuzzi: amenidadData.jacuzzi,
            wifi: amenidadData.wifi,
            estacionamiento_garaje: amenidadData.estacionamiento_garaje,
            aire_acondicionado: amenidadData.aire_acondicionado,
            calefaccion: amenidadData.calefaccion,
            agua: amenidadData.agua || 'fría',
            tv_por_cable: amenidadData.tv_por_cable,
            lavanderia: amenidadData.lavanderia,
            gimnasio: amenidadData.gimnasio,
            sauna: amenidadData.sauna,
            cocina_totalmente_equipada: amenidadData.cocina_totalmente_equipada,
            vista_panoramica: amenidadData.vista_panoramica,
            acceso_privado_playa: amenidadData.acceso_privado_playa,
            servicio_limpieza: amenidadData.servicio_limpieza,
            consejeria_24_horas: amenidadData.consejeria_24_horas,
            restaurante_bar_establecimiento: amenidadData.restaurante_bar_establecimiento,
            servicio_habitacion: amenidadData.servicio_habitacion,
            actividades_recreacionales: {
                canchas: amenidadData.canchas,
                campos_deportivos: amenidadData.campos_deportivos,
                salon_de_juegos: amenidadData.salon_de_juegos
            }
        }
        // Insertar la propiedad en la colección
        const result = await collection.insertOne(amenidades);

        return {
            status: 201,
            data: amenidades._id
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

module.exports = {
    getAmenidadById,
    AddAmenidad

};