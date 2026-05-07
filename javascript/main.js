// ================== HAMBURGER MENU ==================
function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");
  
  if (menu && hamburger) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("is-active");
  } else {
    console.error("Hamburger menu elementi nisu pronađeni! Provjeri ID i klase.");
  }
}

// ================== DARK MODE TOGGLE ==================
let darkmode = false;
const themeButton = document.querySelector(".theme");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    darkmode = !darkmode;
    if (darkmode) {
      document.body.classList.add("dark-mode");
      themeButton.textContent = "svijetlo";
      console.log("Dark mode je UKLJUČEN");
    } else {
      document.body.classList.remove("dark-mode");
      themeButton.textContent = "mrak";
      console.log("Dark mode je ISKLJUČEN");
    }
  });
} else {
  console.error("Dugme za temu nije pronađeno!");
}
