// ================== EMAIL JS INIT ==================
// EmailJS smo pronašli pomoću Gemini
emailjs.init("Phy4KH7uwmY394MMi"); // Zamijenite s vašim EmailJS user ID-om

// ================== FORM ==================

const form = document.querySelector("form"); // Provjerite da li postoji form element na stranici
const emailInput = document.getElementById("email"); // Provjerite da li postoji input element s id="email" na stranici

// ================== SUBMIT ==================

form.addEventListener("submit", function (e) { // Provjerite da li form element postoji prije dodavanja event listenera
  e.preventDefault();

  const email = emailInput.value; // Provjerite da li emailInput element postoji prije pristupa njegovoj vrijednosti

  // EMAIL VALIDACIJA
  if (!email.includes("@")) { // Jednostavna provjera da li email sadrži '@' simbol
    showPopup("Pogrešan unos email adrese!", "#ff4d4d"); // Prikaz crvenog popup-a s porukom o pogrešnom unosu
    return;
  }

  // SLANJE MAILA
  emailjs // Provjerite da li je emailjs objekt dostupan prije pozivanja sendForm metode
    .sendForm( // Zamijenite s vašim EmailJS servisom, template-om i form elementom
      "service_v6ymm2n",
      "template_d5df8m8",
      form
    )
    .then(() => { // Ako je slanje uspješno, prikaz zelenog popup-a s porukom o uspješnom slanju
      showPopup("Poruka uspješno poslana!", "#28a745");
      form.reset();
    })
    .catch((error) => { // Ako dođe do greške pri slanju, prikaz crvenog popup-a s porukom o grešci i ispis greške u konzoli
      showPopup("Greška pri slanju poruke!", "#ff4d4d");
      console.log(error);
    });
});

// ================== POPUP ==================

function showPopup(message, color) { // Funkcija za prikaz popup poruke, prima poruku i boju kao argumente
  const popup = document.createElement("div"); // Kreiranje novog div elementa koji će služiti kao popup

  popup.innerText = message;

  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = color;
  popup.style.color = "white";
  popup.style.padding = "15px 25px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "16px";
  popup.style.fontWeight = "bold";
  popup.style.zIndex = "9999";
  popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  popup.style.opacity = "0";
  popup.style.transition = "0.3s";

  document.body.appendChild(popup);

  setTimeout(() => { // Nakon kratkog vremena, postavljanje opacity na 1 kako bi se popup pojavio
    popup.style.opacity = "1";
  }, 100);

  setTimeout(() => { // Nakon 5 sekundi, postavljanje opacity na 0 kako bi se popup sakrio, a zatim uklanjanje elementa iz DOM-a
    popup.style.opacity = "0";

    setTimeout(() => { // Nakon 300ms, uklanjanje popup elementa iz DOM-a
      popup.remove();
    }, 300);
  }, 5000);
}