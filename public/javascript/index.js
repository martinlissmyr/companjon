(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _stickyHeader = require("./modules/sticky-header");

var stickyHeader = _interopRequireWildcard(_stickyHeader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

stickyHeader.start();

},{"./modules/sticky-header":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function start() {
  var ticking;
  var offset = 50;
  var days = document.querySelectorAll(".day");
  var stickyDate = document.querySelector(".sticky-header__date");
  var body = document.querySelector("body");
  var headers = [{
    pos: 0,
    title: "",
    elm: null
  }];
  var activeHeader = headers[0];

  Array.prototype.forEach.call(days, function (elm) {
    var pos = elm.getBoundingClientRect().top + document.body.scrollTop;
    headers.push({
      title: elm.dataset.title,
      pos: pos,
      elm: elm
    });
  });
  headers.reverse();

  body.dataset.stickyHeader = "hidden";
  window.addEventListener("scroll", function (e) {
    var lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        headers.some(function (header) {
          if (header.pos < lastKnownScrollPosition) {
            if (activeHeader !== header) {
              if (activeHeader.elm === null) {
                body.dataset.stickyHeader = "visible";
              }
              if (header.elm === null) {
                body.dataset.stickyHeader = "hidden";
              } else {
                stickyDate.innerHTML = header.title;
              }
              activeHeader = header;
            }
            return true;
          }
        });
        ticking = false;
      });
    }
    ticking = true;
  });
}

exports.start = start;

},{}]},{},[1]);
