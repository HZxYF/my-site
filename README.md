# Quotes &amp; Machinery

The Learning HTML site for Web Technologies 2026: quotes, five project ideas, and a
machine whose only job is to switch itself off.

Live: https://hzxyf.github.io/my-site/

## Pages

| File | What it is |
|---|---|
| `index.html` | Hero image and an overview of the site |
| `quotes.html` | Fifteen quotes, with one picked at random for the hero |
| `project.html` | Five project ideas, each with its audience and its four pages |
| `machine.html` | The useless machine, and a reaction-time game |

## How it is put together

- **One stylesheet**, `style.css`. No framework, no build step, no dependencies.
- **The navigation is written once.** `nav.html` holds the list; `nav.js` fetches it
  into `<nav data-nav>` on every page and sets `aria-current` from the address, so no
  page has to know where it is.
- **The random quote is not a second copy.** `quotes.js` reads a quote out of the
  visible list and puts it in the hero, so there is one source of truth.
- **Everything degrades.** Without JavaScript the hero keeps its first quote and every
  page still reads; the navigation falls back to a single Home link.

## Running it locally

`fetch()` is blocked on `file://`, so the shared navigation needs a server:

- In VS Code: right-click `index.html` → **Open with Live Server**
- Or from a terminal in this folder: `python -m http.server 8000`, then open
  <http://localhost:8000>

Opening `index.html` directly still works — you just get the fallback navigation.

## Structure

```
index.html  quotes.html  project.html  machine.html
nav.html    the navigation, written once
nav.js      injects nav.html and marks the current page
quotes.js   picks the hero quote
machine.js  the useless machine and the game
style.css   one stylesheet
images/     hero.svg, og-image.jpg
```

## Live

Deployed with GitHub Pages from the `main` branch: Settings → Pages → Deploy from a
branch → `main` → `/ (root)`.
