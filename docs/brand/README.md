# Fuentes de marca

- `angeles-wings-original.png` — archivo original del logo tal como lo entregó el salón.
  Vive fuera de `public/` para no desplegar 500 KB que nadie descarga.
- El que sí usa el sitio es `public/brand/angeles-wings.png` (760×540, 36 KB): el mismo
  recorte, reescalado y recomprimido.

Para regenerarlo:

```bash
node -e "import('sharp').then(({default:s})=>s('docs/brand/angeles-wings-original.png').trim().resize({width:760}).png({compressionLevel:9,palette:true}).toFile('public/brand/angeles-wings.png'))"
```

Rosa oficial muestreado del archivo: **#C07278** (`--brand-pink` en `globals.css`).
