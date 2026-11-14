/* =========================================================
   CONTENIDO EDITABLE DEL SITIO
   Aquí se cambia el número de WhatsApp, el catálogo, los kits
   y la galería de clientes. No hace falta tocar el HTML.
   Las imágenes deben ser FOTOS REALES del cliente (ver img/LEEME.md).
   ========================================================= */

const CONFIG = {
  // Número en formato internacional, sin "+", espacios ni guiones.
  whatsapp: "56996972765",
  instagram: "https://www.instagram.com/tempoeventos.cl/",
};

/* ---------- CATÁLOGO (sin precios) ----------
   img:  foto que se muestra en la tarjeta (≈1200 px de ancho)
   full: (opcional) foto en alta resolución para el zoom (≈2400 px)
   tags: variantes disponibles (colores, medidas, etc.)                */
const CATALOGO = [
  {
    id: "mobiliario",
    nombre: "Mobiliario",
    items: [
      { nombre: "Mesa redonda", detalle: "Para 8 a 10 personas. Ideal para matrimonios y cenas.", tags: ["Ø 1,50 m", "Ø 1,80 m"], img: "img/catalogo/mesa-redonda.jpg" },
      { nombre: "Mesa rectangular", detalle: "Versátil para asados, buffet y mesas largas.", tags: ["1,80 × 0,75 m", "2,40 × 0,90 m"], img: "img/catalogo/mesa-rectangular.jpg" },
      { nombre: "Silla blanca", detalle: "Clásica y luminosa, combina con cualquier decoración.", tags: ["Blanca"], img: "img/catalogo/silla-blanca.jpg" },
      { nombre: "Silla negra", detalle: "Elegante y moderna, ideal para eventos de noche.", tags: ["Negra"], img: "img/catalogo/silla-negra.jpg" },
      { nombre: "Silla Tiffany", detalle: "El toque romántico para matrimonios.", tags: ["Blanca", "Dorada", "Transparente"], img: "img/catalogo/silla-tiffany.jpg" },
      { nombre: "Mesa cóctel", detalle: "Mesas altas para recepción y eventos de pie.", tags: ["Con o sin funda"], img: "img/catalogo/mesa-coctel.jpg" },
    ],
  },
  {
    id: "vajilla",
    nombre: "Vajilla",
    items: [
      { nombre: "Plato de sitio", detalle: "Base decorativa que viste la mesa.", tags: ["Dorado", "Plateado", "Rattan"], img: "img/catalogo/plato-sitio.jpg" },
      { nombre: "Plato llano", detalle: "Porcelana blanca para el plato principal.", tags: ["27 cm"], img: "img/catalogo/plato-llano.jpg" },
      { nombre: "Plato de fondo", detalle: "Para entradas, cremas y sopas.", tags: ["23 cm"], img: "img/catalogo/plato-fondo.jpg" },
      { nombre: "Plato de postre", detalle: "Para postres, torta y aperitivos.", tags: ["19 cm"], img: "img/catalogo/plato-postre.jpg" },
      { nombre: "Cubiertos", detalle: "Tenedor, cuchillo y cuchara en acero inoxidable.", tags: ["Plateado", "Dorado"], img: "img/catalogo/cubiertos.jpg" },
      { nombre: "Taza y platillo", detalle: "Para café y té al cierre del evento.", tags: ["Porcelana blanca"], img: "img/catalogo/taza.jpg" },
    ],
  },
  {
    id: "cristaleria",
    nombre: "Cristalería",
    items: [
      { nombre: "Copa de vino", detalle: "Copa de cristal para tinto o blanco.", tags: ["Tinto", "Blanco"], img: "img/catalogo/copa-vino.jpg" },
      { nombre: "Copa de champaña", detalle: "Flauta para el brindis.", tags: ["Flauta"], img: "img/catalogo/copa-champana.jpg" },
      { nombre: "Copa de agua", detalle: "Copa grande para servicio de mesa.", tags: ["Cristal"], img: "img/catalogo/copa-agua.jpg" },
      { nombre: "Vaso", detalle: "Para bebidas, tragos y servicio informal.", tags: ["Alto", "Bajo"], img: "img/catalogo/vaso.jpg" },
      { nombre: "Jarro", detalle: "Para agua, jugos y limonada.", tags: ["1,5 L"], img: "img/catalogo/jarro.jpg" },
    ],
  },
  {
    id: "manteleria",
    nombre: "Mantelería",
    items: [
      { nombre: "Mantel redondo", detalle: "Hasta el suelo, para mesas redondas.", tags: ["Blanco", "Negro", "Colores"], img: "img/catalogo/mantel-redondo.jpg" },
      { nombre: "Mantel rectangular", detalle: "Para mesas rectangulares y buffet.", tags: ["Blanco", "Negro", "Colores"], img: "img/catalogo/mantel-rectangular.jpg" },
      { nombre: "Cubremantel", detalle: "Agrega color y textura sobre el mantel base.", tags: ["Varios colores"], img: "img/catalogo/cubremantel.jpg" },
      { nombre: "Camino de mesa", detalle: "Detalle decorativo para el centro de la mesa.", tags: ["Lino", "Satín"], img: "img/catalogo/camino-mesa.jpg" },
      { nombre: "Servilleta de género", detalle: "Servilletas de tela para un servicio cuidado.", tags: ["Blanca", "Negra", "Colores"], img: "img/catalogo/servilleta.jpg" },
    ],
  },
  {
    id: "lounge",
    nombre: "Lounge",
    items: [
      { nombre: "Puff", detalle: "Cómodos y versátiles para zonas de descanso y cóctel.", tags: ["Blanco", "Negro"], img: "img/catalogo/puff.jpg" },
      { nombre: "Mesa de centro", detalle: "Complemento ideal para armar livings en exterior o interior.", tags: ["Madera", "Blanca"], img: "img/catalogo/mesa-centro.jpg" },
      { nombre: "Banqueta lounge", detalle: "Asiento doble o triple para recepciones y terrazas.", tags: ["Ecocuero", "Blanca"], img: "img/catalogo/banqueta.jpg" },
      { nombre: "Piso alto", detalle: "Para barras, mesas cóctel y sectores de bar.", tags: ["Negro", "Blanco"], img: "img/catalogo/piso-alto.jpg" },
    ],
  },
];

/* ---------- KITS SUGERIDOS ----------
   Cada ítem calcula su cantidad según los invitados (g):
     por: 1    -> 1 unidad por invitado
     por: 1.1  -> 1 por invitado + 10% de reposición
     cada: 10  -> 1 unidad cada 10 invitados (ej. mesas)              */
const KITS = [
  {
    id: "asado",
    nombre: "Asado",
    desc: "Para celebraciones al aire libre, relajadas y con mesas largas.",
    img: "img/kits/asado.jpg",
    items: [
      { nombre: "Mesas rectangulares (8 pers.)", cada: 8 },
      { nombre: "Sillas", por: 1 },
      { nombre: "Manteles rectangulares", cada: 8 },
      { nombre: "Platos llanos", por: 1.1 },
      { nombre: "Juegos de cubiertos", por: 1.1 },
      { nombre: "Vasos", por: 1.5 },
      { nombre: "Jarros", cada: 8 },
    ],
  },
  {
    id: "civil",
    nombre: "Matrimonio civil",
    desc: "Una celebración íntima con almuerzo o cóctel y un brindis especial.",
    img: "img/kits/matrimonio-civil.jpg",
    items: [
      { nombre: "Mesas redondas (10 pers.)", cada: 10 },
      { nombre: "Sillas", por: 1 },
      { nombre: "Manteles redondos", cada: 10 },
      { nombre: "Servilletas de género", por: 1.1 },
      { nombre: "Platos llanos", por: 1.1 },
      { nombre: "Platos de postre", por: 1.1 },
      { nombre: "Juegos de cubiertos", por: 1.1 },
      { nombre: "Copas de vino", por: 1.1 },
      { nombre: "Copas de champaña", por: 1.1 },
      { nombre: "Mesas cóctel", cada: 15 },
    ],
  },
  {
    id: "religioso",
    nombre: "Matrimonio religioso",
    desc: "El montaje completo para una gran fiesta con cena de varios tiempos.",
    img: "img/kits/matrimonio-religioso.jpg",
    items: [
      { nombre: "Mesas redondas (10 pers.)", cada: 10 },
      { nombre: "Sillas Tiffany", por: 1 },
      { nombre: "Manteles redondos + cubremantel", cada: 10 },
      { nombre: "Caminos de mesa", cada: 10 },
      { nombre: "Servilletas de género", por: 1.1 },
      { nombre: "Platos de sitio", por: 1 },
      { nombre: "Platos de fondo", por: 1.1 },
      { nombre: "Platos llanos", por: 1.1 },
      { nombre: "Platos de postre", por: 1.1 },
      { nombre: "Juegos de cubiertos", por: 2.2 },
      { nombre: "Copas de agua", por: 1.1 },
      { nombre: "Copas de vino", por: 1.1 },
      { nombre: "Copas de champaña", por: 1.1 },
      { nombre: "Tazas y platillos", por: 1 },
      { nombre: "Mesas cóctel", cada: 12 },
    ],
  },
  {
    id: "institucional",
    nombre: "Evento institucional",
    desc: "Graduaciones, aniversarios y actividades de colegios, universidades y municipios.",
    img: "img/kits/evento-institucional.jpg",
    items: [
      { nombre: "Sillas", por: 1 },
      { nombre: "Mesas rectangulares (testera / buffet)", cada: 25 },
      { nombre: "Manteles rectangulares", cada: 25 },
      { nombre: "Mesas cóctel", cada: 10 },
      { nombre: "Copas de champaña", por: 1.1 },
      { nombre: "Vasos", por: 1.5 },
      { nombre: "Servilletas", por: 1.5 },
    ],
  },
];

/* ---------- GALERÍA DE CLIENTES INSTITUCIONALES ----------
   TODO cliente: reemplazar por los eventos reales y sus fotos.        */
const CLIENTES = [
  { cliente: "Municipalidad de Vitacura", evento: "Evento comunal", img: "img/clientes/vitacura.jpg" },
  { cliente: "Universidad [nombre]", evento: "Ceremonia de titulación", img: "img/clientes/universidad-1.jpg" },
  { cliente: "Colegio [nombre]", evento: "Aniversario del colegio", img: "img/clientes/colegio-1.jpg" },
  { cliente: "Universidad [nombre]", evento: "Cóctel institucional", img: "img/clientes/universidad-2.jpg" },
  { cliente: "Colegio [nombre]", evento: "Graduación de cuarto medio", img: "img/clientes/colegio-2.jpg" },
  { cliente: "Municipalidad [nombre]", evento: "Celebración masiva", img: "img/clientes/municipalidad-2.jpg" },
];
