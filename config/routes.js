var flickrSearch = require("../flickr-search");
var httpRequest = require("request");

// Export the routes and controllers
module.exports = function(app) {
  app.get("/", function(request, response) {
    response.render("index", {
      place: "Hamburg",
      country: "Germany",
      participants: [
        {
          name: "Slim Jim",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg",
          candidate: true
        },
        {
          name: "Brynn Evans",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
        },
        {
          name: "Henry Lawson",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/hchicha/128.jpg"
        }
      ]
    });
  });
  app.get("/hero/(*)", function(request, response) {
    flickrSearch(request.params[0], function(url) {
      httpRequest.get(url).pipe(response);
    });
  });
};
