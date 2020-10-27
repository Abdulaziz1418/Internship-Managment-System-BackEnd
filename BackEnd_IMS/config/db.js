const { Client  } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/IMS';

const client = new Client({
    connectionString: connectionString
});

client.connect();

module.exports.client = client 