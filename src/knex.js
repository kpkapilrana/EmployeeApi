module.exports = require('knex')({
    client: 'mysql',
    // debug: true,

    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'empapp',
        charset: 'utf8',
    }
});