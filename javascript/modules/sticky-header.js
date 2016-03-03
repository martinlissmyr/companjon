"use strict";

function start() {
  var ticking;
  var offset = 50;
  var days = document.querySelectorAll(".day");
  var stickyDate = document.querySelector(".sticky-header__date");
  var body = document.querySelector("body");
  var headers = [
    {
      pos: 0,
      title: "",
      elm: null
    }
  ];
  var activeHeader = headers[0];

  Array.prototype.forEach.call(days, elm => {
    var pos = elm.getBoundingClientRect().top + document.body.scrollTop;
    headers.push({
      title: elm.dataset.title,
      pos: pos,
      elm: elm
    });
  });
  headers.reverse();

  body.dataset.stickyHeader = "hidden";
  window.addEventListener("scroll", function(e) {
    var lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        headers.some(header => {
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

export { start };
