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



 // ============================================================
  // SHOPPING CART
  // ============================================================
  let cart = [];
  const WHATSAPP_NUMBER = "2348107796481";
 
  // Inject cart drawer HTML into body
  const cartDrawer = document.createElement("div");
  cartDrawer.innerHTML = `
    <button id="cart-fab" aria-label="Open cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <span id="cart-badge" class="cart-badge" aria-live="polite">0</span>
    </button>
 
    <div id="cart-panel" class="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div class="cart-panel-header">
        <h3>Your Cart</h3>
        <button id="cart-close-btn" aria-label="Close cart">✕</button>
      </div>
      <div id="cart-list" class="cart-list">
        <p class="cart-empty">Your cart is empty.<br>Add items to get started.</p>
      </div>
      <div class="cart-panel-footer">
        <div class="cart-total-row">
          <span>Total</span>
          <span id="cart-total">₦0</span>
        </div>
        <button id="cart-send-btn" class="cart-send-btn" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="flex-shrink:0">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
          Send Order on WhatsApp
        </button>
        <button id="cart-clear-btn" class="cart-clear-btn">Clear Cart</button>
      </div>
    </div>
    <div id="cart-backdrop" class="cart-backdrop"></div>
  `;
  document.body.appendChild(cartDrawer);
 
  // Cart styles
  const cartStyles = document.createElement("style");
  cartStyles.textContent = `
    /* FAB */
    #cart-fab {
      position: fixed;
      bottom: 1.5rem;
      left: 1.5rem;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #c9a84c;
      color: #080808;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 900;
      box-shadow: 0 4px 20px rgba(201,168,76,0.45);
      transition: transform 0.2s ease, background 0.2s ease;
      -webkit-tap-highlight-color: transparent;
    }
    #cart-fab:hover { background: #e8c96a; transform: scale(1.07); }
    #cart-fab:active { transform: scale(0.95); }
 
    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      background: #e74c3c;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.25s ease;
    }
    .cart-badge.visible {
      opacity: 1;
      transform: scale(1);
    }
 
    /* PANEL */
    .cart-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 360px;
      max-width: 100vw;
      height: 100%;
      background: #161616;
      border-left: 1px solid #2a2a2a;
      z-index: 1200;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      box-shadow: -8px 0 40px rgba(0,0,0,0.6);
    }
    .cart-panel.open { transform: translateX(0); }
 
    .cart-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #2a2a2a;
      flex-shrink: 0;
    }
    .cart-panel-header h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #fff;
      margin: 0;
    }
    #cart-close-btn {
      background: none;
      border: none;
      color: #888;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    #cart-close-btn:hover { color: #fff; background: #2a2a2a; }
 
    /* LIST */
    .cart-list {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.25rem;
      -webkit-overflow-scrolling: touch;
    }
    .cart-empty {
      text-align: center;
      padding: 3rem 1rem;
      color: #555;
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 1.05rem;
      line-height: 1.8;
    }
 
    /* ITEM */
    .cart-item {
      display: flex;
      gap: 0.9rem;
      padding: 1rem 0;
      border-bottom: 1px solid #222;
      align-items: flex-start;
    }
    .cart-item:last-child { border-bottom: none; }
    .cart-item-img {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border-radius: 6px;
      flex-shrink: 0;
      background: #222;
    }
    .cart-item-body { flex: 1; min-width: 0; }
    .cart-item-name {
      font-size: 0.83rem;
      font-weight: 500;
      color: #e8e8e8;
      line-height: 1.35;
      margin-bottom: 4px;
    }
    .cart-item-price {
      font-family: 'Playfair Display', serif;
      font-size: 0.88rem;
      color: #c9a84c;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .cart-item-qty {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .qty-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #222;
      border: 1px solid #333;
      color: #ccc;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }
    .qty-btn:hover, .qty-btn:active { background: #c9a84c; border-color: #c9a84c; color: #080808; }
    .qty-num {
      font-size: 0.9rem;
      color: #fff;
      min-width: 22px;
      text-align: center;
      font-weight: 600;
    }
    .cart-item-remove {
      background: none;
      border: none;
      color: #444;
      cursor: pointer;
      font-size: 1rem;
      padding: 4px 6px;
      border-radius: 4px;
      transition: all 0.2s;
      flex-shrink: 0;
      margin-top: 2px;
      -webkit-tap-highlight-color: transparent;
    }
    .cart-item-remove:hover { color: #e74c3c; background: rgba(231,76,60,0.1); }
 
    /* FOOTER */
    .cart-panel-footer {
      padding: 1.25rem 1.5rem;
      border-top: 1px solid #2a2a2a;
      flex-shrink: 0;
    }
    .cart-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #ccc;
    }
    #cart-total {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #c9a84c;
      font-weight: 700;
    }
    .cart-send-btn {
      width: 100%;
      padding: 0.95rem 1rem;
      background: #25D366;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-family: 'Jost', sans-serif;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 0.65rem;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .cart-send-btn:hover:not(:disabled) { background: #1ebe5d; }
    .cart-send-btn:active:not(:disabled) { transform: scale(0.98); }
    .cart-send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .cart-clear-btn {
      width: 100%;
      padding: 0.65rem;
      background: transparent;
      color: #555;
      border: 1px solid #2a2a2a;
      border-radius: 6px;
      font-family: 'Jost', sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .cart-clear-btn:hover { border-color: #e74c3c; color: #e74c3c; }
 
    /* BACKDROP */
    .cart-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      z-index: 1199;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .cart-backdrop.active { opacity: 1; visibility: visible; }
 
    /* ADD TO CART BUTTON on product cards */
    .add-to-cart-btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.6rem 0.75rem;
      margin-top: 0.6rem;
      background: transparent;
      border: 1px solid #c9a84c;
      color: #c9a84c;
      font-family: 'Jost', sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .add-to-cart-btn:hover,
    .add-to-cart-btn:active { background: #c9a84c; color: #080808; }
    .add-to-cart-btn.added {
      background: #4caf50;
      border-color: #4caf50;
      color: #fff;
    }
 
    /* Bounce animation for badge */
    @keyframes badgeBounce {
      0% { transform: scale(1); }
      40% { transform: scale(1.4); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
    .cart-badge.bounce { animation: badgeBounce 0.4s ease; }
 
    @media (max-width: 480px) {
      .cart-panel { width: 100vw; }
    }
  `;
  document.head.appendChild(cartStyles);
 
  // ── Cart state helpers ──────────────────────────────────────
 
  function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
  }
 
  function getTotal() {
    return cart.reduce((sum, item) => sum + item.numericPrice * item.qty, 0);
  }
 
  function getTotalCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }
 
  function updateBadge() {
    const badge = document.getElementById("cart-badge");
    const count = getTotalCount();
    badge.textContent = count;
    badge.classList.toggle("visible", count > 0);
    badge.classList.remove("bounce");
    void badge.offsetWidth; // reflow to restart animation
    if (count > 0) badge.classList.add("bounce");
  }
 
  function renderCart() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");
    const sendBtn = document.getElementById("cart-send-btn");
 
    if (!list) return;
 
    if (cart.length === 0) {
      list.innerHTML = '<p class="cart-empty">Your cart is empty.<br>Add items to get started.</p>';
    } else {
      list.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />
          <div class="cart-item-body">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">${item.price}</p>
            <div class="cart-item-qty">
              <button class="qty-btn" data-action="dec" data-name="${item.name}" aria-label="Decrease">−</button>
              <span class="qty-num" aria-label="${item.qty} items">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-name="${item.name}" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-name="${item.name}" aria-label="Remove ${item.name}">✕</button>
        </div>
      `).join("");
 
      // Qty buttons
      list.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const name = btn.dataset.name;
          const action = btn.dataset.action;
          const item = cart.find(i => i.name === name);
          if (!item) return;
          if (action === "inc") item.qty++;
          else item.qty--;
          if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
          renderCart();
          updateBadge();
        });
      });
 
      // Remove buttons
      list.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => {
          cart = cart.filter(i => i.name !== btn.dataset.name);
          renderCart();
          updateBadge();
        });
      });
    }
 
    if (totalEl) totalEl.textContent = `₦${getTotal().toLocaleString()}`;
    if (sendBtn) sendBtn.disabled = cart.length === 0;
  }
 
  function addToCart(name, price, img) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, numericPrice: parsePrice(price), img, qty: 1 });
    }
    renderCart();
    updateBadge();
  }
 
  function openCartPanel() {
    document.getElementById("cart-panel").classList.add("open");
    document.getElementById("cart-backdrop").classList.add("active");
    document.body.style.overflow = "hidden";
  }
 
  function closeCartPanel() {
    document.getElementById("cart-panel").classList.remove("open");
    document.getElementById("cart-backdrop").classList.remove("active");
    document.body.style.overflow = "";
  }
 
  // ── Cart event listeners ────────────────────────────────────
 
  document.getElementById("cart-fab").addEventListener("click", openCartPanel);
  document.getElementById("cart-close-btn").addEventListener("click", closeCartPanel);
  document.getElementById("cart-backdrop").addEventListener("click", closeCartPanel);
 
  document.getElementById("cart-clear-btn").addEventListener("click", () => {
    cart = [];
    renderCart();
    updateBadge();
  });
 
  document.getElementById("cart-send-btn").addEventListener("click", () => {
    if (cart.length === 0) return;
    const lines = cart.map(i => `• ${i.name} x${i.qty} — ${i.price}`).join("%0A");
    const total = `₦${getTotal().toLocaleString()}`;
    const msg = `Hi Janelle! 👋 I'd like to place an order:%0A%0A*ORDER SUMMARY*%0A${lines}%0A%0A*Total: ${total}*%0A%0APlease confirm availability and delivery. Thank you! 🙏`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  });
 
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCartPanel();
  });
 
  // ── Inject "Add to Cart" buttons into product & arrival cards ──
 
  document.querySelectorAll(".product-card, .arrival-card").forEach(card => {
    const nameEl = card.querySelector(".product-name, .arrival-name");
    const priceEl = card.querySelector(".product-price, .arrival-price");
    const imgEl = card.querySelector("img");
    const infoEl = card.querySelector(".product-info, .arrival-info");
 
    if (!nameEl || !priceEl || !infoEl) return;
 
    const btn = document.createElement("button");
    btn.className = "add-to-cart-btn";
    btn.textContent = "+ Add to Cart";
    btn.setAttribute("aria-label", `Add ${nameEl.textContent.trim()} to cart`);
 
    btn.addEventListener("click", () => {
      addToCart(
        nameEl.textContent.trim(),
        priceEl.textContent.trim(),
        imgEl ? imgEl.src : ""
      );
      btn.textContent = "✓ Added!";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "+ Add to Cart";
        btn.classList.remove("added");
      }, 1500);
      openCartPanel();
    });
 
    infoEl.appendChild(btn);
  });
 
  // Initial render
  renderCart();
  updateBadge();
