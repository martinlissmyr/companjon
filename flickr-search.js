const Flickr = require("flickrapi");
const fs = require("fs-extra");
const cacheDir = "./flickr-cache/";

const options = {
  api_key: "bc421549ef4892e63005a5fbeeafb950",
  secret: "77bdcdeb84ab2554",
  nobrowser: true
};

module.exports = function(query, cb) {
  fs.readFile(cacheDir + query, "utf8", function(err, data) {
    if (err) {
      Flickr.tokenOnly(options, function(error, flickr) {
        flickr.places.find({
          "query": query
        }, function(err, result) {
          flickr.photos.search({
            "group_id": "1463451@N25",
            "tags": "sky",
            "woe_id": result.places.place[0].woeid,
            "place_id": result.places.place[0].place_id,
            "sort": "interestingness-desc",
            "extras": "url_l"
          }, function(err, result) {
            var url = result.photos.photo[0].url_l;
            fs.outputFile(cacheDir + query, url, "utf-8");
            cb(url);
          });
        });
      });
    } else {
      cb(data);
    }
  });
}
