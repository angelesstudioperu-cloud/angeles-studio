# Ángeles Nails Salon — web

Sitio público de Ángeles Nails Salon (Los Olivos, Lima), preparado para Cloudflare Workers con D1 y R2.

`SITE_LAUNCH_READY` sigue en `false`: permite revisión pública sin indexar mientras el salón
sube sus fotos reales y define su razón social.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: carrusel (solo swipe), franja de datos clave, carta con foto por servicio, **reserva**, videos, galería, redes y mapa real. Sin descripciones largas: viven en las fichas. |
| `/servicios` | Lista de precios completa por categoría (manos, pies, mirada y cejas) y tabla de retiros. |
| `/servicios/[slug]` | Ficha de cada uno de los 15 servicios: para quién es, qué incluye, cuidados, hueco para video, FAQ y servicios relacionados. |
| `/galeria` | Galería de trabajos. |
| `/nosotros` | Manifiesto, forma de trabajo y el studio por dentro. |
| `/contacto` | Dirección, canales y enlace a Google Maps. |
| `/reservar` | Cómo funciona la reserva + formulario que abre WhatsApp. |
| `/privacidad`, `/terminos`, `/libro-de-reclamaciones` | Legales (preliminares). |

## Datos del negocio

Viven en `app/content/business.ts`, `app/content/services.ts` y `app/content/team.ts`.
Los precios salen de la lista oficial del salón.

Confirmado: nombre, WhatsApp `+51 947 117 905`, correo `angelesstudioperu@gmail.com`,
dirección (Calle Los Olivos 66, tienda 64), horario `lunes a sábado · 10:00 a.m. — 8:30 p.m.`
con cita previa, equipo (Kiara Alvarado y Liliana Minaya) y redes.

Lo marcado como `pending` sigue sin confirmar:

- **razón social y RUC** — el negocio aún no está constituido, así que el libro de
  reclamaciones no publica formulario;
- **fotos y videos propios** — el sitio usa stock con licencia libre y las fichas de servicio
  tienen el hueco de video listo;
- **duraciones reales**: las de `services.ts` son estimaciones y se muestran siempre como «aprox.».

## Identidad

- Logotipo: par de alas simétricas (tres plumas por lado) + lettering `Angeles / Nails Salon`
  (`app/components/BrandLogo.tsx`). Provisional, a la espera de que el salón confirme el oficial.
  El lettering usa **Jost 300**, la geométrica libre más cercana al Century Gothic del logo original.
- Ícono de marca y favicon: `public/brand/wing.svg`, `public/favicon.svg`, `public/brand/badge.svg`.
- Íconos derivados: `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`, `og.png`.
- Paleta: mist `#F4F3F1`, peony `#F2D1D4`, mauve `#D8959B`, sage `#829672`, evergreen `#344C3D`.
- Jerarquía de fondos oscuros: reserva (rosa) → explorador y bandas CTA `#344C3D` → pie `#22332A`,
  el bloque más oscuro de la página.

## Mapa

`app/components/LocationMap.tsx` embebe Google Maps con las coordenadas reales del salón. El CSP
abre `frame-src` únicamente para `https://www.google.com`; no hay otros orígenes permitidos.

## Imágenes

Todas en WebP y por debajo de 100 KB. Origen y licencia en `docs/creditos-imagenes.md`.
Son de stock con licencia libre y **se reemplazan por fotos reales del salón antes de publicar**.

## Documentación

`docs/architecture.md` cubre la frontera con Bancary, el modelo multi-sucursal y las fases de
Cloudflare Paid.
