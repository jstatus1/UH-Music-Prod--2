const {Pool} = require('pg')

let pool = new Pool({
  user: 'postgres',
  host: 'uhmusicdb.cbe4xc31zdbo.us-east-2.rds.amazonaws.com',
  database: 'UHMusicDB',
  password: 'qweasdzxc123',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});


module.exports = pool

