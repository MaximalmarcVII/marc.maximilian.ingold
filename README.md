# Marc Ingold — Bewerbungswebsite

Persönliche Bewerbungs-Website. Vier Seiten, statisch gebaut (HTML / CSS / Vanilla JS),
kein Build-Schritt, überall hostbar (Netlify, GitHub Pages, eigener Webspace …).

```
index.html          Home – Hero, Kurzvorstellung, Video, Portfolio, Kompetenzfelder, CTA
lebenslauf.html     Animierte Timeline + Erfahrungs-Cluster
unterlagen.html     Download-Module für die PDF-Bewerbungsunterlagen
kontakt.html        Kontaktdaten + Formular
assets/
  css/style.css     komplettes Design-System (Farben, Typo, Komponenten)
  js/main.js         Navigation, Reveals, Timeline, Projekt-Modal, Formular, Video
  logo-navy.svg      Logo für helle Flächen  (= „Element 1“)
  logo-cream.svg     Logo für dunkle Flächen (= „Element 2“)
  i-mark.svg         das farbige „i“ aus dem Logo – Akzentmarke & Bullet
  img/               Bilder – aktuell Platzhalter-SVGs (Dateien mit „_ph-“)
  docs/              PDF-Downloads – aktuell Platzhalter
  video/             Ablageort für die Bewerbungsvideo-Datei
```

## Lokal ansehen

```bash
cd "CLAUDE WEBSEITE"
python3 -m http.server 8000
# → http://localhost:8000
```

(Direktes Öffnen der HTML-Datei per Doppelklick funktioniert auch, aber ein
lokaler Server ist sauberer für Schriften, Modul-Templates und Downloads.)

## Was noch ausgetauscht werden muss (alles klar markiert)

| Platzhalter | Wo | Ersetzen durch |
|---|---|---|
| Porträtfoto | `assets/img/portrait.jpg` | dein echtes Foto (JPG, quer/hochkant egal, ca. 1600 px lange Kante). Wird im Hero maskiert und im Lebenslauf gezeigt. |
| Projektbilder | `assets/img/branding.jpg`, `photo.jpg`, `digital.jpg`, `editorial.jpg` + im Modal `branding-1.jpg` usw. | echte Mockups / Fotos. Solange eine Datei fehlt, erscheint automatisch der Platzhalter. |
| Video-Poster | `assets/img/video-poster.jpg` | Standbild aus dem Video |
| Bewerbungsvideo | siehe unten | MP4 in `assets/video/` **oder** Embed-Link |
| PDF-Unterlagen | `assets/docs/lebenslauf.pdf`, `portfolio.pdf`, `zeugnisse.pdf` | die finalen, druckfreundlichen PDF. Dateigrösse-Angabe ggf. in `unterlagen.html` anpassen. |
| Kontaktdaten | `kontakt.html` **und** Footer aller vier Seiten: `mail@platzhalter.ch`, `+41 00 000 00 00`, `Interlaken, CH` | echte Werte. Auch in `index.html` das JSON-LD (`email`, `url`). |

Bilder einfach mit **exakt diesen Dateinamen** ablegen – kein Code-Eingriff nötig.

### Bewerbungsvideo einbinden

In `index.html` beim Element `<div class="player" …>` ein Attribut ergänzen:

```html
<!-- lokale Datei -->
<div class="player" data-reveal data-cursor="Abspielen" data-src="assets/video/bewerbung.mp4">

<!-- oder YouTube/Vimeo (privacy-freundliche Domain möglich) -->
<div class="player" … data-src="https://www.youtube-nocookie.com/embed/DEINE_ID">
```

Beim Klick auf den Play-Button wird der Player dann eingesetzt.

### Kontaktformular scharf schalten

Ohne Backend öffnet der Absenden-Button das Mailprogramm (`mailto:`).
Für echten Versand ein kostenloses Formular-Backend (z. B. Formspree, Basin) anlegen
und in `kontakt.html` am `<form>` ergänzen:

```html
<form class="form" data-email="deine@mail.ch" data-endpoint="https://formspree.io/f/DEINE_ID" novalidate>
```

## Design-System (Kurzfassung)

- **Farben** — Navy `#003741` und Sand/Cream als Basis; Gelb `#F8B133`, Koralle `#EF6C65`,
  Türkis `#00A6A6` als Akzente. Jedes Portfolio-Projekt und jeder Kompetenzbereich hat
  eine feste Akzentfarbe. Alle als CSS-Variablen in `:root` (`assets/css/style.css`).
- **Typografie** — *Archivo* (variabel, Breite + Gewicht) für Headlines und Struktur,
  *Inter* für Fliesstext. Beide von Google Fonts.
- **Motion** — GSAP + ScrollTrigger (CDN) für Hero-Reveal, Parallax und Timeline-Fortschritt;
  alles andere über CSS + IntersectionObserver. Ohne GSAP greifen Fallbacks.
  `prefers-reduced-motion` wird respektiert (alles sofort sichtbar, keine Bewegung).
- **Übergänge** — die Farbwechsel zwischen den Sektionen sind diagonale Keile
  (`.wedge-t` / `.wedge-b`, Kantenfarbe `--seam-accent`) statt flacher Balken; dunkle
  Flächen haben ein feines Filmkorn. Höhe/Optik zentral über `--seam-h` / `--grain`.
- **Akzentmarke** — das farbige „i“ (`assets/i-mark.svg`) steht vor jedem Eyebrow und
  ist die Bullet-Form für `<ul class="list-i">`.
- **Hero** — dunkles Grundbild plus diagonal beschnittener, warmer „Lichtstrahl“ über
  demselben Foto. Sobald `assets/img/portrait.jpg` gesetzt ist, wirkt der Effekt wie
  ein seitlich angeleuchtetes Porträt. Ausschnitt über `object-position` justierbar.

## Barrierefreiheit / Technik

- Semantische Landmarks, „Skip-Link“, sichtbare Fokus-Zustände, Tastatur-Navigation
  (inkl. Fokus-Falle im Projekt-Modal), `aria-current` in der Navigation.
- Responsive von ~320 px bis Desktop; eigene Layouts für Mobile (Vollbild-Menü,
  gestapelte Projekte, kompakte Timeline).
- `loading="lazy"` auf Portfolio-Bildern, Bilder mit `onerror`-Fallback.
- Kein Tracking, keine Cookies, keine externen Requests ausser Google Fonts + GSAP-CDN.

## Anpassen

- Texte: direkt im HTML. Sie sind bewusst kurz und in Schweizer Rechtschreibung gehalten.
- Reihenfolge/Anzahl der Projekte: die `<article class="project …">`-Blöcke in `index.html`
  duplizieren/entfernen; Modal-Inhalt im zugehörigen `<template id="project-00X">`.
- Timeline-Stationen: `<li class="tl-item">`-Blöcke in `lebenslauf.html`.
- `?ss` an eine URL hängen zeigt die Seite ohne Animationen (praktisch für Screenshots).
