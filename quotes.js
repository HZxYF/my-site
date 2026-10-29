// Shows one quote from the list at random in the hero.
// If this script does not run, the hero keeps the first quote written in the HTML.

(function () {
  var quotes = document.querySelectorAll(".quote-list blockquote");
  var textEl = document.getElementById("random-quote");
  var authorEl = document.getElementById("random-author");

  if (!quotes.length || !textEl || !authorEl) return;

  var picked = quotes[Math.floor(Math.random() * quotes.length)];
  var text = picked.querySelector("p").textContent.trim().replace(/\s+/g, " ");
  var author = picked.querySelector("cite").textContent.trim();

  textEl.textContent = text;
  authorEl.textContent = author;
})();
