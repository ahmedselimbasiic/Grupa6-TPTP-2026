function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");

  if (menu && hamburger) {
    menu.classList.toggle("active");
    hamburger.classList.toggle("is-active");
    console.log("Meni je kliknut!");
  } else {
    console.error("Elementi nisu pronađeni! Provjeri ID i klase.");
  }
}
