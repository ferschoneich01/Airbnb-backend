const { MongoClient } = require('mongodb');

const getConnection = async () => {
    return new Promise(async (resolve, reject) => {
        const uri = 'mongodb+srv://pablodouglass1:1jzP9a3MgDZSVag4@cluster0.bx8g3o5.mongodb.net/?retryWrites=true&w=majority';
        const client = new MongoClient(uri);
        
        try {
            await client.connect();
            return resolve(client);
        }
        catch (e) {
            console.log('Error connecting to MongoDB');
            return reject({
                status: 500,
                message: e
            });
        }
    });
};

module.exports = getConnection;
