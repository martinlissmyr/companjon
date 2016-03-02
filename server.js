const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const app = module.exports = express();
const http = require("http");

// Make this process identifiable (so it can be easily killed for example)
process.title = "flock";

// Setting up environment
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));
app.set("views", "templates");

// Setting up routes
var setupRoutes = require("./config/routes");
setupRoutes(app);

// Setting up templating (via Handlebars)
app.engine(".hbs", exphbs({
  layoutsDir: "templates/",
  partialsDir: "templates/partials/",
  extname: ".hbs",
  helpers: require("require-all")({
    dirname: __dirname + "/config/handlebars-helpers",
    recursive: true
  })
}));
app.set("view engine", ".hbs");

http.createServer(app).listen(app.get("port"), function(){
  console.log("Express server listening on port " + app.get("port"));
});
