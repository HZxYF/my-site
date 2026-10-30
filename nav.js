// Puts the shared navigation into every page.
//
// nav.html holds the markup once. This script fetches it, inserts it into
// <nav data-nav>, and marks the current page with aria-current so the reader
// (and a screen reader) can tell where they are.
//
// fetch() needs http or https. Opened straight from the disk (file://) the
// browser refuses, so there is a fallback: a single Home link.

(function () {
  var mount = document.querySelector("[data-nav]");
  if (!mount) return;

  function currentFile() {
    var name = location.pathname.split("/").pop();
    return name === "" ? "index.html" : name;
  }

  function markCurrent() {
    var here = currentFile();
    var links = mount.querySelectorAll("a");

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href") === here) {
        links[i].setAttribute("aria-current", "page");
      } else {
        links[i].removeAttribute("aria-current");
      }
    }
  }

  function fallback() {
    mount.innerHTML = '<ul><li><a href="index.html">Home</a></li></ul>';
    markCurrent();
    console.warn(
      "Navigation could not be loaded. Use a web server (e.g. Live Server) " +
      "instead of opening the file directly."
    );
  }

  if (!window.fetch) {
    fallback();
    return;
  }

  fetch("nav.html")
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.text();
    })
    .then(function (html) {
      mount.innerHTML = html;
      markCurrent();
    })
    .catch(fallback);
})();
