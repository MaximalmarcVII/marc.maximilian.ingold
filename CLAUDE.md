# CLAUDE.md

Persönliche Bewerbungswebsite für **Marc Ingold** (Mediamatiker EFZ in Ausbildung, BiCT AG).

## Stack

Statische Site — reines HTML / CSS / Vanilla JS, **kein Build-Schritt** (auf diesem Rechner
ist kein Node installiert). Vier Seiten: `index.html` (Home), `lebenslauf.html`,
`unterlagen.html`, `kontakt.html`. Gemeinsames Design-System in `assets/css/style.css`,
gesamtes Verhalten in `assets/js/main.js`. GSAP + ScrollTrigger via CDN (mit Fallbacks);
`prefers-reduced-motion` schaltet alles ab.

## Konventionen

- Texte auf Deutsch, **Schweizer Rechtschreibung** (`ss` statt `ß`).
- Ton: kurz, persönlich, selbstbewusst, kein Marketing-Deutsch. Leitgedanke der ganzen
  Seite: „Was löst Gestaltung beim Menschen aus?“ — nicht bloss behaupten, zeigen.
- **Keine KI-Erwähnungen** im sichtbaren Text, in Meta-Tags oder JSON-LD. Kompetenz­felder:
  Design & Layout, Foto & Video, Web & Digital, Office (vier Stück).
- **Keine sichtbaren Platzhalter oder Notizen an den Betreiber** (kein „Platzhalter“,
  keine „Datei XY ersetzen“-Hinweise, keine `onerror`-Fallbacks auf `_ph-*`). Die Seite
  ist publishfertig; Rohdaten/Notizen liegen in `../_Website-Rohdaten (nicht publizieren)/`.
- Farben nur über CSS-Variablen in `:root`. Navy `#003741` + Sand/Cream = Basis;
  Gelb `#F8B133`, Koralle `#EF6C65`, Türkis `#00A6A6` = feste Akzente pro Projekt/Feld.
- Typo: Archivo (Display/Struktur) + Inter (Fliesstext), Google Fonts.
- `prefers-reduced-motion` immer respektieren; neue Animationen brauchen einen Grund.
- Header/Footer sind pro Seite dupliziert (kein Templating) — Änderungen in allen 4 Dateien.
- Farbübergänge navy↔sand laufen NICHT als flache Balken, sondern als diagonale
  Keile: Klassen `.wedge-t` / `.wedge-b` auf der Navy-Sektion, Kantenfarbe über
  `--seam-accent`. Dunkle Flächen tragen ein feines Filmkorn (`--grain`).
- Das farbige „i" aus dem Logo (`assets/i-mark.svg`) ist die durchgehende Akzentmarke:
  vor jedem `.eyebrow` / `.page-head__index` und als Bullet in `.list-i`.
- Hero = kinematischer Lichtstrahl: zwei Bildebenen (`.hero__layer--cold` dunkel/kühl,
  `.hero__layer--warm` diagonal beschnitten, hell/warm) + `.hero__beam` Glow.

## Portfolio (Home)

- 11 Projekte in 5 Bereichen (`.disc` mit `.disc__label`): Web, Illustration, Layout,
  Fotografie, Branding. Projekttexte stammen 1:1 aus `../Portfolio/Portfolio_Projekttexte_Marc_Ingold.pdf`.
- **Kompakte Übersicht:** pro Projekt nur eine `<button class="pf-card" data-project="pf-pNN">`
  mit erstem Bild (`.pf-card__media`, Akzentbalken via `::after`), Nummer, Name, Kategorie.
  Kein Scrollen durch alle Bilder mehr. `.pf-card--contain` = freigestelltes Logo
  (`mix-blend-mode: multiply`, damit weisser Bildgrund auf Sand verschwindet).
- **Projekt-Detail** liegt in `<template id="pf-pNN" data-accent="…">` direkt nach der
  `<section class="portfolio">` (Nummer, Name, Kategorie, `.pf-detail__desc`, Tags,
  `.pf-detail__figs` mit allen Bildern als `.pf-fig`). Klick auf eine Kachel klont das
  Template in `.pf-modal__body` (JS-Abschnitt „8b"). Modal schliesst mit Esc / Backdrop /
  „Schliessen". Bilder im Modal sind rahmenlos; `.pf-fig--contain` freigestellt,
  `--navy` für helle Marken auf dunklem Grund.
- Klick auf ein Bild **im Modal** öffnet zusätzlich die `.lightbox` (`[data-full]` →
  Grossansicht, delegierter Click-Handler, damit geklonte Bilder funktionieren).
  Esc schliesst zuerst die Lightbox, dann das Modal.
- Bilder liegen web-optimiert in `assets/img/portfolio/` (Originale: `../Portfolio/`,
  ausserhalb des Projektordners). Neu-Aufbereitung mit `sips` / `qlmanage`.
- `?ss&pf=NN` an die Home-URL öffnet Projekt NN direkt (für Screenshots).

## Unterlagen

- Zwei `.doc`: „Lebenslauf" (Direkt-Download) und „Zeugnisse & Zertifikate"
  (`.doc--group` mit `.doc__toggle` → `.doc__panel` klappt auf, listet 8 `.file`).
- Akkordeon nutzt denselben Mechanismus wie die Skills (`aria-expanded` + JS-Toggle,
  `grid-template-rows: 0fr↔1fr`). PDF-Dateien in `assets/docs/` mit sauberen Slugs;
  Download-Name über das `download="…"`-Attribut. Titel NIE aus dem Dateinamen.

## Assets & Publishing

- Inhalte sind echt: Porträt, Hero-Bild (`Hero-bild.jpg`, web-optimiert), alle
  Portfolio-Bilder, Bewerbungsvideo (`assets/video/bewerbungsvideo.mp4`, ~81 MB,
  per `data-src` am `.player`, spielt per Klick), alle Kontaktdaten
  (`mmin@bluewin.ch`, `+41 512 65 13`, Schürliboden 8, 3852 Ringgenberg BE,
  Marc Maximilian Ingold) in `kontakt.html`, allen Footern, JSON-LD und `main.js`.
- `assets/docs/lebenslauf.pdf` enthält noch die kurze Platzhalter-Datei – gleiche Datei
  ersetzen, sobald der finale CV vorliegt (kein sichtbarer Hinweis darauf auf der Seite).
- Bilder mit `sips` klein halten (Hero/Porträt < 300 KB); `width`/`height` an jedem `<img>`.
- Zum Publizieren nur `*.html` + `assets/` hochladen. `CLAUDE.md`, `README.md`,
  `skills-lock.json` und `../_Website-Rohdaten …/` gehören nicht auf den Server.

## Lokal testen

`python3 -m http.server 8000` im Projektordner. `?ss` an eine URL = Ansicht ohne Animation.
