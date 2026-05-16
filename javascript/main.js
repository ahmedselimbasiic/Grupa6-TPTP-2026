// ================== HAMBURGER MENU ==================
function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");

  if (menu && hamburger) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("is-active");
  } else {
    console.error(
      "Hamburger menu elementi nisu pronađeni! Provjeri ID i klase.",
    );
  }
}

// ================== DARK MODE TOGGLE ==================

// spremljen izbor ima prednost; inače prati sistem (prefers-color-scheme)
const savedTheme = localStorage.getItem("darkmode");
let darkmode =
  savedTheme !== null
    ? savedTheme === "true"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

const themeButton = document.querySelector(".theme");

//  postavljanje teme pri pokretanju stranice
if (darkmode) {
  document.body.classList.add("dark-mode");

  // mijenjanje ikonice ako je dark mode ukljucen<
  if (themeButton) {
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

if (themeButton) {
  themeButton.addEventListener("click", () => {

    // mijenjanje stanja dark moda
    darkmode = !darkmode;

    if (darkmode) {

      // dodavanje dark mode klase na body
      document.body.classList.add("dark-mode");

      // mijenjanje ikonice
      themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';

      // spremanje dark mode u localStorage
      localStorage.setItem("darkmode", "true");

      console.log("Dark mode je UKLJUČEN");

    } else {

      // uklanjaje dark mode klase
      document.body.classList.remove("dark-mode");

      // vracanje moon ikonice
      themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';

      // spremanje light mode u localStorage
      localStorage.setItem("darkmode", "false");

      console.log("Dark mode je ISKLJUČEN");
    }
  });
} else {
  console.error("Dugme za temu nije pronađeno!");
}

// ================== SWIPER CAROUSEL ==================

// Swiper carousel - navigacija kroz slajdove sa strelicama i tačkama
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    520: {
      slidesPerView: 2,
    },

    950: {
      slidesPerView: 3,
    },
  },
});
