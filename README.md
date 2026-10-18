# Angeles Studio — web

Sitio de Angeles Studio · Nails Salon (Los Olivos, Lima), preparado para Cloudflare Workers.

Estado vigente y pasos de lanzamiento: [informe del 18 de octubre de 2026](docs/cierre-lanzamiento-2026-10-18.md).

`SITE_LAUNCH_READY=true` habilita la indexación de la web comercial, autorizada el 18/10/2026.
El Libro de Reclamaciones sigue sin habilitarse, no se indexa ni se incluye en el sitemap:
faltan identidad del proveedor y procedimiento formal de atención.
Las fotos stock pueden mantenerse como inspiración, claramente identificadas. Los videos pendientes están ocultos.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: carrusel con controles y pausa, datos clave, catálogo, reserva, inspiración, redes y mapa bajo solicitud. |
| `/servicios` | Lista de precios completa por categoría (manos, pies, mirada y cejas) y tabla de retiros. |
| `/servicios/[slug]` | Ficha de cada uno de los 15 servicios: para quién es, qué incluye, cuidados, FAQ y servicios relacionados. Sin huecos de video. |
| `/galeria` | Galería de inspiración referencial con ampliación. |
| `/nosotros` | Forma de trabajo y equipo con iniciales; sin interiores ficticios. |
| `/contacto` | Dirección, canales y enlace a Google Maps. |
| `/reservar` | Cómo funciona la reserva + formulario que abre WhatsApp. |
| `/privacidad`, `/terminos`, `/libro-de-reclamaciones` | Legales (preliminares). |

## Datos del negocio

Viven en `app/content/business.ts`, `app/content/services.ts` y `app/content/team.ts`.
Los precios salen de la lista oficial del salón.

Confirmado: nombre, WhatsApp `+51 947 117 905`, correo `angelesstudioperu@gmail.com`,
horario `lunes a sábado · 10:00 a.m. — 8:30 p.m.`
con cita previa, equipo (Kiara Alvarado y Liliana Minaya) y redes.

Lo marcado como `pending` sigue sin confirmar:

- **identidad del proveedor y RUC** — el negocio confirmó que aún no tiene RUC; se mantiene sin especificar. El libro de reclamaciones aún no tiene su procedimiento terminado;
- **dirección** — Calle Los Olivos, primer piso, Los Olivos. No se publica numeración de puerta sin confirmar. Punto inferior corregido según la indicación del negocio;
- **fotos y videos propios** — stock con licencia documentada, identificado como referencial; no se publican espacios pendientes de video;
- **duraciones**: el negocio confirmó usar los datos del proyecto; se muestran como «aprox.» porque no constituyen una duración garantizada.

## Identidad

- Logotipo principal aprobado: `ANGELES STUDIO` serif y `Nails Salon` debajo, entre líneas (`app/components/BrandLogo.tsx` y `public/brand/angeles-lockup.svg`). Sin tildes en la marca. Alas como recurso secundario.
- Ícono de marca y favicon: `public/brand/wing.svg`, `public/favicon.svg`, `public/brand/badge.svg`.
- Íconos derivados: `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`. Tarjeta social vigente: `public/brand/angeles-social-card.png`.
- Paleta: mist `#F4F3F1`, peony `#F2D1D4`, mauve `#D8959B`, sage `#829672`, evergreen `#344C3D`.
- Jerarquía de fondos oscuros: reserva (rosa) → explorador y bandas CTA `#344C3D` → pie `#22332A`,
  el bloque más oscuro de la página.

## Mapa

`app/components/LocationMap.tsx` carga Google Maps solo tras pulsar el botón, con las coordenadas conservadas del proyecto (pendientes de reconfirmación). El CSP
abre `frame-src` únicamente para `https://www.google.com`; no hay otros orígenes permitidos.

## Imágenes

Todas en WebP y por debajo de 100 KB. Origen y licencia en `docs/creditos-imagenes.md`.
Son de stock con licencia de uso comercial documentada; se muestran como inspiración y se reemplazarán por fotos propias cuando estén disponibles.

## Documentación

`docs/architecture.md` cubre la frontera con Bancary, el modelo multi-sucursal y las fases de
Cloudflare Paid.
