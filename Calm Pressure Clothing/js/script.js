document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // AOS Animation
  // ============================================================
  if (window.AOS) {
    AOS.init({ duration: 1200, easing: "ease-in-out", once: true });
  }

  // ============================================================
  // Back To Top Button
  // ============================================================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ============================================================
  // Hamburger Menu
  // — toggles .active on hamburger
  // — toggles .open on nav (CSS slides it in from right)
  // — toggles .active on overlay
  // ============================================================
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");
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
      document.body.style.overflow = "hidden"; // prevent background scroll
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Close menu when any nav link is clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // ============================================================
  // Active Nav Link on Scroll
  // ============================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // ============================================================
  // Header Shadow Deepens on Scroll
  // ============================================================
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 50
        ? "0 4px 40px rgba(0,0,0,0.7)"
        : "0 4px 30px rgba(0,0,0,0.4)";
    });
  }

});