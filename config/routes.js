var flickrSearch = require("../flickr-search");
var httpRequest = require("request");
var trip = require("../trip.json");

// Export the routes and controllers
module.exports = function(app) {
  app.get("/", function(request, response) {
    response.render("index", trip);
  });
  app.get("/hero/(*)", function(request, response) {
    flickrSearch(request.params[0], function(url) {
      httpRequest.get(url).pipe(response);
    });
  });
};
