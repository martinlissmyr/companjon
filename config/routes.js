var flickrSearch = require("../flickr-search");
var httpRequest = require("request");

// Export the routes and controllers
module.exports = function(app) {
  app.get("/", function(request, response) {
    response.render("index", {
      place: "Hamburg",
      country: "Germany"
    });
  });
  app.get("/hero/(*)", function(request, response) {
    flickrSearch(request.params[0], function(url) {
      httpRequest.get(url).pipe(response);
    });
  });
};
