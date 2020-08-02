
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("views", "./views");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Reat Time Chat
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(process.env.PORT || 3000);


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});





/* route to handle login and registration */
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');

app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}



app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
  PORT,
  PORT);
});

module.exports = app;
