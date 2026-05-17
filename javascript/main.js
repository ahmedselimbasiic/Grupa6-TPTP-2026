// ================== HAMBURGER MENU ==================
function toggleMenu() {
  const menu = document.getElementById("menu"); // provjera postojanja elementa s ID "menu"
  const hamburger = document.querySelector(".hamburger"); // provjera postojanja elementa s klasom "hamburger"

  if (menu && hamburger) { // ako oba elementa postoje, nastavi s toggle funkcionalnošću
    menu.classList.toggle("active"); // dodavanje ili uklanjanje klase "active" na elementu s ID "menu"
    hamburger.classList.toggle("is-active");  // dodavanje ili uklanjanje klase "is-active" na elementu s klasom "hamburger"
  } else { // ako bilo koji od elemenata ne postoji, ispiši grešku u konzoli
    console.error(
      "Hamburger menu elementi nisu pronađeni! Provjeri ID i klase.",
    );
  }
}

// ================== DARK MODE TOGGLE ==================

// spremljen izbor ima prednost; inače prati sistem (prefers-color-scheme)
const savedTheme = localStorage.getItem("darkmode"); // dohvaćanje spremljene teme iz localStorage
let darkmode =
  savedTheme !== null
    ? savedTheme === "true"
    : window.matchMedia("(prefers-color-scheme: dark)").matches; // ako postoji spremljena tema, koristi je; inače koristi sistemsku preferenciju

const themeButton = document.querySelector(".theme"); // provjera postojanja elementa s klasom "theme"

//  postavljanje teme pri pokretanju stranice
if (darkmode) {
  document.body.classList.add("dark-mode");

  // mijenjanje ikonice ako je dark mode ukljucen<
  if (themeButton) {
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

if (themeButton) { // ako postoji dugme za temu, dodaj event listener
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

      console.log("Dark mode je ISKLJUČEN"); // ispis u konzoli kada je dark mode isključen
    }
  });
} else {
  console.error("Dugme za temu nije pronađeno!");
}

// ================== SWIPER CAROUSEL ==================
// Animacije na scroll i pojavljivanje elemenata uradjeno je na bazi card slidera kojeg
// smo pronasli na internet stranici: https://codepen.io/mal-chut/pen/oNmvwbR

// Swiper carousel - navigacija kroz slajdove sa strelicama i tačkama
var swiper = new Swiper(".slide-content", { // inicijalizacija Swiper instance na elementu s klasom "slide-content"
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",

  pagination: { // konfiguracija paginacije (tačaka)
    el: ".swiper-pagination", // element koji će služiti kao kontejner za paginaciju (tačke)
    clickable: true, // omogućava klikanje na tačke za navigaciju
    dynamicBullets: true, // omogućava dinamičke tačke koje se mijenjaju ovisno o trenutnom slajdu
  },

  navigation: { // konfiguracija navigacije (strelica)
    nextEl: ".swiper-button-next", // element koji će služiti kao dugme za prelazak na sljedeći slajd
    prevEl: ".swiper-button-prev", // element koji će služiti kao dugme za prelazak na prethodni slajd
  },

  breakpoints: { // konfiguracija responzivnosti - broj slajdova se mijenja ovisno o širini ekrana
    0: {
      slidesPerView: 1, // na ekranima širine 0px i više, prikazuje se 1 slajd 
    },

    520: {
      slidesPerView: 2, // na ekranima širine 520px i više, prikazuju se 2 slajda
    },

    950: {
      slidesPerView: 3, // na ekranima širine 950px i više, prikazuju se 3 slajda
    },
  },
});

// ================== COUNTDOWN TIMER ==================
function pad(n) { // funkcija za dodavanje vodećih nula brojevima manjim od 10
        return String(Math.floor(n)).padStart(2, "0");
      }
      function tick() { // funkcija koja se poziva svakih 1000ms (1 sekunda) za ažuriranje odbrojavanja
        var target = new Date("2026-11-01T00:00:00");
        var diff = target - new Date();
        if (diff <= 0) { // ako je cilj već prošao, postavi sve vrijednosti na 00 i prikaži poruku
          ["tc-d", "tc-h", "tc-m", "tc-s"].forEach(
            (id) => (document.getElementById(id).textContent = "00")
          );
          document.querySelector(".timer-sub").textContent =
            "Semestar je počeo!";
          return;
        }
        document.getElementById("tc-d").textContent = pad(diff / 864e5);
        document.getElementById("tc-h").textContent = pad(
          (diff % 864e5) / 36e5
        );
        document.getElementById("tc-m").textContent = pad((diff % 36e5) / 6e4);
        document.getElementById("tc-s").textContent = pad((diff % 6e4) / 1e3);
      }
      tick(); // pozivanje funkcije tick odmah kako bi se timer prikazao bez čekanja prve sekunde
      setInterval(tick, 1000); // postavljanje intervala za pozivanje funkcije tick svakih 1000ms (1 sekunda)