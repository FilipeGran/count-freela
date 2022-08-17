const Knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '120719',
        database: 'count-freela'
    }
});

module.exports = Knex;