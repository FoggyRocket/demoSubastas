// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

//primero la session.config
require('./config/session.config')(app)

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
// default value for title local
const projectName = "demosubastas";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
const auth = require("./routes/auth.routes")
//vamos a importar las rutas a utilizar
const auction = require("./routes/auction.routes");
const bif = require("./routes/bid.routes");
app.use("/", index);
app.use("/",auth); //completo sin prefijo
app.use("/bid") // con un prefijo 
app.use("/auction",auction)// noten que agregue un prefix osea /auticion
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
