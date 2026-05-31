// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // HAMBURGER MENU
  // ============================================================
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
      document.body.style.overflow = navLinks.classList.contains("open")
        ? "hidden"
        : "";
    });

    // Close nav when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // ============================================================
  // NAVBAR SCROLL SHADOW
  // ============================================================
  var navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ============================================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================================
  var sections = document.querySelectorAll("section[id]");
  var navLinkItems = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinkItems.length) {
    window.addEventListener("scroll", function () {
      var current = "";
      sections.forEach(function (section) {
        var sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      navLinkItems.forEach(function (link) {
        link.style.color = "";
        if (link.getAttribute("href") === "#" + current) {
          link.style.color = "#f0c040";
        }
      });
    });
  }

  // ============================================================
  // BACK TO TOP BUTTON
  // ============================================================
  var backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ============================================================
  // PROJECT FILTER
  // ============================================================
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card[data-category]");

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Update active button
        filterBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        var filter = btn.getAttribute("data-filter");

        projectCards.forEach(function (card) {
          var category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.classList.remove("hidden");
            // Small animation
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            setTimeout(function () {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // ============================================================
  // FADE IN ON SCROLL
  // ============================================================
  var fadeEls = document.querySelectorAll(
    ".skill-card, .project-card, .contact-card, .why-item, .testimonial-card, .featured-card, .result-item",
  );

  // Add transition style and start hidden
  fadeEls.forEach(function (el) {
    el.classList.add("fade-in");
  });

  function checkFade() {
    fadeEls.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var windowH = window.innerHeight;
      if (top < windowH - 70) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkFade);
  checkFade(); // run on page load

  // ============================================================
  // CONTACT FORM — Send via WhatsApp
  // ============================================================
  var form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var subject = document.getElementById("subject").value.trim();
      var message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        showToast("Please fill in all fields.", "error");
        return;
      }

      // Build WhatsApp message
      var text =
        "Hello Emperor! 👋%0A%0A" +
        "*Name:* " +
        name +
        "%0A" +
        "*Email:* " +
        email +
        "%0A" +
        "*Subject:* " +
        subject +
        "%0A" +
        "*Message:* " +
        message;

      // Open WhatsApp
      window.open("https://wa.me/2348107796481?text=" + text, "_blank");

      // Show success
      form.innerHTML =
        "<div style='text-align:center;padding:50px 20px;'>" +
        "<div style='font-size:52px;margin-bottom:16px;'>⚡</div>" +
        "<h3 style='font-family:Syne,sans-serif;font-size:22px;color:#ffffff;margin-bottom:10px;'>Message Sent!</h3>" +
        "<p style='font-size:14px;color:#888;line-height:1.7;'>You've been redirected to WhatsApp. I'll get back to you as soon as possible!</p>" +
        "</div>";
    });
  }

  // ============================================================
  // TOAST NOTIFICATION (for form errors)
  // ============================================================
  function showToast(msg, type) {
    var existing = document.querySelector(".portfolio-toast");
    if (existing) existing.remove();

    var toast = document.createElement("div");
    toast.className = "portfolio-toast";
    toast.textContent = msg;

    var bg = type === "error" ? "#f87171" : "#4caf50";
    toast.style.cssText =
      "position:fixed;bottom:30px;left:50%;transform:translateX(-50%);" +
      "background:" +
      bg +
      ";color:#fff;padding:12px 24px;" +
      "border-radius:8px;font-size:14px;font-weight:500;" +
      "z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.3);" +
      "animation:toastIn 0.3s ease;";

    // Add keyframe
    if (!document.getElementById("toast-style")) {
      var style = document.createElement("style");
      style.id = "toast-style";
      style.textContent =
        "@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}";
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(function () {
      toast.remove();
    }, 4000);
  }

  // ============================================================
  // TYPING ANIMATION IN HERO
  // ============================================================
  var roles = [
    "Frontend Web Developer",
    "Website Builder",
    "HTML & CSS Specialist",
    "Freelancer",
  ];

  var typingEl = document.querySelector(".hero-name-accent");

  if (typingEl) {
    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var baseText = "That Actually Work.";

    // Only animate if screen is large enough
    if (window.innerWidth > 768) {
      typingEl.textContent = "";

      function type() {
        var current = roles[roleIndex];

        if (isDeleting) {
          typingEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
        }

        var speed = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === current.length) {
          speed = 2000; // pause at end
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          speed = 400;
        }

        setTimeout(type, speed);
      }

      // Small delay before starting
      setTimeout(type, 1200);
    }
  }

  // ============================================================
  // SMOOTH SCROLL FOR ALL ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        var offset = 80; // navbar height
        var top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  // ============================================================
  // HERO CARD — subtle parallax on mouse move
  // ============================================================
  var heroCard = document.querySelector(".hero-card");

  if (heroCard && window.innerWidth > 1024) {
    document.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 8;
      heroCard.style.transform =
        "perspective(800px) rotateY(" + x + "deg) rotateX(" + -y + "deg)";
    });

    document.addEventListener("mouseleave", function () {
      heroCard.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
    });
  }
});
