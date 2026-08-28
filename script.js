// Editable store settings.
const PERFUMERY_NAME = "Orion Store";
const LOGO_TEXT = "OS";
const WHATSAPP_NUMBER = "5493413571832";
const FREE_SHIPPING_MINIMUM = 100000;
const DECANT_PRICE = "$4.900";
const cart = [];

const products = [
  { name: "Bourbon Asad", size: "", price: "$29.900", image: "images/bourbon-asad.jpg", description: "Intenso, especiado y elegante para usar de noche." },
  { name: "Mandarin Sky", size: "", price: "$34.900", image: "images/mandarin-sky.jpg", description: "Salida citrica dulce con un fondo moderno y llamativo." },
  { name: "Jean Paul Gaultier Elixir", size: "", price: "$44.900", image: "images/jpg-elixir.jpg", description: "Dulce, potente y sofisticado para destacar." },
  { name: "Badee Al Oud", size: "", price: "$37.900", image: "images/badee-al-oud.jpg", description: "Aroma profundo, amaderado y con presencia premium." },
  { name: "Erba Pura", size: "", price: "$54.900", image: "images/era-pura.jpg", description: "Frutal, fresco y elegante con mucha proyeccion." },
  { name: "Honor and Glory", size: "", price: "$37.900", image: "images/bader-al-oud.jpg", description: "Dulce, elegante y especiado con una salida muy atractiva." },
  { name: "9PM Rebel", size: "", price: "$34.900", image: "images/9pm-rebel.jpg", description: "Moderno, energico y con perfil nocturno." },
  { name: "Bharara 3 Negro", size: "", price: "$54.900", image: "images/bharara-3-negro.jpg", description: "Elegante, envolvente y con toque exclusivo." },
  { name: "Hawas Ice", size: "", price: "$39.900", image: "images/hawas-ice.jpg", description: "Fresco, limpio y vibrante para todos los dias." },
  { name: "Haramain Amber Oud Gold", size: "", price: "$52.900", image: "images/amber-oud-gold.jpg", description: "Dorado, frutal y lujoso con gran presencia." },
  { name: "Urban Man", size: "", price: "$44.900", image: "images/urban-man.jpg", description: "Versatil, masculino y prolijo para uso diario." },
  { name: "Bharara 3 Azul", size: "", price: "$49.900", image: "images/bharara-3-azul.jpg", description: "Limpio, moderno y atractivo con salida fresca." },
  { name: "Haramain Amber Oud Azul", size: "", price: "$47.900", image: "images/amber-oud-azul.jpg", description: "Elegante, fresco y sofisticado para ocasiones especiales." },
  { name: "French Avenue Liquid Brun", size: "", price: "$59.900", image: "images/liquid-brun.jpg", description: "Dulce, cremoso y premium con gran personalidad." },
  { name: "Art of Universe", size: "", price: "$49.900", image: "images/art-of-universe.jpg", description: "Distinto, moderno y refinado para dejar huella." },
];

const combos = [
  {
    tag: "Combo 1",
    name: "Best Sellers",
    items: ["Bourbon Asad", "Mandarin Sky", "Honor and Glory"],
    price: "$89.900",
  },
  {
    tag: "Combo 2",
    name: "Potentes",
    items: ["Badee Al Oud", "Hawas Ice", "9PM Rebel"],
    price: "$99.900",
  },
  {
    tag: "Combo 3",
    name: "Premium",
    items: ["Jean Paul Gaultier Elixir", "Urban Man", "Haramain Amber Oud Gold"],
    price: "$129.900",
  },
  {
    tag: "Combo 4",
    name: "Exclusivo",
    items: ["Erba Pura", "Bharara 3 Negro", "French Avenue Liquid Brun"],
    price: "$149.900",
  },
];

const duos = [
  { tag: "Duo 1", name: "Bourbon Asad + Mandarin Sky", price: "$59.900" },
  { tag: "Duo 2", name: "Badee Al Oud + Hawas Ice", price: "$69.900" },
  { tag: "Duo 3", name: "Mandarin Sky + Honor and Glory", price: "$64.900" },
];

const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
const whatsappReady = whatsappNumber.length > 4 && !WHATSAPP_NUMBER.includes("X");

function whatsappUrl(message) {
  const encodedMessage = encodeURIComponent(message || "Hola, quiero hacer una consulta.");
  return whatsappReady
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

function parsePrice(price) {
  return Number(price.replace(/[^0-9]/g, ""));
}

function formatPrice(value) {
  return `$${new Intl.NumberFormat("es-AR").format(value)}`;
}

function addToCart(item, quantity = 1) {
  const amount = Math.max(1, Number(quantity) || 1);
  const existingItem = cart.find((cartItem) => cartItem.name === item.name && cartItem.price === item.price);
  if (existingItem) {
    existingItem.quantity += amount;
  } else {
    cart.push({ ...item, quantity: amount });
  }
  renderCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function cartMessage() {
  if (!cart.length) return "Hola, quiero consultar por perfumes y combos.";

  const lines = cart.map((item) => `- ${item.quantity} x ${item.name} (${item.price})`);
  const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const shipping = total > FREE_SHIPPING_MINIMUM ? "\nIncluye envio gratis." : "";
  return `Hola, quiero comprar:\n${lines.join("\n")}\nTotal estimado: ${formatPrice(total)}.${shipping}`;
}

function openCart() {
  const drawer = document.querySelector(".cart-drawer");
  if (!drawer) return;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  const drawer = document.querySelector(".cart-drawer");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
}

function renderCart() {
  const itemsContainer = document.querySelector("[data-cart-items]");
  const totalElement = document.querySelector("[data-cart-total]");
  const countElements = document.querySelectorAll("[data-cart-count]");
  const checkout = document.querySelector("[data-cart-checkout]");
  const shippingNote = document.querySelector("[data-shipping-note]");
  if (!itemsContainer || !totalElement || !checkout) return;

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  countElements.forEach((element) => {
    element.textContent = String(totalCount);
  });
  totalElement.textContent = formatPrice(total);
  if (shippingNote) {
    shippingNote.textContent = total > FREE_SHIPPING_MINIMUM
      ? "Tu compra supera $100.000: tenes envio gratis."
      : `Envio gratis en compras mayores a ${formatPrice(FREE_SHIPPING_MINIMUM)}.`;
    shippingNote.classList.toggle("is-active", total > FREE_SHIPPING_MINIMUM);
  }
  checkout.href = whatsappUrl(cartMessage());
  checkout.classList.toggle("is-disabled", cart.length === 0);

  itemsContainer.innerHTML = "";
  if (!cart.length) {
    itemsContainer.append(createElement("p", "cart-empty", "Todavia no agregaste productos."));
    return;
  }

  cart.forEach((item, index) => {
    const row = createElement("div", "cart-item");
    const detail = createElement("div");
    detail.append(createElement("strong", "", item.name));
    detail.append(createElement("span", "", `${item.quantity} x ${item.price}`));

    const remove = createElement("button", "cart-remove", "Quitar");
    remove.type = "button";
    remove.addEventListener("click", () => removeFromCart(index));

    row.append(detail, remove);
    itemsContainer.append(row);
  });
}

function placeholderSvg(label, mode = "product") {
  const title = label.replace(/&/g, "and").slice(0, 32);
  if (mode === "hero") {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#17130f"/>
            <stop offset=".58" stop-color="#2a211b"/>
            <stop offset="1" stop-color="#596b5a"/>
          </linearGradient>
          <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#fffaf2" stop-opacity=".92"/>
            <stop offset=".48" stop-color="#c99a43" stop-opacity=".62"/>
            <stop offset="1" stop-color="#8f4050" stop-opacity=".5"/>
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#bg)"/>
        <path d="M850 92h560v716H850z" fill="none" stroke="#c99a43" stroke-width="3" opacity=".38"/>
        <path d="M1016 286h260v332c0 88-52 158-130 158s-130-70-130-158V286z" fill="url(#glass)" opacity=".86"/>
        <path d="M1066 190h160v104h-160z" fill="#c99a43" opacity=".86"/>
        <path d="M1100 132h92v66h-92z" fill="#fffaf2" opacity=".72"/>
        <path d="M1052 412c44-26 145-26 188 0v142c-44 25-145 25-188 0z" fill="#17130f" opacity=".78"/>
        <text x="1146" y="498" text-anchor="middle" fill="#c99a43" font-family="Georgia, serif" font-size="34" font-weight="700">HERO</text>
        <text x="1146" y="541" text-anchor="middle" fill="#fffaf2" font-family="Arial, sans-serif" font-size="21" font-weight="700" opacity=".72">TU FOTO AQUI</text>
        <path d="M84 746h518" stroke="#c99a43" stroke-width="2" opacity=".34"/>
      </svg>
    `)}`;
  }

  const dark = mode === "hero" ? "#17130f" : "#efe6da";
  const light = mode === "hero" ? "#fffaf2" : "#17130f";
  const gold = "#c99a43";

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${dark}"/>
          <stop offset="1" stop-color="${mode === "hero" ? "#2a211b" : "#fffaf2"}"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fffaf2" stop-opacity=".9"/>
          <stop offset=".45" stop-color="#c99a43" stop-opacity=".55"/>
          <stop offset="1" stop-color="#8f4050" stop-opacity=".55"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1100" fill="url(#bg)"/>
      <path d="M120 176h660v748H120z" fill="none" stroke="${gold}" stroke-width="3" opacity=".42"/>
      <path d="M286 390h328v352c0 78-65 142-164 142s-164-64-164-142V390z" fill="url(#glass)" opacity=".82"/>
      <path d="M352 292h196v106H352z" fill="${gold}" opacity=".92"/>
      <path d="M390 232h120v72H390z" fill="${light}" opacity=".72"/>
      <path d="M336 514c62-34 167-34 228 0v152c-62 34-167 34-228 0z" fill="${mode === "hero" ? "#17130f" : "#fffaf2"}" opacity=".82"/>
      <text x="450" y="605" text-anchor="middle" fill="${gold}" font-family="Georgia, serif" font-size="42" font-weight="700">TU FOTO</text>
      <text x="450" y="656" text-anchor="middle" fill="${light}" font-family="Arial, sans-serif" font-size="24" font-weight="700">AQUI</text>
      <text x="450" y="966" text-anchor="middle" fill="${light}" font-family="Arial, sans-serif" font-size="26" font-weight="700" opacity=".82">${title}</text>
    </svg>
  `)}`;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createImage(src, alt, mode) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  const applyFallback = () => {
    image.src = placeholderSvg(alt, mode);
    image.classList.add("is-placeholder");
  };
  image.addEventListener(
    "error",
    applyFallback,
    { once: true }
  );
  return image;
}

function createQuantityControl(labelText) {
  const wrapper = createElement("div", "quantity-control");
  const label = createElement("span", "quantity-label", labelText);
  const stepper = createElement("div", "quantity-stepper");
  const minus = createElement("button", "quantity-button", "-");
  const input = document.createElement("input");
  const plus = createElement("button", "quantity-button", "+");

  minus.type = "button";
  plus.type = "button";
  input.type = "number";
  input.min = "1";
  input.max = "99";
  input.value = "1";
  input.inputMode = "numeric";
  input.setAttribute("aria-label", labelText);

  minus.addEventListener("click", () => {
    input.value = String(Math.max(1, Number(input.value) - 1 || 1));
  });

  plus.addEventListener("click", () => {
    input.value = String(Math.min(99, Number(input.value) + 1 || 2));
  });

  input.addEventListener("input", () => {
    input.value = String(Math.min(99, Math.max(1, Number(input.value) || 1)));
  });

  stepper.append(minus, input, plus);
  wrapper.append(label, stepper);
  return { wrapper, input };
}

function buildProducts() {
  const grid = document.querySelector("#productsGrid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  products.forEach((product, index) => {
    const card = createElement("article", "product-card");
    card.dataset.animate = "";
    card.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;

    const media = createElement("div", "product-media");
    media.append(createImage(product.image, product.name, "product"));

    const body = createElement("div", "product-body");
    const meta = createElement("div", "product-meta");
    meta.append(createElement("h3", "", product.name));
    meta.append(createElement("span", "product-size", product.size || "Fragancia seleccionada"));
    meta.append(createElement("p", "product-description", product.description));

    const price = createElement("strong", "price", product.price);
    const quantity = createQuantityControl("Cantidad");
    const decant = createQuantityControl("Tubitos");
    const actions = createElement("div", "card-actions");
    const message = `Hola, quiero comprar el ${product.name} de ${product.price}.`;

    const buy = createElement("button", "product-button", "AGREGAR");
    buy.type = "button";
    buy.addEventListener("click", () => addToCart(product, quantity.input.value));

    const ask = createElement("a", "whatsapp-link", "WHATSAPP");
    ask.href = whatsappUrl(message);
    ask.target = "_blank";
    ask.rel = "noreferrer";

    const decantBox = createElement("div", "decant-option");
    const decantText = createElement("div");
    decantText.append(createElement("strong", "", "Tubito 35 ml disponible"));
    decantText.append(createElement("span", "", `${DECANT_PRICE} cada uno`));

    const decantButton = createElement("button", "decant-button", "AGREGAR TUBITO");
    decantButton.type = "button";
    decantButton.addEventListener("click", () => {
      addToCart(
        {
          name: `Tubito 35 ml - ${product.name}`,
          price: DECANT_PRICE,
        },
        decant.input.value
      );
    });

    decantBox.append(decantText, decant.wrapper, decantButton);
    actions.append(buy, ask);
    body.append(meta, price, quantity.wrapper, actions, decantBox);
    card.append(media, body);
    fragment.append(card);
  });

  grid.append(fragment);
}

function buildCombos() {
  const grid = document.querySelector("#combosGrid");
  if (!grid) return;

  combos.forEach((combo, index) => {
    const card = createElement("article", "combo-card");
    card.dataset.animate = "";
    card.style.transitionDelay = `${index * 80}ms`;

    const content = createElement("div", "combo-content");
    const top = createElement("div");
    top.append(createElement("span", "combo-tag", `${combo.tag} - ${combo.name}`));
    top.append(createElement("h3", "", combo.name.toUpperCase()));

    const list = document.createElement("ul");
    combo.items.forEach((item) => list.append(createElement("li", "", item)));
    top.append(list);

    const bottom = createElement("div");
    bottom.append(createElement("strong", "price", combo.price));
    const quantity = createQuantityControl("Cantidad");

    const action = createElement("a", "button button-primary", "QUIERO ESTE COMBO");
    action.href = "#";
    action.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart({ name: `${combo.tag} - ${combo.name}`, price: combo.price }, quantity.input.value);
    });
    bottom.append(quantity.wrapper, action);

    content.append(top, bottom);
    card.append(content);
    grid.append(card);
  });
}

function buildSimpleCards(collection, selector, className, actionText) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  collection.forEach((item, index) => {
    const card = createElement("article", className);
    card.dataset.animate = "";
    card.style.transitionDelay = `${index * 70}ms`;

    if (item.tag) card.append(createElement("span", "combo-tag", item.tag));
    if (item.kicker) card.append(createElement("span", "bundle-kicker", item.kicker));
    card.append(createElement("h3", "", item.name));
    if (item.detail) card.append(createElement("p", "", item.detail));
    card.append(createElement("strong", "price", item.price));
    const quantity = createQuantityControl("Cantidad");
    card.append(quantity.wrapper);

    const action = createElement("button", "product-button", actionText);
    action.type = "button";
    action.addEventListener("click", () => addToCart(item, quantity.input.value));
    card.append(action);

    grid.append(card);
  });
}

function wireWhatsappLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.whatsapp);
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}

function wireFallbackImages() {
  document.querySelectorAll("[data-fallback-image]").forEach((image) => {
    const applyFallback = () => {
      const mode = image.classList.contains("hero-image") ? "hero" : "product";
      image.src = placeholderSvg(image.dataset.fallbackImage, mode);
      image.classList.add("is-placeholder");
    };

    image.addEventListener(
      "error",
      applyFallback,
      { once: true }
    );

    if (image.complete && image.naturalWidth === 0) {
      applyFallback();
    }
  });
}

function wireNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

function wireCart() {
  document.querySelectorAll("[data-cart-open]").forEach((button) => {
    button.addEventListener("click", openCart);
  });

  document.querySelectorAll("[data-cart-close]").forEach((button) => {
    button.addEventListener("click", closeCart);
  });

  document.querySelector(".cart-drawer")?.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart-drawer")) closeCart();
  });

  document.querySelector("[data-cart-checkout]")?.addEventListener("click", (event) => {
    if (!cart.length) event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCart();
  });
}

function wireBranding() {
  document.querySelectorAll("[data-store-name]").forEach((element) => {
    element.textContent = PERFUMERY_NAME;
  });
  document.querySelectorAll("[data-logo]").forEach((element) => {
    element.textContent = LOGO_TEXT;
  });
  document.querySelectorAll("[data-logo-image]").forEach((image) => {
    image.addEventListener(
      "load",
      () => {
        image.classList.add("is-loaded");
        image.nextElementSibling?.classList.add("is-hidden");
      },
      { once: true }
    );
    image.addEventListener(
      "error",
      () => {
        image.remove();
      },
      { once: true }
    );
  });
  document.title = `${PERFUMERY_NAME} | Fragancias y combos`;
}

function wireAnimations() {
  const animated = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window)) {
    animated.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  animated.forEach((element) => observer.observe(element));
}

function init() {
  wireBranding();
  wireFallbackImages();
  buildProducts();
  buildCombos();
  buildSimpleCards(duos, "#duosGrid", "duo-card", "CONSULTAR");
  wireWhatsappLinks();
  wireNavigation();
  wireCart();
  renderCart();
  wireAnimations();
}

document.addEventListener("DOMContentLoaded", init);