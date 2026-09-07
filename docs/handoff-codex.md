# Handoff para Codex — Ángeles Nails Salon

Última actualización: commit `81cb82f`, versión desplegada `abe74cac`.
`npm run qa` (lint + typecheck + build) pasa limpio. Rama `main`, remoto `github`.

Este documento reemplaza al anterior. Cubre lo avanzado desde tu último despliegue
(`a0c6b46`, «Use official Angeles Studio wing logo») y, sobre todo, **lo que te toca a ti**.

---

## 1. Lo que ya está hecho y desplegado

Cinco tandas de trabajo, todas en producción:

| Commit | Qué entró |
| --- | --- |
| `0aee04f` | Rediseño de portada alrededor de la foto: carrusel, catálogo con foto por servicio, reserva, videos, galería. Se borró `ServiceExplorer`. |
| `4e8ae65` | Cabecera nueva (marca centrada en móvil + navegación de cuatro), lettering en el rosa del logo, pase de densidad móvil. |
| `bd6a441` | Botones con relieve, logos de Instagram/TikTok, precios como píldora, encabezados en barra. |
| `7ddc9cd` | Adelanto de S/ 10, formulario sin plegable ni consentimiento. |
| `81cb82f` | Reserva desde el precio, «Catálogo», formulario minimalista, Visítanos compacto. |

Detalles que conviene que conozcas antes de tocar nada:

- **Puente catálogo → formulario.** `app/components/bookingBridge.ts` define el evento
  `angeles:select-service`. `ServiceMenu` lo emite al tocar un precio y `BookingForm` lo
  escucha, preselecciona el servicio y lo destella 2,2 s. Sin JS, el `href` del precio lleva
  a `/reservar?servicio=<slug>`, que la página resuelve en servidor.
- **CSP.** `config/security-headers.ts` y `public/_headers` abren `frame-src` solo a
  `https://www.google.com`, para el mapa. `X-Frame-Options: DENY` y `frame-ancestors 'none'`
  siguen intactos. Si tocas headers, no lo pierdas.
- **`globals.css` crece por capas.** Cada tanda añadió un bloque comentado al final
  (`v3` … `v9`). Hay reglas muertas de la paleta antigua (`.consent`, `.booking-perks`,
  `.finder`, `.looks-image`) que no borré porque comparten líneas con selectores vivos.
  Si lo limpias, hazlo con el sitio corriendo delante.
- **Precios.** `priceFrom` es el precio promocional vigente y `priceRegular` el de lista.
  El tachado solo aparece si `priceRegular > priceFrom`.

---

## 2. Lo que te toca a ti

### 2.1 Bloqueante legal — promoción con precio tachado

El salón decidió **subir la lista** en los servicios caros y correr una promoción real
sobre ella (polygel/rubber/builder/soft gel S/ 75 → 50; acrílicas S/ 80 → 50;
acripie S/ 85 → 60).

Para que el tachado se sostenga ante INDECOPI falta lo que yo no puedo decidir:

1. Que esa lista esté **efectivamente vigente** (cartel del local, lista de WhatsApp, redes).
2. Una **fecha de inicio y fin** de la promoción, visible en la web.

Hoy `services.ts` no tiene fechas. Si el salón confirma el periodo, conviene añadir
`promoFrom` / `promoTo` y mostrarlo junto al precio; si no lo confirma, hay que quitar
`priceRegular` de los seis servicios y el tachado desaparece solo.

### 2.2 Libro de reclamaciones

Sigue sin formulario porque el negocio **no tiene razón social ni RUC**. `/libro-de-reclamaciones`
deriva a WhatsApp y correo, y lo explica. Es obligación legal antes de operar de cara al
público: hay que empujar al cliente a constituirse o registrar el libro físico.

### 2.3 `SITE_LAUNCH_READY`

Sigue en `false`, así que el sitio **no se indexa**. Pásalo a `true` recién cuando entren
las fotos reales y se resuelva 2.1 y 2.2.

### 2.4 Credenciales de Cloudflare

Hubo un despliegue fallido porque wrangler quedó logueado con `canodent741@gmail.com`
mientras el proyecto apunta a la cuenta `43f8d75b…` de Ángeles Studio. Ahora está con
`angelesstudioperu@gmail.com` y funciona. Conviene fijar un token de la cuenta correcta en
vez de depender del login interactivo, para que no se vuelva a cruzar.

### 2.5 GitHub App de Cloudflare

Quedó pendiente de tu handoff anterior: revisar en GitHub → Settings → Applications si
sigue instalada «Cloudflare Workers and Pages» y desinstalarla, ya que el despliegue es
manual con `npm run cf:deploy`.

---

## 3. Pendientes del cliente (no son tuyos, pero condicionan el lanzamiento)

- **Fotos y videos propios.** Todo el material visual es stock con licencia libre
  (`docs/creditos-imagenes.md`). Los huecos de video están maquetados: tres en la portada
  (`VideoShowcase`) y uno por ficha (`.video-slot`). Se reemplaza el bloque por `<video>`.
- **Retratos del equipo.** Kiara Alvarado y Liliana Minaya aparecen con una foto de trabajo
  sin rostro más un badge de iniciales, a propósito: no quise poner la cara de una
  desconocida como si fuera parte del equipo. Cambiar en `app/content/team.ts`.
- **Duraciones reales.** Las de `services.ts` son estimaciones y se muestran como «aprox.».
- **Periodo de la promoción**, ver 2.1.

---

## 4. Verificado en esta tanda

- Los 15 servicios de la lista de precios coinciden **exacto** con `services.ts`: mismos
  nombres, mismos montos, ninguno de más ni de menos (auditado por script contra la imagen).
- Recorrido probado: precio del catálogo → el formulario baja, preselecciona y destella.
- Todas las rutas responden 200 en producción, incluida `/reservar?servicio=acripie`.
- Sin desbordamiento horizontal a 390 px.
