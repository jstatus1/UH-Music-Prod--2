const {Pool} = require('pg')

let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'qweasdzxc123',
    post: 5432
})

module.exports = pool

