// ============================
// Vcloud App.js
// ============================

// --- MENU BURGER ---
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger) {
  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true" || false;
    burger.setAttribute("aria-expanded", !expanded);
    nav.classList.toggle("open");
  });
}

// --- SCROLL DOUX ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// --- ANIMATION SURVOL DES CARTES ---
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px) scale(1.02)";
    card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
    card.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
  });
});
