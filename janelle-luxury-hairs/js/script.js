document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // PRELOADER
  // ============================================================
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add("hidden");
    }, 800);
  });

  // ============================================================
  // HEADER SCROLL
  // ============================================================
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // ============================================================
  // HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".nav");
  const overlay = document.getElementById("overlay");

  function closeMenu() {
    if (hamburger) hamburger.classList.remove("active");
    if (nav) nav.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    const isOpen = nav && nav.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      if (hamburger) hamburger.classList.add("active");
      if (nav) nav.classList.add("open");
      if (overlay) overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  if (hamburger) hamburger.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  // ============================================================
  // ACTIVE NAV ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  // ============================================================
  // PRODUCT FILTER
  // ============================================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeUp 0.4s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ============================================================
  // BACK TO TOP
  // ============================================================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

});