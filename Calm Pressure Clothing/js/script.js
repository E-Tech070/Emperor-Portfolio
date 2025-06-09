document.addEventListener("DOMContentLoaded", () => {
  // AOS animation
  if (window.AOS) {
    AOS.init({ duration: 1200, easing: "ease-in-out", once: true });
  }

  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Masonry gallery (for all galleries with .masonry-gallery)
  if (window.Masonry) {
    document.querySelectorAll(".masonry-gallery").forEach(function (gallery) {
      imagesLoaded(gallery, function () {
        new Masonry(gallery, {
          itemSelector: ".img-square",
          columnWidth: ".img-square",
          percentPosition: true,
          gutter: 15,
        });
      });
    });
  }
});
