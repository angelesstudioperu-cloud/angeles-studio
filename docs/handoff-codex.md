# Handoff para Codex — Ángeles Nails Salon

Última actualización: commit `da0157b`, versión desplegada `783e28a0`.
`npm run qa` (lint + typecheck + build) pasa limpio. Rama `main`, remoto `github`.

Cubre lo trabajado desde tu commit `2f8a1a5` («Reparar navegacion y alinear subtitulo del
logo») y, sobre todo, **lo que te toca a ti**.

---

## 1. Lo hecho desde tu último commit

| Commit | Qué entró |
| --- | --- |
| `95d208d` | Portada de escritorio a foto a sangre, CTA de cabecera con aire, catálogo sin «desde», copy de acompañamiento solo en PC, reserva con más cuerpo, pie de móvil compactado. |
| `2672010` / `ce4219c` | Precios exactamente como la lista oficial; se eliminó el mecanismo de precio tachado. |
| `da0157b` | El studio rehecho, galería ampliable, reserva con el formulario primero y densidad móvil en las cuatro subpáginas. |

### Detalles que conviene conocer antes de tocar nada

- **Apilado del hero en PC.** `.hero-carousel` usa `grid-template-areas:'stack'`: foto, velo
  (`::after`) y texto comparten celda. `.hero-photo` arrastra `align-self:center` de la maqueta
  original, así que **necesita `align-self:stretch`**; sin eso la celda colapsa a 0 y la banda
  se ve vacía. Lo mismo aplica en móvil, donde el marco quedaba en una tira vertical.
- **Puente catálogo → formulario.** `app/components/bookingBridge.ts` define el evento
  `angeles:select-service`. `ServiceMenu` lo emite al tocar un precio y `BookingForm` lo escucha,
  preselecciona y destella 2,2 s. Sin JS, el `href` lleva a `/reservar?servicio=<slug>`.
  Respeta tu cambio a `NativeLink`: el clic se intercepta antes de navegar.
- **`GalleryGrid`** es cliente: cada foto abre una vista ampliada, con cierre por Escape y
  navegación con flechas. Bloquea el scroll del body mientras está abierta.
- **CSP.** `frame-src` abierto solo a `https://www.google.com` para el mapa. `X-Frame-Options:
  DENY` y `frame-ancestors 'none'` intactos.
- **`globals.css` crece por capas** (`v3` … `v12`) al final del archivo. Hay reglas muertas de
  la paleta antigua (`.consent`, `.booking-perks`, `.finder`, `.looks-image`, `.booking-steps`)
  que no borré porque comparten líneas con selectores vivos. Si limpias, hazlo con el sitio
  delante.

---

## 2. Lo que te toca a ti

### 2.1 Libro de reclamaciones — bloqueante legal

Sigue sin formulario porque el negocio **no tiene razón social ni RUC**.
`/libro-de-reclamaciones` deriva a WhatsApp y correo y lo explica. Es obligación legal antes de
operar de cara al público: hay que empujar al cliente a constituirse o registrar el libro físico.

### 2.2 `SITE_LAUNCH_READY`

Sigue en `false`, así que el sitio **no se indexa**. Pásalo a `true` recién cuando entren las
fotos reales y se resuelva 2.1.

### 2.3 Credenciales de Cloudflare

Hubo un despliegue fallido porque wrangler quedó logueado con `canodent741@gmail.com` mientras
el proyecto apunta a la cuenta `43f8d75b…`. Ahora está con `angelesstudioperu@gmail.com`.
Conviene fijar un token de la cuenta correcta en vez de depender del login interactivo.

### 2.4 GitHub App de Cloudflare

Pendiente desde hace tres handoffs: revisar en GitHub → Settings → Applications si sigue
instalada «Cloudflare Workers and Pages» y desinstalarla, ya que el despliegue es manual.

### 2.5 Limpieza de CSS muerto (opcional, baja prioridad)

Ver el punto de `globals.css` arriba. No es urgente: son reglas que no renderizan.

---

## 3. Pendientes del cliente

- **Videos.** Hay seis huecos maquetados esperando material: dos en `/nosotros`
  (`.video-frame`: el del salón y el recorrido), tres en la portada (`VideoShowcase`) y uno por
  ficha de servicio (`.video-slot`). Cada uno se reemplaza por `<video>` con `poster`.
- **Fotos propias.** Todo el material es stock con licencia libre (`docs/creditos-imagenes.md`),
  incluidas las tres fotos escalonadas del salón en `/nosotros`.
- **Retratos del equipo.** Kiara Alvarado y Liliana Minaya salen con una foto de trabajo sin
  rostro más un badge de iniciales, a propósito: no se puso la cara de una desconocida como si
  fuera del equipo. Cambiar en `app/content/team.ts`.
- **Duraciones reales.** Las de `services.ts` son estimaciones y se muestran como «aprox.».
- **Promoción.** Se descartó el precio tachado. Si vuelven a quererlo, hace falta el precio de
  lista **efectivamente vigente** y un periodo con fecha de inicio y fin; sin eso es publicidad
  engañosa ante INDECOPI.

---

## 4. Verificado en esta tanda

- Las 7 rutas responden 200 en producción.
- `/nosotros` quedó en tres secciones: `experience-intro`, `tour`, `team`. Manifiesto, pilares,
  tira de detalle, prueba social y banda CTA salieron del DOM (verificado en producción).
- `/servicios` sin numeración en las tarjetas y con el hero nuevo.
- Galería: vista ampliada probada (abre, muestra la foto correcta, cierra).
- `/reservar`: el formulario aparece antes que el encabezado; la página bajó a 1.641 px de alto
  en 390 px.
- Sin desbordamiento horizontal a 390 px en ninguna subpágina.
