(function () {
  "use strict";

  const config = window.ENCANTO_DIGITAL || { whatsappNumero: "" };
  const appScript = document.currentScript;
  const dataUrl = new URL("../data/invitations.json", appScript.src);
  const catalog = document.querySelector("#catalog-grid");
  const filters = document.querySelector("#catalog-filters");
  const emptyState = document.querySelector("#catalog-empty");
  const contactButton = document.querySelector("#contact-button");
  const floatingContact = document.querySelector("#whatsapp-float");
  const categoryNames = {
    bodas: "Bodas",
    "15-anos": "15 a\u00f1os",
    cumpleanos: "Cumplea\u00f1os",
    "baby-shower": "Baby shower",
    graduaciones: "Graduaciones",
    bautizos: "Bautizos"
  };

  function categoryLabel(category) {
    if (Object.prototype.hasOwnProperty.call(categoryNames, category)) return categoryNames[category];
    return category.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function validImagePath(path) {
    if (typeof path !== "string" || !path.trim()) return false;
    let imageUrl;
    try {
      imageUrl = new URL(path, document.baseURI);
    } catch {
      return false;
    }
    return /^assets\/invitaciones\/[a-z0-9_-]+\.(?:svg|png|jpe?g|webp|avif)$/i.test(path) &&
      imageUrl.origin === window.location.origin && !path.startsWith("/") && !path.split("/").includes("..");
  }

  function validModel(model) {
    return Boolean(model && model.published === true &&
      typeof model.id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(model.id) &&
      typeof model.name === "string" && model.name.trim() &&
      typeof model.category === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(model.category) &&
      model.images && typeof model.images === "object" &&
      (!model.images.desktop || validImagePath(model.images.desktop)) &&
      (!model.images.mobile || validImagePath(model.images.mobile)) &&
      (!model.images.catalogCapture || validImagePath(model.images.catalogCapture)) &&
      (!model.images.catalogStoryCapture || validImagePath(model.images.catalogStoryCapture)) &&
      (!model.images.catalogDetailsCapture || validImagePath(model.images.catalogDetailsCapture)) &&
      (typeof model.demoUrl !== "string" || !model.demoUrl || isHttpsUrl(model.demoUrl)));
  }

  function isHttpsUrl(value) {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }

  function createWhatsAppUrl(message) {
    const number = String(config.whatsappNumero || "");
    if (!/^\d{8,15}$/.test(number)) return "";
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  function createCard(model) {
    const article = document.createElement("article");
    article.className = "card invitation-card card--entering";
    const detailLink = document.createElement("a");
    detailLink.className = "card__detail-link";
    detailLink.href = `./invitacion/?id=${encodeURIComponent(model.id)}`;
    detailLink.setAttribute("aria-label", `Descubrir invitaci\u00f3n: ${model.name}`);

    const media = document.createElement("div");
    media.className = "card__media";
    if (model.images.catalogCapture) {
      media.classList.add("card__media--premium");

      const ornament = document.createElement("span");
      ornament.className = "card__floral";
      ornament.setAttribute("aria-hidden", "true");
      ornament.innerHTML = '<svg viewBox="0 0 160 200" focusable="false"><path d="M18 188C52 144 92 90 136 16"/><path d="M48 149c-24 1-39-12-45-35 24 0 40 12 45 35Zm23-38c-1-24 11-40 33-47 1 24-11 40-33 47Zm21-37c-23-4-36-20-38-44 23 4 36 20 38 44Zm-62 93c-18-14-22-33-12-54 18 14 22 33 12 54Zm83-113c-17-14-20-33-9-53 17 14 20 33 9 53Z"/></svg>';

      const captures = [
        { src: model.images.catalogStoryCapture, position: "left" },
        { src: model.images.catalogDetailsCapture, position: "right" },
        { src: model.images.catalogCapture, position: "front" }
      ].filter((capture) => capture.src);

      captures.forEach(({ src, position }) => {
        const phone = document.createElement("div");
        phone.className = `card__phone-mockup card__phone-mockup--${position}`;
        phone.setAttribute("aria-hidden", "true");
        const screen = document.createElement("img");
        screen.className = "card__screen";
        screen.src = src;
        screen.alt = "";
        screen.width = 390;
        screen.height = 844;
        screen.loading = Number(model.order) === 1 && position === "front" ? "eager" : "lazy";
        if (Number(model.order) === 1 && position === "front") screen.fetchPriority = "high";
        screen.decoding = "async";
        phone.append(screen);
        media.append(phone);
      });

      const coverTitle = document.createElement("h2");
      coverTitle.className = "card__cover-title";
      coverTitle.textContent = model.name;
      media.append(ornament);
      detailLink.append(media, coverTitle);
    } else if (model.images.desktop || model.images.mobile) {
      const picture = document.createElement("picture");
      if (model.images.mobile) {
        const mobileSource = document.createElement("source");
        mobileSource.media = "(max-width: 40rem)";
        mobileSource.srcset = model.images.mobile;
        picture.append(mobileSource);
      }

      const image = document.createElement("img");
      image.className = "card__image";
      image.src = model.images.desktop || model.images.mobile;
      image.alt = model.images.alt || `Invitaci\u00f3n digital: ${model.name}`;
      image.width = 600;
      image.height = 800;
      image.loading = Number(model.order) === 1 ? "eager" : "lazy";
      if (Number(model.order) === 1) image.fetchPriority = "high";
      image.decoding = "async";
      image.addEventListener("error", () => image.classList.add("is-unavailable"), { once: true });
      picture.append(image);
      media.append(picture);

    } else {
      media.setAttribute("aria-hidden", "true");
    }

    if (!model.images.catalogCapture) {
      const content = document.createElement("div");
      content.className = "card__content";
      const title = document.createElement("h3");
      title.textContent = model.name;
      content.append(title);
      detailLink.append(media, content);
    }

    const actions = document.createElement("div");
    actions.className = "card__actions";

    const details = document.createElement("a");
    details.className = "button button--card button--details";
    details.href = detailLink.href;
    details.textContent = "Detalles";
    details.setAttribute("aria-label", `Ver detalles de ${model.name}`);
    actions.append(details);

    if (model.demoUrl) {
      const demo = document.createElement("a");
      demo.className = "button button--card button--demo";
      demo.href = model.demoUrl;
      demo.target = "_blank";
      demo.rel = "noopener noreferrer";
      demo.textContent = "Ver demo";
      demo.setAttribute("aria-label", `Ver demo de ${model.name} (se abre en una pesta\u00f1a nueva)`);
      actions.append(demo);
    } else {
      const demo = document.createElement("span");
      demo.className = "button button--secondary button--card button--unavailable";
      demo.setAttribute("aria-disabled", "true");
      demo.textContent = "Demo pronto";
      actions.append(demo);
    }

    article.append(detailLink, actions);
    return article;
  }

  function renderCatalog(input) {
    const seenIds = new Set();
    const models = (Array.isArray(input) ? input : [])
      .filter((model) => {
        if (!validModel(model) || seenIds.has(model.id)) return false;
        seenIds.add(model.id);
        return true;
      })
      .sort((a, b) => (Number(a.order) || Number.MAX_SAFE_INTEGER) - (Number(b.order) || Number.MAX_SAFE_INTEGER));
    const categories = [...new Set(models.map((model) => model.category))];
    const filterButtons = [];
    let selectedCategory = "todas";

    catalog.replaceChildren();
    filters.replaceChildren();
    filters.hidden = categories.length === 0;

    if (categories.length === 0) {
      emptyState.textContent = "Estamos preparando los primeros dise\u00f1os. Vuelve pronto para descubrir el cat\u00e1logo.";
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;

    function renderCards() {
      const visibleModels = selectedCategory === "todas"
        ? models
        : models.filter((model) => model.category === selectedCategory);
      catalog.replaceChildren(...visibleModels.map(createCard));
    }

    function addFilter(value, label) {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-pressed", String(value === selectedCategory));
      button.dataset.category = value;
      button.addEventListener("click", () => {
        selectedCategory = value;
        filterButtons.forEach((filter) => filter.setAttribute("aria-pressed", String(filter.dataset.category === value)));
        renderCards();
      });
      filterButtons.push(button);
      filters.append(button);
    }

    addFilter("todas", "Todas");
    categories.forEach((category) => addFilter(category, categoryLabel(category)));
    renderCards();
  }

  async function loadCatalog() {
    catalog.setAttribute("aria-busy", "true");
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) throw new Error("Catalog data unavailable");
      const data = await response.json();
      renderCatalog(data.invitations);
    } catch {
      catalog.replaceChildren();
      filters.replaceChildren();
      filters.hidden = true;
      emptyState.textContent = window.location.protocol === "file:"
        ? "Para mostrar el cat\u00e1logo, abre esta p\u00e1gina desde un servidor local."
        : "No pudimos cargar el cat\u00e1logo. Intenta de nuevo m\u00e1s tarde.";
      emptyState.hidden = false;
    } finally {
      catalog.setAttribute("aria-busy", "false");
    }
  }

  const contactHref = createWhatsAppUrl("Hola, quisiera conocer m\u00e1s informaci\u00f3n sobre las invitaciones digitales de Encanto Digital.");
  if (contactButton && contactHref) {
    const link = document.createElement("a");
    link.id = contactButton.id;
    link.className = contactButton.className;
    link.href = contactHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consultar por WhatsApp";
    contactButton.replaceWith(link);
  }

  if (floatingContact && contactHref) {
    floatingContact.href = contactHref;
    floatingContact.hidden = false;
    const floatingBlockers = ["#catalogo", "#contacto"]
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
    if (floatingBlockers.length && "IntersectionObserver" in window) {
      const intersectingSections = new Set();
      const floatingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersectingSections.add(entry.target);
          else intersectingSections.delete(entry.target);
        });
        floatingContact.hidden = intersectingSections.size > 0;
      });
      floatingBlockers.forEach((section) => floatingObserver.observe(section));
    } else if (floatingBlockers.length) {
      const updateFloatingContact = () => {
        floatingContact.hidden = floatingBlockers.some((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.bottom > 0 && bounds.top < window.innerHeight;
        });
      };
      window.addEventListener("scroll", updateFloatingContact, { passive: true });
      window.addEventListener("resize", updateFloatingContact);
      updateFloatingContact();
    }
  } else {
    floatingContact?.remove();
  }

  loadCatalog();

  const currentYear = document.querySelector("#current-year");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
})();
