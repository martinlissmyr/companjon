"use strict";

const Svgo = require("svgo");
const fs = require("fs-extra");
const path = require("path");
const svg = new Svgo();

const svgFileType = ".svg";
const partialFileType = ".hbs";
const srcDir = "./public/icons";
const partialsDir = "./templates/partials/";
const targetDir = "icons/";

fs.readdir(srcDir, function(err, files) {
  if (err) return console.log(err);

  fs.emptyDir(partialsDir + targetDir, function(err) {
    if (err) return console.log(err);

    files.forEach(function(file, idx) {
      if (path.extname(file) === svgFileType) {
        fs.readFile(srcDir + "/" + file, "utf8", function(err, data) {
          var name = "_" + path.basename(file, svgFileType);
          svg.optimize(data, function(result) {
            var str = result.data;
            fs.writeFile(partialsDir + targetDir + name + partialFileType, str, "utf8");
          });
        });
      }
    });
  });
});
