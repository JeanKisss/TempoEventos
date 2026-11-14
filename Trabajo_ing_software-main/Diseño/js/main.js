(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const waLink = (msg) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* ---------- Fotos faltantes: muestra un recuadro con el nombre esperado ---------- */
  function guardImage(img) {
    const mark = () => {
      const box = img.closest(".ph-wrap") || img.parentElement;
      box.classList.add("img-missing");
      box.dataset.label = "Foto pendiente: " + (img.dataset.ph || img.getAttribute("src"));
      img.style.visibility = "hidden";
    };
    img.addEventListener("error", mark, { once: true });
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) mark();
  }
  const guardAll = (root = document) => $$("img", root).forEach(guardImage);

  /* ---------- Enlaces de WhatsApp ---------- */
  function wireWa(root = document) {
    $$(".js-wa", root).forEach((a) => {
      a.href = waLink(a.dataset.msg || "Hola Tempo Arriendos");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Catálogo ---------- */
  function renderCatalog() {
    const tabs = $("#catTabs");
    const grid = $("#catGrid");

    tabs.innerHTML = CATALOGO.map((c, i) =>
      `<button role="tab" class="tab" aria-selected="${i === 0}" data-cat="${c.id}">${esc(c.nombre)}</button>`
    ).join("");

    const show = (id) => {
      const cat = CATALOGO.find((c) => c.id === id);
      $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.cat === id));
      grid.innerHTML = cat.items.map((it) => `
        <article class="card">
          <button class="card__media ph-wrap" data-full="${esc(it.full || it.img)}" data-cap="${esc(it.nombre)}" aria-label="Ampliar foto de ${esc(it.nombre)}">
            <img src="${esc(it.img)}" alt="${esc(it.nombre)}" loading="lazy" decoding="async">
            <span class="card__zoom"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-zoom"/></svg></span>
          </button>
          <div class="card__body">
            <h3>${esc(it.nombre)}</h3>
            <p>${esc(it.detalle)}</p>
            <div class="chips">${(it.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
            <a class="link-wa js-wa" data-msg="${esc(`Hola Tempo Arriendos, quiero consultar por: ${it.nombre} (${cat.nombre}).`)}">
              Consultar disponibilidad →
            </a>
          </div>
        </article>`).join("");
      guardAll(grid);
      wireWa(grid);
    };

    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".tab");
      if (b) show(b.dataset.cat);
    });
    show(CATALOGO[0].id);
  }

  /* ---------- Kits ---------- */
  function renderKits() {
    const grid = $("#kitGrid");
    const input = $("#kitGuests");
    const presets = $$(".kits__presets .tab");
    const getGuests = () => {
      const val = parseInt(input ? input.value : "50", 10);
      return Number.isFinite(val) && val >= 1 ? Math.min(val, 5000) : 50;
    };
    const qty = (it, g) => (it.cada ? Math.ceil(g / it.cada) : Math.ceil(g * it.por));

    // Tarjetas con el mismo formato que el catálogo
    grid.innerHTML = KITS.map((k) => `
      <article class="card kit" data-kit="${k.id}">
        <button class="card__media ph-wrap" data-full="${esc(k.full || k.img)}" data-cap="${esc(`Kit ${k.nombre}`)}" aria-label="Ampliar foto del kit ${esc(k.nombre)}">
          <img src="${esc(k.img)}" alt="${esc(`Montaje real: ${k.nombre}`)}" loading="lazy" decoding="async">
          <span class="card__zoom"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-zoom"/></svg></span>
        </button>
        <div class="card__body">
          <h3>Kit ${esc(k.nombre)}</h3>
          <p>${esc(k.desc)}</p>
          <div class="chips"><span class="chip js-kit-guests">Base: ${getGuests()} invitados</span><span class="chip">${k.items.length} elementos</span></div>
          <ul class="kit-list"></ul>
          <a class="link-wa">Cotizar este kit por WhatsApp →</a>
        </div>
      </article>`).join("");
    guardAll(grid);

    const update = () => {
      const g = getGuests();
      presets.forEach((b) => {
        const active = parseInt(b.dataset.guests, 10) === g;
        b.setAttribute("aria-pressed", active);
        b.setAttribute("aria-selected", active);
      });
      $$(".kit", grid).forEach((card) => {
        const k = KITS.find((x) => x.id === card.dataset.kit);
        const rows = k.items.map((it) => ({ n: it.nombre, q: qty(it, g) }));
        $(".js-kit-guests", card).textContent = `Base: ${g} invitados`;
        $(".kit-list", card).innerHTML = rows.map((r) =>
          `<li><span>${esc(r.n)}</span><strong>${r.q}</strong></li>`).join("");
        const msg = `Hola Tempo Arriendos, quiero cotizar el kit "${k.nombre}" para ${g} invitados:\n` +
          rows.map((r) => `• ${r.q} ${r.n}`).join("\n") +
          `\n\nFecha del evento: \nComuna: `;
        const a = $(".link-wa", card);
        a.href = waLink(msg);
        a.target = "_blank";
        a.rel = "noopener";
      });
    };

    if (input) input.addEventListener("input", update);
    presets.forEach((b) => b.addEventListener("click", () => {
      if (input) input.value = b.dataset.guests;
      update();
    }));

    update();
  }

  /* ---------- Clientes ---------- */
  function renderClients() {
    const grid = $("#clientGrid");
    grid.innerHTML = CLIENTES.map((c) => `
      <figure class="shot">
        <button class="shot__media ph-wrap" data-full="${esc(c.full || c.img)}" data-cap="${esc(`${c.cliente} · ${c.evento}`)}" aria-label="Ampliar foto: ${esc(c.cliente)}">
          <img src="${esc(c.img)}" alt="${esc(`${c.evento} para ${c.cliente}`)}" loading="lazy" decoding="async">
        </button>
        <figcaption><strong>${esc(c.cliente)}</strong><span>${esc(c.evento)}</span></figcaption>
      </figure>`).join("");
    guardAll(grid);
  }

  /* ---------- Lightbox con zoom ---------- */
  function lightbox() {
    const lb = $("#lightbox");
    const img = $("#lbImg");
    const cap = $("#lbCap");
    let lastFocus = null;

    const open = (src, caption) => {
      lastFocus = document.activeElement;
      img.src = src;
      img.alt = caption || "";
      cap.textContent = caption || "";
      img.classList.remove("is-zoomed");
      lb.hidden = false;
      document.body.classList.add("no-scroll");
      $("#lbClose").focus();
    };
    const close = () => {
      lb.hidden = true;
      img.src = "";
      document.body.classList.remove("no-scroll");
      lastFocus && lastFocus.focus();
    };

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-full], img.zoomable");
      if (!t || t.closest(".img-missing")) return;
      open(t.dataset.full || t.src, t.dataset.cap || t.alt);
    });

    img.addEventListener("click", (e) => {
      const r = img.getBoundingClientRect();
      img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      img.classList.toggle("is-zoomed");
    });
    $("#lbClose").addEventListener("click", close);
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) close(); });
  }

  /* ---------- Menú móvil y header ---------- */
  function navigation() {
    const toggle = $("#navToggle");
    const nav = $("#nav");
    const setOpen = (v) => {
      nav.classList.toggle("is-open", v);
      toggle.setAttribute("aria-expanded", v);
      toggle.setAttribute("aria-label", v ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    $$("a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));

    const header = $("#header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Contacto: selector de mapa y registro anual ---------- */
  function initContact() {
    const mapFrame = $("#contactMap");
    const mapTabs = $$(".contact__map-tabs .tab");
    if (mapFrame && mapTabs.length) {
      mapTabs.forEach((t) => t.addEventListener("click", () => {
        mapTabs.forEach((b) => b.setAttribute("aria-selected", b === t));
        mapFrame.src = t.dataset.mapSrc;
        mapFrame.title = t.dataset.mapTitle;
      }));
    }

    const form = $("#reminderForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        nombre: $("#remName").value.trim(),
        contacto: $("#remContact").value.trim(),
        tipo: $("#remType").value,
        fecha: $("#remDate").value,
        creado: new Date().toISOString(),
      };
      try {
        const prev = JSON.parse(localStorage.getItem("tempo_recordatorios") || "[]");
        prev.push(data);
        localStorage.setItem("tempo_recordatorios", JSON.stringify(prev));
      } catch (_) { /* almacenamiento local opcional */ }

      const waBtn = $("#remWaBtn");
      const msg = `Hola Tempo Arriendos, quiero dejar registrada la fecha de mi evento para recordatorio anual:\n` +
        `• Nombre: ${data.nombre}\n` +
        `• Contacto: ${data.contacto}\n` +
        `• Evento: ${data.tipo}\n` +
        `• Fecha: ${data.fecha}`;
      waBtn.href = waLink(msg);
      waBtn.classList.remove("is-hidden");
      $("#remStatus").textContent = "Listo, registramos tu fecha. También puedes enviárnosla directo por WhatsApp.";
      form.reset();
    });
  }

  /* ---------- Slider fluido de portada ---------- */
  function initHeroSlider() {
    const slider = $("#heroSlider");
    if (!slider) return;
    const track = $(".hero__track", slider);
    const slides = $$(".hero__img", track);
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const firstClone = slides[0].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    track.appendChild(firstClone);

    let index = 0;
    const total = slides.length;

    track.addEventListener("transitionend", () => {
      if (index === total) {
        track.classList.add("is-instant");
        index = 0;
        track.style.transform = "translateX(0%)";
        void track.offsetWidth;
        track.classList.remove("is-instant");
      }
    });

    setInterval(() => {
      if (document.hidden) return;
      index += 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 5000);
  }

  /* ---------- Init: cada página dibuja solo lo que contiene ---------- */
  if ($("#catGrid")) renderCatalog();
  if ($("#kitGrid")) renderKits();
  if ($("#clientGrid")) renderClients();
  initHeroSlider();
  initContact();
  guardAll();
  wireWa();
  lightbox();
  navigation();
  $("#year").textContent = new Date().getFullYear();
})();
