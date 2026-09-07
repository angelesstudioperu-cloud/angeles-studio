# Handoff para Codex — Ángeles Nails Salon

Estado del árbol de trabajo: **todos los cambios están sin commitear**. `npm run qa`
(lint + typecheck + build) pasa limpio. Rama `main`, remoto `github`
(`angelesstudioperu-cloud/angeles-studio`).

---

## 1. Qué se hizo en esta sesión

### Identidad
- Logotipo reemplazado por el **par de alas simétricas** que envió el cliente, recreado como SVG
  vectorial (`public/brand/wings.svg`, componente `BrandWings` en `app/components/BrandLogo.tsx`).
- Regenerados con ese logo: `favicon.svg`, `brand/badge.svg`, `apple-touch-icon.png`,
  `icon-192.png`, `icon-512.png` y `og.png`.
- El logo es **provisional**: el cliente todavía no confirma si será el oficial.

### Contenido nuevo
- **15 fichas de servicio** en `app/servicios/[slug]/page.tsx` (ruta dinámica, `generateStaticParams`
  con los 15 slugs). Cada una: intro, «para quién es», «qué incluye», «cuidados después»,
  hueco de video, FAQ propia y servicios relacionados.
- Todo el copy y los datos por servicio viven en `app/content/services.ts`.
- Preselección del servicio: `/reservar?servicio=<slug>` — resuelto en servidor
  (`app/reservar/page.tsx` lee `searchParams` y lo pasa como prop a `BookingForm`).

### Portada
- **Carrusel** (`app/components/HeroCarousel.tsx`): 4 slides, auto-avance 6,5 s, pausa en hover/foco,
  flechas, puntos, teclado y respeto a `prefers-reduced-motion`.
- Eliminada la sección «Nuestro manifiesto» de la portada (se mantiene en `/nosotros`).
  Queda solo «Míranos trabajar».
- **Reserva movida arriba** (tercera sección) y rediseñada: fondo rosa, tarjeta blanca elevada,
  3 campos visibles + `<details>` opcional con fecha, horario, primera visita y retiro.
- Jerarquía de fondos: reserva rosa → bandas CTA `#344C3D` → **pie `#22332A`, el más oscuro**.
- `Reservar cita` de la cabecera pasó a píldora verde sólida con sombra.

### Mapa
- `app/components/LocationMap.tsx` embebe Google Maps con las coordenadas reales.
- **CSP modificado**: `frame-src 'none'` → `frame-src https://www.google.com`
  en `config/security-headers.ts` y `public/_headers`. No se abrió ningún otro origen.
  `X-Frame-Options: DENY` y `frame-ancestors 'none'` se mantienen intactos.

### Datos confirmados por el cliente (ya aplicados)
| Dato | Valor |
| --- | --- |
| Dirección | Calle Los Olivos 66 · Tienda 64, Urb. Rosario del Norte, Los Olivos |
| Horario | Lunes a sábado, 10:00 a.m. — 8:30 p.m. (domingos cerrado) |
| Correo | angelesstudioperu@gmail.com |
| WhatsApp | +51 947 117 905 |
| Equipo | Kiara Alvarado · Liliana Minaya (ambas manicuristas) |

Propagados a: `business.ts`, cinta de la portada, carrusel, perks de reserva, tarjeta de visita,
`/contacto`, pie y JSON-LD (`openingHoursSpecification` Mo–Sa 10:00–20:30).

### Imágenes
- 15 nuevas en `public/images/servicios/`, todas WebP y **bajo 100 KB**. `public/` pesa 1,5 MB.
- Origen y licencia en `docs/creditos-imagenes.md` (Pexels, uso comercial libre sin atribución).

---

## 2. Verificado

- Los **25 destinos internos** responden 200; no hay `href` vacíos ni botones sin acción.
- Recorrido probado en navegador: fila de precio → ficha de servicio → «Reservar este servicio»
  → formulario con el servicio ya seleccionado.
- Sin desbordamiento horizontal en `/`, `/servicios`, `/servicios/[slug]`, `/galeria`,
  `/nosotros`, `/contacto`, `/reservar` a 375 px.
- El iframe de Google Maps carga y muestra el pin en la ubicación correcta.

---

## 3. Lo que queda para ti, Codex

### 3.1 Desplegar (prioridad)
```bash
npm run qa && npm run cf:deploy
```
Después revisar en producción: el carrusel, el mapa (que el CSP nuevo no lo bloquee en el
Worker — `public/_headers` ya está actualizado) y las 15 rutas `/servicios/<slug>`.

### 3.2 Cosas que no pude hacer desde aquí
1. **GitHub App de Cloudflare.** No tengo acceso a la cuenta. Verificar en
   GitHub → Settings → Applications → Installed GitHub Apps si sigue «Cloudflare Workers and Pages»
   y desinstalarla si el despliegue manual es suficiente.
2. **Commit y push.** El cliente no autorizó commitear todavía; el árbol está limpio de errores
   pero sin commit.
3. **R2.** Sigue sin activar (requiere suscripción de consumo). El sitio no lo necesita hoy.
4. **`SITE_LAUNCH_READY`** sigue en `false` — el sitio no se indexa. Cambiar a `true` recién
   cuando entren las fotos reales y se decida sobre el libro de reclamaciones.

### 3.3 Pendientes de negocio (bloqueados por el cliente)
- **Razón social y RUC.** Sin esto `/libro-de-reclamaciones` no publica formulario, solo deriva a
  WhatsApp y correo. Es obligación legal en Perú antes de operar de cara al público.
- **Fotos y videos propios.** Todo el material es stock. Los huecos de video ya están maquetados en
  las 15 fichas (`.video-slot`); solo hay que reemplazar el bloque por `<video>` o un embed.
- **Retratos del equipo.** Decisión tomada: en vez de poner la cara de una desconocida como si fuera
  Kiara o Liliana, las tarjetas usan una foto de trabajo en cabina (sin rostro) más un badge con
  las iniciales. Cambiar en `app/content/team.ts` cuando lleguen los retratos reales.
- **Duraciones.** Las de `services.ts` son estimaciones y se muestran siempre como «aprox.».

### 3.4 Detalle a confirmar con el cliente
La dirección llegó como «Tienda número 64, Los Olivos 66» y se interpretó como
**Calle Los Olivos 66, tienda 64**. Si el orden es al revés, es un cambio de una línea en
`app/content/business.ts` (`address.street` / `address.unit`).

---

## 4. Mapa de archivos tocados

**Nuevos**
```
app/components/HeroCarousel.tsx
app/components/LocationMap.tsx
app/servicios/[slug]/page.tsx
public/brand/wings.svg
public/images/servicios/*.webp   (15 archivos)
docs/handoff-codex.md
```

**Modificados**
```
app/content/business.ts      datos reales del negocio
app/content/services.ts      copy largo, media y FAQ de los 15 servicios
app/content/team.ts          nombres reales + foto de trabajo
app/page.tsx                 carrusel, reserva arriba, mapa, sin manifiesto
app/layout.tsx               JSON-LD con horario y dirección completos
app/components/BrandLogo.tsx BrandWings (par de alas)
app/components/BookingForm.tsx  3 campos + extras plegables + preselección
app/components/PriceTable.tsx   filas como enlaces a las fichas
app/components/ServiceExplorer.tsx  tarjetas enlazadas
app/components/SiteFooter.tsx   horario y correo
app/components/MotionEffects.tsx  salto a anclas tras montar
app/components/PageHero.tsx     emblema nuevo
app/{contacto,nosotros,reservar}/page.tsx
app/globals.css              ~340 líneas nuevas
app/sitemap.ts               incluye las 15 fichas
config/security-headers.ts   frame-src para Google Maps
public/_headers              mismo CSP
README.md, docs/creditos-imagenes.md
```


---

## 5. Segunda tanda (rediseño de portada)

- **Logo retrazado** con más fidelidad al PNG del cliente (plumas que nacen finas en la punta y
  ensanchan hacia la base). Sigue siendo una aproximación hecha a mano: si el cliente deja el
  archivo en `public/brand/`, conviene usarlo tal cual en lugar del SVG.
- Portada reducida a: carrusel → datos clave → carta → reserva → videos → galería → redes → mapa.
- **Eliminado**: «Tu match Ángeles» y el explorador (`ServiceExplorer.tsx` borrado, fusionado en
  `ServiceMenu.tsx`), las FAQ de la portada, «La experiencia Ángeles» y los textos largos del feed.
- **Carrusel**: sin flechas ni puntos, se cambia arrastrando; línea de avance que no revela cuántos
  slides hay. Sin texto encima de la foto.
- **`ServiceMenu.tsx`**: carta única con foto por servicio, pestañas por categoría y enlace directo
  a cada ficha. Resuelve que las subpáginas no se encontraban desde la portada.
- **`VideoShowcase.tsx`**: tres huecos de video en la portada, además de los 15 de las fichas.
- **Móvil**: pase completo — orden invertido en el hero (foto primero), rejillas de dos columnas,
  campos de 54 px, botones a ancho completo, más aire vertical. La portada pasó de 9.958 px a
  7.242 px de alto en 390 px.
