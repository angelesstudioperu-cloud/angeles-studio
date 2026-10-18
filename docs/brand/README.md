# Fuentes de marca

## Identidad vigente — 18 de octubre de 2026

El lockup aprobado es **ANGELES STUDIO**, con **Nails Salon** debajo y dos líneas
laterales. Sin tildes en la marca. La cabecera lo representa en `BrandLogo.tsx`;
`public/brand/angeles-lockup.svg` es la versión vectorial reutilizable.
La tarjeta para compartir enlaces está en `public/brand/angeles-social-card.png`
(1200 × 630), con su original SVG al lado. Para regenerarla:

```bash
node scripts/render-brand-assets.mjs
```

Por indicación del negocio, el logo del sitio combina esas letras con las alas
originales. Se conservan la imagen de las alas y su animación al volver al inicio,
sin cambios de geometría ni de movimiento. El SVG reutilizable conserva la
versión tipográfica. Paleta: verde oscuro, rosa y crema; amarillo como acento floral.

## Archivo histórico del emblema

- `angeles-wings-original.png` — archivo original del logo tal como lo entregó el salón.
  Vive fuera de `public/` para no desplegar 500 KB que nadie descarga.
- El que sí usa el sitio es `public/brand/angeles-wings.png` (760×540, 36 KB): el mismo
  recorte, reescalado y recomprimido.

Para regenerarlo:

```bash
node -e "import('sharp').then(({default:s})=>s('docs/brand/angeles-wings-original.png').trim().resize({width:760}).png({compressionLevel:9,palette:true}).toFile('public/brand/angeles-wings.png'))"
```

Rosa oficial muestreado del archivo: **#C07278** (`--brand-pink` en `globals.css`).
