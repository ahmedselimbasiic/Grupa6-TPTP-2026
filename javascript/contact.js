// ================== EMAIL JS INIT ==================

emailjs.init("Phy4KH7uwmY394MMi");

// ================== FORM ==================

const form = document.querySelector("form");
const emailInput = document.getElementById("email");

// ================== SUBMIT ==================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value;

  // EMAIL VALIDACIJA
  if (!email.includes("@")) {
    showPopup("Pogrešan unos email adrese!", "#ff4d4d");
    return;
  }

  // SLANJE MAILA
  emailjs
    .sendForm(
      "service_v6ymm2n",
      "template_d5df8m8",
      form
    )
    .then(() => {
      showPopup("Poruka uspješno poslana!", "#28a745");
      form.reset();
    })
    .catch((error) => {
      showPopup("Greška pri slanju poruke!", "#ff4d4d");
      console.log(error);
    });
});

// ================== POPUP ==================

function showPopup(message, color) {
  const popup = document.createElement("div");

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

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    popup.style.opacity = "0";

    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 5000);
}