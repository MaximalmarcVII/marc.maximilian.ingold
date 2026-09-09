/* =========================================================================
   Marc Ingold – Interaktion & Animation
   Vanilla JS. GSAP + ScrollTrigger werden optional per CDN geladen;
   fehlt GSAP, greift ein IntersectionObserver-Fallback.
   Respektiert prefers-reduced-motion.
   ========================================================================= */
(function () {
  "use strict";

  /* Review-Modus: ?ss in der URL zeigt alles ohne Animation (für Screenshots). */
  var SS = /[?&]ss(=|&|$)/.test(window.location.search);
  if (SS) {
    document.documentElement.classList.add("ss-mode");
    try {
      document.querySelectorAll('img[loading="lazy"]').forEach(function (i) { i.loading = "eager"; });
      var ym = window.location.search.match(/[?&]y=(\d+)/);
      if (ym) window.addEventListener("load", function () {
        window.setTimeout(function () { window.scrollTo(0, parseInt(ym[1], 10)); }, 300);
      });
<<<<<<< HEAD
      var pm = window.location.search.match(/[?&]pf=([0-9]+)/);
      if (pm) window.addEventListener("load", function () {
        window.setTimeout(function () {
          var c = document.querySelector('[data-project="pf-p' + pm[1] + '"]');
          if (c) c.click();
        }, 250);
      });
=======
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
    } catch (e) {}
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || SS;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";

  /* ---------------------------------------------------------------------
     1. Jahr im Footer
  --------------------------------------------------------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     2. Header: solid-Zustand beim Scrollen
  --------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header && !header.classList.contains("site-header--inner")) {
    var setHeader = function () {
      header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.72);
    };
    setHeader();
    window.addEventListener("scroll", setHeader, { passive: true });
  }

  /* ---------------------------------------------------------------------
     3. Mobile-Navigation
  --------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    var closeMenu = function () {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     4. Reveal-Animationen
  --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------------------------------------------------------------
     5. Hero: Zeilen-Reveal + Cursor-Spotlight + Parallax
  --------------------------------------------------------------------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    var lines = hero.querySelectorAll(".hero__title .line > span");

    var heroFoot = hero.querySelector(".hero__foot");
    // Failsafe: Hero-Text wird auch dann sichtbar, wenn eine Animation
    // pausiert (z. B. Tab beim Laden im Hintergrund).
    var revealHero = function () {
      if (hasGSAP) { window.gsap.killTweensOf(lines); if (heroFoot) window.gsap.killTweensOf(heroFoot); }
      lines.forEach(function (s) { s.style.transform = "none"; });
      if (heroFoot) heroFoot.style.opacity = "";
    };

    if (!reduceMotion && lines.length) {
      if (hasGSAP) {
        window.gsap.set(lines, { yPercent: 115 });
        window.gsap.to(lines, {
          yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.15,
          onComplete: revealHero
        });
        window.gsap.from(heroFoot, { opacity: 0, y: 24, duration: 0.9, delay: 0.7, ease: "power3.out" });
      } else {
        lines.forEach(function (span, i) {
          span.style.transform = "translateY(115%)";
          span.style.transition = "transform 1s cubic-bezier(.22,1,.36,1) " + (0.15 + i * 0.09) + "s";
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { span.style.transform = "translateY(0)"; });
          });
        });
      }
      window.setTimeout(revealHero, 2800);
    }

    // Leichte Parallaxe auf Bildebenen + Lichtstrahl (folgt der Maus)
    var media = hero.querySelector(".hero__media");
    var cold = hero.querySelector(".hero__layer--cold img");
    var warm = hero.querySelector(".hero__layer--warm");
    var beam = hero.querySelector(".hero__beam");
    if (media && finePointer && !reduceMotion) {
      var raf = null, tx = 0, ty = 0;
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5);
        ty = ((e.clientY - r.top) / r.height - 0.5);
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          if (cold) cold.style.transform = "scale(1.06) translate(" + tx * -14 + "px," + ty * -10 + "px)";
          if (warm) warm.style.transform = "translate(" + tx * 10 + "px," + ty * 7 + "px)";
          if (beam) beam.style.transform = "translate(" + tx * 16 + "px," + ty * 10 + "px)";
        });
      });
      hero.addEventListener("mouseleave", function () {
        if (cold) cold.style.transform = "";
        if (warm) warm.style.transform = "";
        if (beam) beam.style.transform = "";
      });
    }
  }

  /* ---------------------------------------------------------------------
     6. GSAP ScrollTrigger: Parallax + Timeline-Fortschritt
  --------------------------------------------------------------------- */
  if (hasGSAP && window.ScrollTrigger && !reduceMotion) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var amount = parseFloat(el.getAttribute("data-parallax")) || 12;
      window.gsap.to(el, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    var tl = document.querySelector(".timeline");
    if (tl) {
      var progress = tl.querySelector(".timeline__progress");
      if (progress) {
        window.gsap.to(progress, {
          height: "100%",
          ease: "none",
          scrollTrigger: { trigger: tl, start: "top 65%", end: "bottom 75%", scrub: true }
        });
      }
      tl.querySelectorAll(".tl-item").forEach(function (item) {
        window.ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 65%",
          onToggle: function (self) { item.classList.toggle("tl-item--active", self.isActive); }
        });
      });
    }
  } else {
    // Fallback: Timeline sofort füllen / Items markieren
    var tlFallback = document.querySelector(".timeline__progress");
    if (tlFallback) tlFallback.style.height = "100%";
    document.querySelectorAll(".tl-item").forEach(function (i) { i.classList.add("tl-item--active"); });
  }

  /* ---------------------------------------------------------------------
     7. Kompetenzfelder: Accordion
  --------------------------------------------------------------------- */
<<<<<<< HEAD
  document.querySelectorAll(".field__row, .doc__toggle").forEach(function (row) {
=======
  document.querySelectorAll(".field__row").forEach(function (row) {
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
    row.addEventListener("click", function () {
      var open = row.getAttribute("aria-expanded") === "true";
      row.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  /* ---------------------------------------------------------------------
     8. Lightbox – Portfolio-Bilder gross ansehen
  --------------------------------------------------------------------- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector(".lightbox__fig img");
    var lbClose = lb.querySelector(".lightbox__close");
    var lbBackdrop = lb.querySelector(".modal__backdrop");
    var lbLast = null;

    var lbKey = function (e) { if (e.key === "Escape") closeLb(); };

    var openLb = function (src, alt) {
      if (!src) return;
      lbLast = document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || "";
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { lb.classList.add("is-open"); });
      lbClose.focus();
      document.addEventListener("keydown", lbKey);
    };
    var closeLb = function () {
      lb.classList.remove("is-open");
      document.removeEventListener("keydown", lbKey);
<<<<<<< HEAD
      var pfM = document.querySelector(".pf-modal");
      if (!pfM || pfM.hidden) document.body.style.overflow = "";
=======
      document.body.style.overflow = "";
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
      window.setTimeout(function () {
        lb.hidden = true;
        lbImg.removeAttribute("src");
        if (lbLast && lbLast.focus) lbLast.focus();
      }, reduceMotion ? 0 : 350);
    };

<<<<<<< HEAD
    // Delegiert – funktioniert auch für Bilder, die ins Projekt-Modal geklont werden.
    document.addEventListener("click", function (e) {
      var zone = e.target.closest && e.target.closest("[data-full]");
      if (!zone) return;
      var img = zone.querySelector("img");
      openLb(zone.getAttribute("data-full"), img ? img.alt : "");
=======
    document.querySelectorAll("[data-full]").forEach(function (zone) {
      var pull = function () {
        var img = zone.querySelector("img");
        openLb(zone.getAttribute("data-full"), img ? img.alt : "");
      };
      zone.addEventListener("click", pull);
      zone.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pull(); }
      });
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
    });
    lbClose.addEventListener("click", closeLb);
    lbBackdrop.addEventListener("click", closeLb);
  }

  /* ---------------------------------------------------------------------
<<<<<<< HEAD
     8b. Projekt-Detail (Modal) – Kachel klicken öffnet das ganze Projekt
  --------------------------------------------------------------------- */
  var pfM = document.querySelector(".pf-modal");
  if (pfM) {
    var pfBody = pfM.querySelector(".pf-modal__body");
    var pfPanel = pfM.querySelector(".pf-modal__panel");
    var pfCloseBtn = pfM.querySelector(".pf-modal__close");
    var pfBd = pfM.querySelector(".pf-modal__backdrop");
    var pfLast = null;

    var pfKey = function (e) {
      if (e.key !== "Escape") return;
      if (lb && lb.hidden === false) return;   // Lightbox zuerst schliessen
      closePf();
    };
    var openPf = function (id) {
      var tpl = document.getElementById(id);
      if (!tpl || !("content" in tpl)) return;
      pfLast = document.activeElement;
      pfBody.innerHTML = "";
      pfBody.appendChild(tpl.content.cloneNode(true));
      pfM.style.setProperty("--accent", tpl.getAttribute("data-accent") || "var(--navy)");
      pfM.hidden = false;
      document.body.style.overflow = "hidden";
      if (pfPanel) pfPanel.scrollTop = 0;
      requestAnimationFrame(function () { pfM.classList.add("is-open"); });
      pfCloseBtn.focus();
      document.addEventListener("keydown", pfKey);
    };
    var closePf = function () {
      pfM.classList.remove("is-open");
      document.removeEventListener("keydown", pfKey);
      window.setTimeout(function () {
        pfM.hidden = true;
        pfBody.innerHTML = "";
        if (!lb || lb.hidden) document.body.style.overflow = "";
        if (pfLast && pfLast.focus) pfLast.focus();
      }, reduceMotion ? 0 : 350);
    };
    document.querySelectorAll("[data-project]").forEach(function (card) {
      card.addEventListener("click", function () { openPf(card.getAttribute("data-project")); });
    });
    pfCloseBtn.addEventListener("click", closePf);
    pfBd.addEventListener("click", closePf);
  }

  /* ---------------------------------------------------------------------
=======
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
     9. Cursor-Follower über Projekt-Medien (nur Desktop)
  --------------------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    var follower = document.querySelector(".cursor-follow");
    if (follower) {
      var move = function (e) {
        follower.style.left = e.clientX + "px";
        follower.style.top = e.clientY + "px";
      };
      document.querySelectorAll("[data-cursor]").forEach(function (zone) {
        zone.addEventListener("mouseenter", function () {
          follower.textContent = zone.getAttribute("data-cursor") || "Ansehen";
          follower.classList.add("is-visible");
          window.addEventListener("mousemove", move);
        });
        zone.addEventListener("mouseleave", function () {
          follower.classList.remove("is-visible");
          window.removeEventListener("mousemove", move);
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     9b. Bewerbungsvideo
     Ist am .player ein data-src gesetzt (MP4-Pfad oder Embed-URL), wird
     beim Klick ein Player eingesetzt. Sonst: Hinweis sichtbar machen.
  --------------------------------------------------------------------- */
  var playBtn = document.querySelector("[data-video]");
  if (playBtn) {
    var player = playBtn.closest(".player");
    playBtn.addEventListener("click", function () {
      var src = player.getAttribute("data-src");
      if (!src) {
        var note = document.querySelector(".player__note");
        if (note) {
          note.style.color = "var(--yellow)";
          note.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        }
        return;
      }
      var frag;
<<<<<<< HEAD
      if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)) {
=======
      if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) {
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
        frag = document.createElement("video");
        frag.src = src;
        frag.controls = true;
        frag.autoplay = true;
<<<<<<< HEAD
        frag.preload = "auto";
        var poster = player.getAttribute("data-poster");
        if (poster) frag.poster = poster;
=======
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
        frag.setAttribute("playsinline", "");
      } else {
        frag = document.createElement("iframe");
        frag.src = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
        frag.title = "Bewerbungsvideo von Marc Ingold";
        frag.allow = "autoplay; fullscreen; picture-in-picture";
        frag.setAttribute("allowfullscreen", "");
      }
      frag.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;object-fit:cover";
      player.innerHTML = "";
      player.appendChild(frag);
    });
  }

  /* ---------------------------------------------------------------------
     10. Kontaktformular
     Standard: mailto-Fallback. Für echten Versand data-endpoint (Formspree
     o.ä.) am <form> setzen – dann wird per fetch gesendet.
  --------------------------------------------------------------------- */
  var form = document.querySelector(".form");
  if (form) {
    var status = form.querySelector(".form__status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var endpoint = form.getAttribute("data-endpoint");

      var showOk = function (msg) {
        if (!status) return;
        status.textContent = msg;
        status.hidden = false;
        form.reset();
      };

      if (endpoint && endpoint.indexOf("http") === 0) {
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (r.ok) showOk("Danke, deine Nachricht ist unterwegs. Ich melde mich bald.");
            else throw new Error("fail");
          })
          .catch(function () {
            if (status) {
              status.textContent = "Das hat gerade nicht geklappt. Schreib mir direkt an " +
<<<<<<< HEAD
                (form.getAttribute("data-email") || "mmin@bluewin.ch") + ".";
=======
                (form.getAttribute("data-email") || "mail@platzhalter.ch") + ".";
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
              status.hidden = false;
            }
          });
      } else {
<<<<<<< HEAD
        var to = form.getAttribute("data-email") || "mmin@bluewin.ch";
=======
        var to = form.getAttribute("data-email") || "mail@platzhalter.ch";
>>>>>>> 9b5cc321cfe41b26916753e92e287a85df951b5f
        var subject = encodeURIComponent("Nachricht über deine Website – " + (data.get("name") || ""));
        var body = encodeURIComponent(
          (data.get("message") || "") + "\n\n– " + (data.get("name") || "") + " (" + (data.get("email") || "") + ")"
        );
        window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
        showOk("Dein Mailprogramm sollte sich öffnen. Falls nicht: schreib mir an " + to + ".");
      }
    });
  }
})();
