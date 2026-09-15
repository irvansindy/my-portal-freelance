document.documentElement.classList.add("js");

const CONTACT_CONFIG = {
  whatsapp: "6283878195721",
  email: "irvansindy7@gmail.com",
  message: "Halo, saya ingin mendiskusikan proyek web, mobile, deployment, atau maintenance server."
};

const waUrl =
  "https://wa.me/" +
  CONTACT_CONFIG.whatsapp +
  "?text=" +
  encodeURIComponent(CONTACT_CONFIG.message);

const emailUrl =
  "mailto:" +
  CONTACT_CONFIG.email +
  "?subject=" +
  encodeURIComponent("Konsultasi proyek digital dan server");

const waLinks = document.querySelectorAll("#wa-link");
const emailLink = document.getElementById("email-link");
const emailLabel = document.getElementById("email-label");
const year = document.getElementById("year");

waLinks.forEach((link) => {
  link.href = waUrl;
});

if (emailLink) emailLink.href = emailUrl;
if (emailLabel) emailLabel.textContent = CONTACT_CONFIG.email;
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navLinks.dataset.open = String(open);
}

if (navToggle && navLinks) {
  setMenu(false);

  navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-inner")) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) setMenu(false);
  });
}

document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll("details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
