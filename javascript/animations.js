// Animacije na stranici koriste AOS biblioteku (https://michalsnik.github.io/aos/)
(function () { 
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { // Ugasi animacije ako korisnik preferira smanjenu količinu pokreta
    return;
  }

  const APPEAR = [ // Elementi koji se animiraju odmah po učitavanju stranice
    {
      selector: "header",
      type: "fade-down",
      delay: 0,
      skip: () => window.innerWidth <= 1200,
    },
    {
      selector:
        ".hero-section .description h1, .heroo-section .description h1",
      type: "popout-up",
      delay: 150,
    },
    { selector: ".contact-box", type: "zoom-in", delay: 200 },
  ];

  const SCROLL = [ // Elementi koji se animiraju prilikom skrolanja do njih
    { selector: ".service > h1", type: "popout-up" },
    { selector: ".service .card", type: "fade-up", stagger: 100 },
    { selector: ".timer-card", type: "fade-up", delay: 300 },
    { selector: ".forum > h1", type: "popout-up" },
    { selector: ".slide-container", type: "fade-up", delay: 120 },
    { selector: ".faq > h1", type: "popout-up" },
    { selector: ".faqforum details", type: "fade-up", stagger: 80 },
    { selector: ".finalsection .info h1", type: "popout-up" },
    { selector: ".finalsection .info", type: "fade-right" },
    { selector: ".finalsection .image", type: "fade-left" },
    { selector: ".sv-header h1", type: "popout-up" },
    { selector: ".sv-group", type: "fade-up", stagger: 120 },
    { selector: ".pred-header h2", type: "popout-up" },
    { selector: ".pred-card", type: "fade-up", stagger: 70 },
    { selector: ".prijemni .pj-left", type: "fade-right" },
    { selector: ".prijemni .pj-right", type: "fade-left" },
    { selector: ".pj-card", type: "zoom-in", stagger: 90 },
    { selector: ".materijali > h1", type: "popout-up" },
    { selector: ".materijali .container .card", type: "fade-up", stagger: 100 },
    { selector: ".res-header h2", type: "popout-up" },
    { selector: ".res-card", type: "fade-up", stagger: 90 },
    { selector: "footer .authors", type: "fade-up", delay: 0 },
    { selector: "footer .contact", type: "fade-up", delay: 80 },
    { selector: "footer .meni", type: "fade-up", delay: 160 },
  ];

  function applyAos(el, type, delay) { // Postavi AOS atribute na element
    el.setAttribute("data-aos", type);
    if (delay) {
      el.style.setProperty("--aos-delay", delay + "ms");
    }
  }

  function initAppear() { // Inicijaliziraj animacije koje se pojavljuju odmah po učitavanju stranice
    APPEAR.forEach(({ selector, type, delay, skip }) => {
      if (skip && skip()) return; // Ako postoji funkcija skip i ona vraća true, preskoči ovu animaciju (korisno za različite uređaje)
      document.querySelectorAll(selector).forEach((el) => {
        applyAos(el, type, delay); // Postavi AOS atribute na element
        el.setAttribute("data-aos-once", "appear"); // Dodaj atribut koji označava da se animacija treba pokrenuti odmah po učitavanju stranice
      });
    });

    requestAnimationFrame(() => { // Pokreni animacije nakon što su svi elementi postavljeni
      requestAnimationFrame(() => { // Dodatni requestAnimationFrame kako bi se osiguralo da se animacije pokrenu nakon što su svi elementi postavljeni
        document.querySelectorAll('[data-aos-once="appear"]').forEach((el) => {
          el.classList.add("aos-animate");
        });
      });
    });
  }

  function initScroll() { // Inicijaliziraj animacije koje se pojavljuju prilikom skrolanja do njih
    const elements = [];

    SCROLL.forEach(({ selector, type, stagger, delay }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        const itemDelay = delay ?? (stagger ? i * stagger : 0);
        applyAos(el, type, itemDelay);
        elements.push(el);
      });
    });

    if (!elements.length) return; // Ako nema elemenata za animaciju, nemoj postavljati IntersectionObserver

    const observer = new IntersectionObserver( // Koristi IntersectionObserver za pokretanje animacija kada elementi dođu u vidno polje
      (entries) => { // Kada se elementi pojave u vidnom polju, dodaj im klasu "aos-animate" i prestani ih promatrati
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("aos-animate");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") { // Ako se dokument još učitava, pričekaj da se DOM učita prije inicijalizacije animacija
    document.addEventListener("DOMContentLoaded", () => { // Inicijaliziraj obje vrste animacija nakon učitavanja DOM-a
      initAppear();
      initScroll();
    });
  } else {
    initAppear();
    initScroll();
  }
})();