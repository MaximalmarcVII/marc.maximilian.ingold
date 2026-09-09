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

## Platzhalter (siehe README.md)

Porträt, Projektbilder, Video-Poster, Bewerbungsvideo, 3 PDF und alle Kontaktdaten
(`mail@platzhalter.ch`, `+41 00 000 00 00`, `Interlaken, CH`) sind Platzhalter und
klar als solche markiert. Bilder haben `onerror`-Fallbacks auf `assets/img/_ph-*.svg`.

## Lokal testen

`python3 -m http.server 8000` im Projektordner. `?ss` an eine URL = Ansicht ohne Animation.
