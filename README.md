# Marc Ingold — Bewerbungswebsite

Persönliche Bewerbungs-Website. Vier Seiten, statisch gebaut (HTML / CSS / Vanilla JS),
kein Build-Schritt, überall hostbar (Netlify, GitHub Pages, eigener Webspace …).

```
<<<<<<< HEAD
index.html          Home – Hero, Kurzvorstellung, Video, Portfolio, Kompetenzfelder (4), CTA
=======
index.html          Home – Hero, Kurzvorstellung, Video, Portfolio, Kompetenzfelder, CTA
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
lebenslauf.html     Animierte Timeline + Erfahrungs-Cluster
unterlagen.html     Download-Module für die PDF-Bewerbungsunterlagen
kontakt.html        Kontaktdaten + Formular
assets/
  css/style.css     komplettes Design-System (Farben, Typo, Komponenten)
<<<<<<< HEAD
  js/main.js         Navigation, Reveals, Timeline, Projekt-Modal, Lightbox, Formular, Video
  logo-navy.svg      Logo für helle Flächen  (= „Element 1“)
  logo-cream.svg     Logo für dunkle Flächen (= „Element 2“)
  i-mark.svg         das farbige „i“ aus dem Logo – Akzentmarke & Bullet
  img/               Porträt, Hero-Bild, Video-Standbild (web-optimiert)
  img/portfolio/     alle 11 Portfolio-Projekte, web-optimiert
  docs/              Zeugnisse/Diplome/ECDL + Lebenslauf als PDF
  video/             bewerbungsvideo.mp4 (~81 MB)
```

## Publizieren

Auf den Server gehören nur **`*.html`** und **`assets/`**. `CLAUDE.md`, `README.md`,
`skills-lock.json` sind Projektnotizen und müssen nicht mit. Roh-/Originaldateien
(1080p-Video, unkomprimiertes Porträt) liegen bewusst ausserhalb des Ordners unter
`../_Website-Rohdaten (nicht publizieren)/`.

=======
  js/main.js         Navigation, Reveals, Timeline, Projekt-Modal, Formular, Video
  logo-navy.svg      Logo für helle Flächen  (= „Element 1“)
  logo-cream.svg     Logo für dunkle Flächen (= „Element 2“)
  i-mark.svg         das farbige „i“ aus dem Logo – Akzentmarke & Bullet
  img/               Bilder – aktuell Platzhalter-SVGs (Dateien mit „_ph-“)
  docs/              PDF-Downloads – aktuell Platzhalter
  video/             Ablageort für die Bewerbungsvideo-Datei
```

>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
## Lokal ansehen

```bash
cd "CLAUDE WEBSEITE"
python3 -m http.server 8000
# → http://localhost:8000
```

(Direktes Öffnen der HTML-Datei per Doppelklick funktioniert auch, aber ein
lokaler Server ist sauberer für Schriften, Modul-Templates und Downloads.)

<<<<<<< HEAD
## Inhalt

Alle Texte, Bilder und Kontaktdaten sind final eingetragen – es gibt keine sichtbaren
Platzhalter und keine Hinweise an den Betreiber auf der Seite. Kontaktdaten
(mmin@bluewin.ch, +41 512 65 13, Schürliboden 8, 3852 Ringgenberg BE,
Marc Maximilian Ingold) stehen in `kontakt.html`, im Footer aller vier Seiten,
im JSON-LD und im `main.js`-Fallback. Portfolio-Originale liegen in `../Portfolio/`.

Einzig `assets/docs/lebenslauf.pdf` ist noch eine kurze Beispieldatei: gleiche Datei
durch den finalen, druckfreundlichen Lebenslauf ersetzen, dann greift der Download
automatisch.

Die Unterlagen-Seite hat zwei Punkte: **Lebenslauf** (Direkt-Download) und
**Zeugnisse & Zertifikate** (klappt auf, listet 8 echte PDF einzeln – Lehrvertrag,
Schulzeugnis, Diplome, Beurteilungsbericht, 3× ECDL). Neue Dokumente: PDF in
`assets/docs/` legen und in `unterlagen.html` ein `<li class="file">` ergänzen.

### Bewerbungsvideo

Eingebunden: `assets/video/bewerbungsvideo.mp4` (960×540, ~81 MB). Verlinkt in
`index.html` am `<div class="player" …>` über `data-src` + `data-poster`; spielt per
Klick, lädt erst dann. Das Standbild `assets/img/video-poster.jpg` ist ein Frame daraus.

Leichter für gehostete Seiten: Video als „unlisted" auf YouTube/Vimeo, dann am
`.player` statt der Datei den Embed-Link setzen:
`data-src="https://www.youtube-nocookie.com/embed/DEINE_ID"`.
=======
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
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f

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
<<<<<<< HEAD
  demselben Foto (`assets/img/Hero-bild.jpg`). Ausschnitt über `object-position` justierbar.
- **Portfolio** — 11 Projekte in 5 Bereichen (`.disc`). Kompakte Übersicht: pro Projekt
  eine Kachel (`.pf-card`) mit erstem Bild + Titel. Klick öffnet das ganze Projekt als
  Modal (`.pf-modal`, Inhalt aus `<template id="pf-pNN">`) mit Text und allen Bildern;
  Klick auf ein Bild im Modal öffnet die Lightbox. Schliessen mit Esc / Backdrop.

## Barrierefreiheit / Technik

- Semantische Landmarks, „Skip-Link“, sichtbare Fokus-Zustände, Tastatur-Navigation,
  `aria-current` in der Navigation. Lightbox schliesst mit Esc / Klick auf Hintergrund.
- Responsive von ~320 px bis Desktop; eigene Layouts für Mobile (Vollbild-Menü,
  gestapelte Projekte, kompakte Timeline).
- `loading="lazy"` auf Portfolio-Bildern, `width`/`height` gegen Layout-Shift.
=======
  demselben Foto. Sobald `assets/img/portrait.jpg` gesetzt ist, wirkt der Effekt wie
  ein seitlich angeleuchtetes Porträt. Ausschnitt über `object-position` justierbar.

## Barrierefreiheit / Technik

- Semantische Landmarks, „Skip-Link“, sichtbare Fokus-Zustände, Tastatur-Navigation
  (inkl. Fokus-Falle im Projekt-Modal), `aria-current` in der Navigation.
- Responsive von ~320 px bis Desktop; eigene Layouts für Mobile (Vollbild-Menü,
  gestapelte Projekte, kompakte Timeline).
- `loading="lazy"` auf Portfolio-Bildern, Bilder mit `onerror`-Fallback.
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
- Kein Tracking, keine Cookies, keine externen Requests ausser Google Fonts + GSAP-CDN.

## Anpassen

- Texte: direkt im HTML. Sie sind bewusst kurz und in Schweizer Rechtschreibung gehalten.
<<<<<<< HEAD
- Reihenfolge/Anzahl der Projekte: pro Projekt eine `.pf-card` im passenden `.disc__grid`
  plus ein `<template id="pf-pNN">` nach der `<section class="portfolio">`. `data-project`
  der Kachel muss der Template-`id` entsprechen; `--accent`-Farbe an beiden setzen.
=======
- Reihenfolge/Anzahl der Projekte: die `<article class="project …">`-Blöcke in `index.html`
  duplizieren/entfernen; Modal-Inhalt im zugehörigen `<template id="project-00X">`.
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
- Timeline-Stationen: `<li class="tl-item">`-Blöcke in `lebenslauf.html`.
- `?ss` an eine URL hängen zeigt die Seite ohne Animationen (praktisch für Screenshots).
