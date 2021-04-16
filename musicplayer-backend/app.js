var express = require('express');
var path = require('path');
const cors = require("cors");
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
const passport = require("passport");
var http = require('http');
require('./main/services/passportConfig');
require('dotenv').config('./env')

//Routes Files
const indexRouter = require('./main/routes')

var app = express()




/*---------------------Middle Ware--------------------------------*/
const whitelist = ['http://localhost:3000', 'http://localhost:5010']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*---------------------Middle Ware--------------------------------*/



/*--------------------- Routes --------------------------------*/
app.use('/', indexRouter)
//require('./s3/s3')(app);
require('./main/routes/musicUploadRoutes')(app);
require('./main/routes/musicRetreivalRoutes')(app);
require('./main/routes/authRoutes')(app);
require('./main/routes/notificationRoutes')(app);
/*--------------------- Routes --------------------------------*/



 
 /**
  * Get port from environment and store in Express.
  */
 
 var port = normalizePort(process.env.PORT || '5010');
 app.set('port', port);
 
 

 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 require('./main/socket').init(server)

 


 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   var port = parseInt(val, 10);
 
   if (isNaN(port)) {
     // named pipe
     return val;
   }
 
   if (port >= 0) {
     // port number
     return port;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   var bind = typeof port === 'string'
     ? 'Pipe ' + port
     : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }

module.exports = app;
