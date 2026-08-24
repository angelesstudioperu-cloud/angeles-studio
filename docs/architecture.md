# Ángeles Studio — arquitectura inicial

## Objetivo

La web debe iniciar con una sola sede y poco tráfico sin convertirse en una base desechable. Toda entidad pública que dependa de un local incluye `branch_id` desde el primer día, aunque la interfaz oculte el selector mientras exista una sola sede.

La web no reemplaza Bancary. Su misión es presentar la marca especializada en uñas, lifting y pestañas, explicar cada técnica, mostrar resultados, captar una solicitud de cita y entregar esa solicitud de forma segura al sistema operativo.

## Oferta actual y límites editoriales

La primera versión comunica únicamente tres familias: uñas, lifting y extensiones de pestañas. Peluquería, maquillaje, novias, depilación, faciales y masajes quedan fuera del catálogo, de la navegación y de las palabras clave hasta que el negocio confirme su incorporación.

- El catálogo se define una sola vez y alimenta portada, explorador y formulario para evitar nombres o precios contradictorios.
- Los complementos, como nail art, dependen de un servicio principal y no se reservan como citas aisladas.
- Las imágenes de resultados requieren consentimiento específico y revocable; aceptar el formulario de reserva no autoriza su publicación.
- La comunicación evita promesas médicas. Ante irritación, infección o lesión visible, el servicio se pausa y se deriva a evaluación profesional.
- Los servicios que lo requieran registran la aceptación y el resultado operativo de una prueba de parche en Bancary; la web conserva solo la confirmación mínima necesaria.
- Cada imagen publicada debe tener texto alternativo, punto focal y una variante WebP o AVIF optimizada antes de llegar a R2.

## Frontera de responsabilidades

| Ángeles Studio web | Bancary |
|---|---|
| Sedes y datos públicos | Clientes y su historial |
| Catálogo y precios publicados | Agenda confirmada y disponibilidad operativa |
| Portafolio, equipo visible y promociones | Fórmulas de color y fichas de servicio |
| Contenido, SEO y medios | Caja, pagos, adelantos e inventario |
| Solicitud de cita e idempotencia | Confirmación, reprogramación y cancelación |
| Estado mínimo de integración | Personal, horarios, asistencia y comisiones |

Una solicitud enviada por la web nunca se presenta como una cita confirmada. La confirmación proviene de Bancary o del equipo del salón.

## Arquitectura Cloudflare Paid

```text
Navegador
   │
   ├─ contenido estático ──> CDN / Cache / R2
   │
   └─ solicitud de cita ──> Worker
                              ├─ Turnstile + validación
                              ├─ BookingProtection Durable Object
                              │    ├─ rate limit por hash
                              │    └─ idempotencia / doble envío
                              ├─ D1: solicitud + outbox
                              └─ Queue: entrega asíncrona
                                      └─ Bancary API
                                           └─ webhook firmado → Worker → D1
```

### Componentes

- **Cloudflare Worker + Vinext:** presentación SSR/estática y endpoints pequeños. La lógica de negocio queda aislada para permitir migrar a OpenNext, siguiendo Canodent, si Vinext beta muestra una incompatibilidad.
- **D1:** contenido estructurado del sitio, metadatos de R2, solicitudes y estado de integración. No almacena caja, inventario ni historiales operativos.
- **R2:** fotografías, video, previews y activos de portafolio. D1 guarda su metadata, estado, texto alternativo y punto focal.
- **Durable Object `BookingProtection`:** aplica límite de solicitudes e idempotencia antes de escribir. Debe reutilizar el patrón probado de Canodent, sin persistir IP; solo un HMAC.
- **Turnstile:** validación server-side y fallo cerrado. Se activa cuando el formulario deje de ser el fallback provisional de WhatsApp.
- **Queues:** entrega asíncrona a Bancary, reintentos con backoff y cola de mensajes fallidos. El mensaje contiene un ID de solicitud, no PII completa.
- **WAF, Cache Rules y Rate Limiting:** protección de rutas, assets con caché larga e HTML con revalidación controlada.
- **Cloudflare Web Analytics:** opción preferida sin cookies. No se activa Clarity ni analítica de sesión sin consentimiento explícito.

## Contrato propuesto con Bancary

```http
GET  /v1/public/services?branch_id={id}
GET  /v1/public/availability?branch_id={id}&service_id={id}&from={date}&to={date}&timezone=America/Lima
POST /v1/appointment-requests
GET  /v1/appointment-requests/{id}
POST /v1/webhooks/appointment-request-updated
```

Reglas:

1. Autenticación servicio-a-servicio con secreto de Worker y firma HMAC para webhooks.
2. `Idempotency-Key` obligatorio en la creación.
3. Timeout corto y reintentos asíncronos; nunca bloquear el navegador esperando a Bancary.
4. `branch_id` obligatorio aunque solo exista Miraflores.
5. El precio se resuelve en servidor desde `branch_services`; el navegador no lo decide.
6. Bancary necesita evolucionar de propietario único a `empresa_id` + `sede_id` antes de operar una segunda sede sin duplicar clientas.

## Modelo de datos

```text
branches 1──N branch_services N──1 services N──1 service_categories
    │                 │
    │                 └──N appointment_requests 1──N integration_outbox
    │
    ├──N branch_team_members N──1 team_members
    ├──N media_assets
    ├──N portfolio_items N──1 media_assets
    └──N promotions
```

La definición ejecutable vive en `db/schema.ts`. Decisiones principales:

- IDs de texto generados por la aplicación para no depender de secuencias globales.
- Dinero en céntimos enteros (`price_from_cents`, `quoted_price_cents`).
- Rangos con mínimo y máximo opcional; los complementos usan `is_add_on` y `parent_service_id`.
- FK compuesta `(branch_id, service_id)` impide solicitar en una sede un servicio no publicado por ella.
- Unicidad de `(branch_id, idempotency_key)` impide duplicados.
- Medios con `alt_text` obligatorio y bytes en R2.
- Portafolio filtrable mediante etiquetas de técnica, forma, largo, acabado u ocasión.
- `purge_after` obligatorio permite retención y eliminación programada de PII.
- Borrado de sedes operativas por estado (`closed`), no destrucción física de historial.

## Rutas

### MVP

- `/`: portada editorial, servicios, experiencia, equipo, sede, preguntas y reserva.
- `/privacidad`, `/terminos`, `/libro-de-reclamaciones`.
- Metadata social, `robots.txt` y `sitemap.xml`.

### Siguiente fase

- `/servicios` y `/servicios/[slug]`.
- `/galeria` con paginación por cursor.
- `/sedes` y `/[branch]/...` cuando exista la segunda sede.
- `/reservar/[id]` para consultar una solicitud sin exponer PII.
- `/diario` como capa editorial de SEO.

### Fuera de alcance de la web

No se construyen panel de agenda, CRM, POS, inventario, pagos, nómina, comisiones ni un segundo administrador. El contenido podrá gestionarse por una pequeña interfaz protegida con Cloudflare Access cuando los datos reales estén listos.

## Evolución sin sobrearquitectura

1. **Ahora:** página pública completa especializada en uñas, lifting y pestañas; datos provisionales, D1/R2 declarados y esquema versionado.
2. **Antes de activar reservas:** endpoint Worker, Turnstile, Durable Object, política de privacidad definitiva y contrato Bancary.
3. **Con segunda sede:** selector de sede, URLs por sucursal, caches por host/slug y Bancary multi-sede.
4. **Con alto volumen:** Queue obligatoria, DLQ, panel de salud de integración, Cache Rules y optimización de imágenes derivadas.

## Decisiones tomadas de proyectos anteriores

- **Canodent:** despliegue Worker, falla cerrada por entorno, protección con Durable Object, cabeceras centralizadas y pruebas en `workerd`.
- **Bancary:** fuente operativa de agenda y clientes; no se copian Supabase, RLS por usuario ni sus módulos administrativos.
- **Gnomos:** sede como entidad de primer nivel, paginación por cursor y migraciones versionadas.
- **Ángeles Studio antiguo:** se conserva el inventario de funciones y contenido, pero no Firebase, scripts inline, login en cliente ni panel público.
- **Vibe:** no se encontró una copia local auditable; no se atribuyó ningún patrón a ese proyecto.
