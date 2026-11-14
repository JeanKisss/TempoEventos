# Fotografías del sitio

**Solo fotos propias del cliente, de eventos reales.** No usar imágenes de internet ni de bancos de imágenes.

Mientras falte una foto, el sitio muestra un recuadro amarillo con el nombre del archivo esperado.

## Estructura

```
img/
├─ hero/evento-panoramico.jpg      ← foto panorámica principal (mín. 2400 px de ancho, horizontal)
├─ logos/
│  ├─ tempo-arriendos.svg, tempo-eventos.svg   ← logos vectorizados en SVG (listos)
│  ├─ logo-actual.png (o .svg)     ← logo vigente del encabezado
│  ├─ logo-2006.png, logo-2012.png, logo-2018.png   ← evolución de logos (en .png o .svg)
│  └─ favicon.png                  ← 512×512
├─ catalogo/*.jpg                  ← un archivo por producto (nombres en js/data.js, incluye lounge: puff, mesa-centro, banqueta, piso-alto)
├─ kits/*.jpg                      ← asado, matrimonio-civil, matrimonio-religioso, evento-institucional
└─ clientes/*.jpg                  ← eventos para universidades, colegios, municipios
```

## Calidad (para que el zoom se vea nítido)

| Uso | Ancho recomendado | Formato |
|---|---|---|
| Hero | 2400–3200 px | JPG calidad 85–90 o WebP calidad 90 |
| Catálogo / kits / clientes | 1200–1600 px | JPG calidad 85 o WebP |
| Zoom en alta resolución (opcional) | 2400 px | agregar `full: "img/.../archivo-hd.jpg"` en `js/data.js` |
| Logos e íconos | Vectorial (sin límite) | **SVG** (no se pixela al hacer zoom) |

> **Nota sobre SVG y fotos reales:** El formato **SVG** es ideal para **logos e íconos** porque es vectorial y nunca pierde calidad. Para **fotografías reales de eventos**, conviene usar **WebP** o **JPG** en alta resolución (1200–2400 px), ya que convertir una foto real a SVG suele pesar mucho o perder detalle fotográfico. Si decides guardar alguna imagen en `.webp` o `.svg`, solo actualiza la extensión en `js/data.js`, `index.html` o `nosotros.html`.

Evitar comprimir de más o exportar desde WhatsApp (reduce la resolución).
Si se cambian nombres o extensiones (p. ej. a `.webp`), actualizar las rutas en `js/data.js` e `index.html`.
