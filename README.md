# Ángeles Studio web

Sitio público de lujo editorial para Ángeles Studio, preparado para Cloudflare Workers con D1 y R2.

La oferta inicial se limita a uñas, lifting y pestañas. `SITE_LAUNCH_READY` permanece en `false` para permitir revisión pública sin indexar todavía los datos provisionales.

## Estado

- La identidad, los textos, el teléfono, la dirección, el equipo, los precios y los correos son provisionales.
- La reserva abre WhatsApp como fallback y no guarda datos en el servidor.
- La arquitectura de integración con Bancary está definida, pero se activará solo con el contrato y los secretos reales.
- La versión antigua de Firebase se conserva en la rama `legacy-firebase-2026-08-23` del repositorio.

## Documentación

Consulta `docs/architecture.md` para la frontera con Bancary, el modelo multi-sucursal y las fases de Cloudflare Paid.
