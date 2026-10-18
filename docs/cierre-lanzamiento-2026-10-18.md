# Angeles Studio · estado y lanzamiento

Fecha de revisión: 18 de octubre de 2026. Este es el informe vigente; sustituye los
pendientes históricos de `handoff-codex.md`. No contiene credenciales.

## Actualización vigente: dominio elegido, Google y plantillas

- Web publicada y verificada con el lettering rosa definitivo y el subtítulo
  centrado: versión Cloudflare `ff9f6675-15cb-45c4-a941-0a08ce9bb0fd`.
  Las alas originales y sus fotogramas no se modificaron. Pasaron nuevamente
  `npm run qa` (lint, tipos, 4/4 pruebas y build), `cf:prepare` y `git diff --check`.
  Se conservan los avisos conocidos de compilación; no se declara auditoría integral.
- Search Console: propiedad de prefijo URL del Worker verificada mediante etiqueta
  HTML pública. Prueba en directo: «La URL está disponible para Google» y la
  página se puede indexar. La solicitud manual de indexación devolvió «Cuota
  superada»; no se reintentará el mismo día ni se declara indexación completada.
  `sitemap.xml` se envió, pero la tabla mostró «No se ha podido obtener» en la
  primera consulta. El endpoint público sí respondió HTTP 200 y XML con 23 URLs.
  Queda pendiente comprobar su procesamiento, sin confundir envío con aceptación.
- Google Business: se guardó el pin que el usuario había ajustado, sin desplazarlo.
  Dirección mostrada en el editor: `2W99+CXP Los Olivos`, segunda línea
  `Calle Los Olivos, primer piso`. Google confirmó revisión pendiente; no se
  declara que ya sea visible al público ni que las coordenadas coincidan con la
  web sin una comprobación adicional del punto finalmente aprobado.
- Facebook: horario guardado de lunes a sábado, 10:00–20:30, domingo cerrado.
  No se publicaron posts ni se modificaron los logos de redes.
- Dominio elegido por el usuario: `angelesstudio.pe`. Punto.pe lo mostró libre
  por S/110 durante un año, impuestos incluidos, y se añadió solo ese dominio
  al carrito. No está comprado ni reservado. Faltan el titular legal y que el
  usuario complete aprobación de condiciones y pago. No se crearon correos
  corporativos antes de disponer del dominio.
- Se crearon y validaron doce plantillas independientes: cinco historias,
  cuatro posts verticales, dos posts cuadrados y una tarjeta de regalo.
  Texto y formas editables; fondo general sin temática estacional y logo rosa.
  No contienen fotos reales, promociones ni testimonios inventados. Archivos en
  `C:\Users\Poliguag\Documents\Codex\2026-09-21\busca-en-esta-pc-todo-lo\output\plantillas-canva`.
  Las doce quedaron importadas y guardadas como diseños separados en el Canva
  de Junior/`angelesstudioperu@gmail.com`, no en el conector personal. El usuario
  habilitó el acceso local que impedía la carga. Canva confirmó «12 artículos
  subidos», todos con una página; se comprobó la edición nativa del título de
  la primera historia (Arial, tamaño 69 y color editable). El catálogo JSON
  local conserva los doce enlaces; no se publicaron contenidos en redes.
- Auditoría adicional de Canodent: los elementos reutilizables principales ya
  están adaptados (datos centralizados, servicios, FAQ, SEO y embudo WhatsApp).
  Las landing pages de campañas quedan para ofertas concretas aprobadas; no se
  crean páginas duplicadas sin una finalidad diferenciada.

Evidencia: [logo público](evidence/web-lettering-rosa-final-2026-10-18.png),
[pie de página](evidence/web-footer-rosa-final-2026-10-18.png),
[propiedad verificada](evidence/search-console-verificado-2026-10-18.png),
[cuota de indexación](evidence/search-console-cuota-indexacion-2026-10-18.png),
[pin del usuario enviado](evidence/google-pin-usuario-enviado-2026-10-18.png) y
[dominio en carrito](evidence/dominio-angelesstudio-pe-carrito-2026-10-18.png),
[doce diseños en Canva](evidence/canva-doce-plantillas-2026-10-18.png) y
[texto editable](evidence/canva-historia-editable-2026-10-18.png).

Pendientes actuales: titular y compra del dominio; conexión DNS/HTTPS y nueva
propiedad de Search Console del dominio; Zoho y correo de reclamos; identidad y
procedimiento del Libro de Reclamaciones, manteniendo RUC sin especificar;
aprobación de Google e indexación.
Las fotos y videos reales los aporta el usuario. No se activaron Analytics,
Pixel, campañas ni publicaciones sociales.

## Registro previo: web publicada el 18/10/2026

Esta sección sustituye los estados preliminares que se conservan más abajo como
registro de la revisión. No hay que repetir sus antiguos bloqueos de publicación.

- Publicada y comprobada: https://angeles-studio.angelesstudioperu.workers.dev/.
  Versión Cloudflare vigente: `9e049f42-a90b-452b-b152-be1d2e3a348b`.
  Cuenta confirmada: `angelesstudioperu@gmail.com`, Worker existente `angeles-studio`.
- El propietario autorizó publicar y confirmó los datos comerciales heredados de
  la web. No se compró dominio, contrató plan ni ejecutó migración D1.
- Letras del logo ajustadas en proporción y en el rosa de las alas originales.
  No se modificaron la imagen, geometría ni animación de esas alas en este ajuste.
- Pin corregido hacia el punto inferior indicado por el propietario:
  `-11.981506, -77.079941`. La web pública usa estas coordenadas. Facebook guardó
  el cambio. Google Business recibió el ajuste y en la última consulta aún indica
  «Tu edición está pendiente»; no se declara aprobado públicamente.
- Meta Business Suite vuelve a abrir sin la barrera de verificación anterior y
  muestra Instagram `angelesstudio.pe` vinculado. No se probó el envío de
  publicaciones ni se cambió contenido de redes, salvo la ubicación autorizada.
- Revisión móvil final a 390 × 844 aprobada: portada, calendario y horas apilados,
  galería y contacto, sin desbordamiento horizontal. En la web pública se comprobó
  el calendario hidratado, selección del 19 de octubre y 10 a.m.; sin enviar mensajes.
- QA final: lint, tipos, 4/4 pruebas y compilación terminaron con código 0.
  También pasaron `cf:prepare` y `git diff --check`. Persisten los avisos de
  compilación y las alertas de herramientas de desarrollo descritos al final.
- Indexación comercial habilitada (`SITE_LAUNCH_READY=true`): portada pública
  `index, follow`, canonical correcto, robots permite rastreo y enlaza sitemap.
  El sitemap incluye servicios y excluye el Libro de Reclamaciones pendiente,
  cuya página pública se comprobó con `noindex, follow`.
- El propietario confirmó que todavía no hay dominio propio. Se puede trabajar
  y publicar con Workers; no se crearon buzones Zoho ni direcciones inexistentes.
  El Gmail sigue siendo el contacto provisional. Cuando se compre y verifique el
  dominio, preparar `hola@`, `reservas@` y `reclamos@` como buzones o alias según
  el plan autorizado. [Requisito de dominio en Zoho](https://www.zoho.com/mail/help/adminconsole/add-domains.html).

Evidencia: [web pública](evidence/web-publicada-2026-10-18.png),
[reserva móvil pública](evidence/web-publicada-reserva-movil-2026-10-18.png),
[Meta accesible](evidence/meta-acceso-restablecido-2026-10-18.png) y
[punto enviado a Google](evidence/google-punto-corregido-pendiente-2026-10-18.png).

Pendientes reales: dominio y posterior correo corporativo; aprobación de Google
del punto/catálogo; identidad del proveedor y procedimiento del Libro de
Reclamaciones (RUC sin especificar por indicación del propietario); Search Console;
fotografías y videos reales. El Gmail o futuro correo de reclamos no sustituyen
un Libro de Reclamaciones formal. No se activaron campañas, Pixel ni Analytics.

## Ajuste posterior: cabecera y navegación

- Se conservó el archivo original de las alas y los mismos fotogramas del vuelo.
  El gesto de 500 ms del logo ahora también se activa al pulsar los enlaces del
  menú, incluida la activación con Enter. Se respetan los modificadores para
  abrir otra pestaña y la preferencia de movimiento reducido. Al restaurar una
  página desde el historial se limpia el estado de vuelo.
- En escritorio, el inicio del rosado pasó de 52% a 46%: unos 90 px hacia la
  izquierda en la vista comprobada. No se alteró el corte móvil del 58%.
- QA: tipos, 4/4 pruebas y compilación correctos; lint limpio después de retirar
  una directiva obsoleta. Comprobados el vuelo del logo y del menú en navegador,
  navegación con Enter y vista de 390 × 844 sin desbordamiento horizontal.
  En producción se verificaron el gradiente nuevo y `wings-return-home` al
  pulsar Servicios. No se modificaron datos comerciales ni redes sociales.
- Publicado en el Worker existente, sin migraciones ni compras.
  [Captura de la cabecera pública](evidence/web-cabecera-ajustada-2026-10-18.png).
- Google sigue mostrando la ubicación como pendiente de revisión en la consulta
  posterior. No se atribuyen resultados de posicionamiento todavía.
- Se cerraron las ocho pestañas auxiliares/duplicadas del Chrome de Angeles.
  Quedaron cinco: web, Google Business, Meta Business Suite, Facebook y Cloudflare.
  No se cerraron aplicaciones ajenas. Las pestañas pueden recuperarse desde Chrome.

### Siguiente etapa propuesta, sin aplicar cambios de contenido en redes

1. Elegir y autorizar un dominio; después verificarlo y configurar los correos
   corporativos y sus registros. La web actual puede seguir funcionando mientras.
2. Completar identidad del proveedor, responsable y procedimiento del Libro de
   Reclamaciones; dejar el RUC sin especificar hasta que lo entregue el propietario.
3. Confirmar la aprobación del pin/catálogo de Google y aportar fotos reales del
   acceso y del salón. Reunir además 10–15 trabajos propios con permiso de uso.
4. Con autorización separada, unificar biografías y horarios de redes, crear
   destacados de servicios, precios, ubicación, cuidados y reservas; confirmar si
   se ofrecen extensiones de pestañas antes de ampliar el catálogo web.
5. Conectar Search Console y enviar el sitemap; medir consultas y citas confirmadas.
   No hay Analytics/Pixel ni calendario de disponibilidad en vivo implementados.
6. Evaluar paquetes de servicio, visitas entre amigas o incentivos para horarios
   de menor demanda según margen y capacidad, sin publicar descuentos inventados.

Valoración: base profesional funcional para recibir consultas, comprobada en
escritorio y móvil, no un sistema completo de reservas y cobros. Quedan pendientes
contenido propio, operación/legal y medición. Persisten las 12 alertas de las
herramientas de desarrollo detalladas abajo; las pruebas no equivalen a una
auditoría integral de seguridad ni a resultados SEO demostrados.

## Registro de trabajo anterior al despliegue

Los textos siguientes describen la secuencia anterior. Las referencias a una web
solo local, acceso Meta bloqueado, coordenadas anteriores, móvil pendiente o
indexación cerrada son históricas; prevalece el cierre vigente de arriba.

## Proyecto recuperado

- Carpeta: `C:\Users\Poliguag\Documents\Angeles Studio`.
- Repositorio: https://github.com/angelesstudioperu-cloud/angeles-studio.git.
- Web pública existente: https://angeles-studio.angelesstudioperu.workers.dev/.
- Referencia Canodent: `C:\Users\Poliguag\Desktop\Canodent`.
- Datos de negocio: `app/content/business.ts`; catálogo: `app/content/services.ts`.
- Equipo: `app/content/team.ts`. Son datos heredados del proyecto, no una nueva
  confirmación del personal. Retratos sustituidos por iniciales.
- No se encontró evidencia de que el repositorio se hubiera borrado. El trabajo
  estaba conservado en la PC y en su historial. La falta de contexto de un chat no
  equivale a eliminación de archivos.

## Implementado en la web local

- Lockup aprobado: ANGELES STUDIO, Nails Salon debajo con líneas laterales.
  Vector reutilizable y tarjeta social nueva en `public/brand/`.
- Restauradas las alas originales en el logo completo de la web, conservando
  su imagen, CSS y animación anterior sin cambios. Se mantiene el texto nuevo.
  [Vista comprobada](evidence/web-logo-restaurado-2026-10-18.png).
- Videos, recorridos y espacios de contenido pendiente ocultos. Sin interiores
  stock presentados como el local ni retratos ajenos presentados como el equipo.
- Fotografías WebP existentes, de uso comercial según los créditos Pexels,
  conservadas como inspiración y señaladas como referenciales. Ver
  [créditos y licencia](creditos-imagenes.md).
- Catálogo de 15 servicios, retiros y enlaces de reserva. Precios «desde» cuando
  corresponde, sin descuentos inventados ni testimonios o reseñas trasladados.
- Reserva con fecha de Lima y año, domingos y fechas pasadas deshabilitados,
  horarios compatibles con duración/cierre y reinicio al cambiar servicio.
  La hora es una preferencia, no disponibilidad en vivo.
- El formulario prepara un borrador de WhatsApp: no guarda una reserva en D1,
  no envía mensajes solo y no confirma citas ni cobros. Hay enlace manual de respaldo.
- Mapa de Google solo después de pulsar «Cargar mapa»; privacidad coherente.
- URL central, canonical por página, sitemap, BeautySalon/Service/Breadcrumb y
  redes enlazadas. No se incorporaron puntuaciones ni cifras de reseñas inventadas.
- Indexación cerrada mientras `SITE_LAUNCH_READY=false`.

### Qué se adaptó de Canodent

Arquitectura de datos centralizados, navegación por servicios e intención local,
SEO estructurado, embudo a WhatsApp, comprobaciones de calidad y lanzamiento
controlado. No se copiaron diagnósticos clínicos, promesas médicas, testimonios,
reseñas, cuentas publicitarias, identificadores de medición ni credenciales.
La integración de reseñas de Canodent depende de autorización/API; no se presenta
como si ya estuviera funcionando para Angeles.

## Google Business: cambios reales

Se trabajó en el Chrome abierto de Junior, con la cuenta del negocio
`angelesstudioperu@gmail.com`. La ficha Angeles Studio aparecía verificada.

Guardados y visibles en el editor:

- Teléfono: **947 117 905** (antes 956 293 952).
- WhatsApp: https://wa.me/51947117905.
- Web: https://angeles-studio.angelesstudioperu.workers.dev/.
- Menú/servicios: https://angeles-studio.angelesstudioperu.workers.dev/servicios.
- Enlaces de Instagram, Facebook y TikTok del proyecto.
- Descripción específica de manicure, pedicure, uñas, pestañas, cejas y cita previa.
- Horario existente comprobado: lunes a sábado, 10:00–20:30; domingo cerrado.
- «Se requiere una cita»: guardado y visible en el editor en la comprobación
  posterior, ya sin el aviso de revisión pendiente de ese atributo.
- Catálogo: se añadieron Manicura con gel, Uñas polygel, Uñas rubber, Uñas builder
  gel, Uñas soft gel y Acripie, usando únicamente técnicas del catálogo del proyecto.
  Se guardaron y comprobaron nueve entradas con descripción y precio «desde»:
  Manicura y gel S/30, Pedicura S/40, acrílicas/polygel/rubber/builder/soft gel S/50
  y Acripie S/60. Google muestra las nuevas entradas **pendientes de revisión**,
  con un plazo orientativo de hasta un día; no se afirma publicación definitiva.
  Los precios se tomaron del proyecto existente, no de tarifas recién confirmadas.

Prueba: [captura de contacto](evidence/google-business-contacto-2026-10-18.png).
Los enlaces añadidos están en Google; no son modificaciones a las redes sociales.
Más evidencia: [cita previa](evidence/google-cita-previa-2026-10-18.png) y
[catálogo con precios](evidence/google-catalogo-servicios-2026-10-18.png).

No se borraron los servicios genéricos que ya existían en Google. «Extensiones de
pestañas» aparece tanto allí como en Facebook, pero la web tiene lifting: confirmar
si se ofrecen ambos antes de ampliar esa parte del catálogo. Tampoco se inventaron
servicios de cera corporal, masajes ni tratamientos sugeridos por Google.

### Dirección: referencia confirmada y actualización enviada

| Fuente | Dato observado |
| --- | --- |
| Web local actual | Calle Los Olivos, primer piso; letrero rosado Angeles Studio |
| Facebook | Guardado: Calle Los Olivos, primer piso (2W99+CXP), Los Olivos, Peru, 15304 |
| Google Business | Cambio a local físico enviado; dirección y pin pendientes de revisión |

El propietario confirmó el primer piso y el letrero rosado de la imagen de Street
View: https://maps.app.goo.gl/hgXztzrzmQxh5mCS6. No confirmó numeración de puerta;
no se reutilizan 66, 64, 63 ni el 72 que rotula Street View. La posición de la cámara
está en la calle. Se identificó visualmente el frente del edificio en el mapa:
`-11.981422, -77.080048`, Plus Code `2W99+CXP Los Olivos`.

Google aceptó el envío de la dirección `2W99+CXP Los Olivos`, segunda línea
`Calle Los Olivos, primer piso`, distrito Los Olivos y el pin del edificio, con
«Mostrar la dirección de la empresa a los clientes» activado. El editor confirmó
«Tu edición está pendiente. Suele demorar hasta 10 minutos en revisarse». No se
afirma aprobación pública definitiva. Conviene que el propietario confirme
visualmente el punto sobre su entrada; Google puede pedir nueva verificación.
[Evidencia del envío](evidence/google-local-fisico-pendiente-2026-10-18.png).

La web usa el mismo punto para mapa/enlaces y conserva aparte el enlace original
de Street View. Aún no se ha desplegado. En Facebook se guardó la dirección
Calle Los Olivos, primer piso (2W99+CXP), Los Olivos, código postal 15304, con
audiencia pública. Se sustituyó el punto antiguo de otro distrito por un marcador
al norte de Calle Los Olivos, comparando la manzana con Google Maps. Al reabrir el
editor, la dirección y el marcador del barrio persistieron. El propietario debe
confirmar visualmente el frente exacto: no se atribuye precisión topográfica a
esta comparación entre proveedores de mapas.
[Dirección guardada](evidence/facebook-ubicacion-guardada-2026-10-18.png).
[Marcador conservado al reabrir](evidence/facebook-marcador-persistido-2026-10-18.png).
No inventar fecha de apertura, accesibilidad, medios de pago ni feriados.

## Meta / Instagram

- Facebook administrable: **Angeles Studio Nails**, perfil
  https://www.facebook.com/profile.php?id=61550200861127.
- Meta muestra Instagram **angelesstudio.pe** vinculado al activo de Facebook.
- El acceso por «Continuar como Junior Gonzáles» terminó en «No se ha encontrado
  ninguna cuenta» y solicitó las credenciales de Instagram.
- Meta solicita verificación de autenticidad con Google. Google pide demostrar
  identidad tras un cambio reciente del teléfono de recuperación, usando el
  teléfono anterior terminado en **45** u otro método ofrecido por la cuenta.
- En la nueva comprobación, «Probar otro método» solo ofreció Google. Se abrió
  el selector de la cuenta del negocio; Meta terminó indicando «No hemos podido
  confirmar tu inicio de sesión con Google a tiempo. Vuelve a intentarlo».
  No es una solicitud de RUC ni un error del sitio web. Queda necesaria la
  comprobación personal de Junior. [Estado actual](evidence/meta-verificacion-google-2026-10-18.png).
- No se restablecieron contraseñas, solicitaron códigos, cambiaron permisos ni
  crearon cuentas duplicadas. Junior debe completar ese control personalmente y,
  si persiste, iniciar sesión en la cuenta existente de Instagram.
- No se publicaron ni modificaron contenidos, biografías, horarios o anuncios en redes.

## Evaluación de redes y propuestas (sin implementar)

### Prioridad 1: coherencia y conversión

1. Dirección y primer piso confirmados; Facebook guardado y Google pendiente de
   revisión. Confirmar visualmente que el pin corresponde al frente del letrero.
2. Facebook figura «Siempre abierto»: proponer lunes–sábado 10:00–20:30 y domingo
   cerrado, sujeto a confirmación. Agregar enlace a la web y reserva por WhatsApp.
3. Mantener nombre/lockup coherente y una bio breve: servicio + Los Olivos + reserva.
4. Revisar catálogo: Facebook menciona extensiones de pestañas; la web documenta
   lifting. No promocionar extensiones sin confirmar que se ofrecen.
5. Destacadas propuestas: Servicios, Precios, Cómo llegar, Cuidados, Reservas,
   Trabajos reales. No llenar «Trabajos reales» con fotografías stock.

### Prioridad 2: contenido propio cuando esté disponible

- Una pieza de inspiración/diseño, una guía de cuidados y una explicación de
  servicio por semana como propuesta editorial, no promesa de publicación.
- Mostrar proceso real, higiene de herramientas y acabados con consentimiento de
  la clienta. No publicar rostros/datos privados sin autorización.
- Videos quedan para la última fase: secuencia corta de proceso, recorrido real
  y presentación del equipo. No publicar material ficticio como prueba social.
- Promociones solo con precio base vigente, vigencia, inclusiones, restricciones
  y capacidad confirmadas. No fijar descuentos arbitrarios.

### Embudo y medición adaptados al salón

Visita → consulta WhatsApp → servicio/fecha acordados → adelanto confirmado por el
negocio → atención → seguimiento consentido → invitación neutral a reseña auténtica.
No pedir solo reseñas positivas, comprar reseñas ni ofrecer incentivos por puntuación.

Registro operativo sugerido: fecha, origen, servicio solicitado, cita confirmada,
asistencia y venta. No copiar datos personales a herramientas nuevas sin definir
acceso y tratamiento. No se ha instalado Analytics, Pixel, CAPI ni campañas.

Enlaces UTM propuestos, aún no colocados en redes:

- Instagram: `/?utm_source=instagram&utm_medium=organic_social&utm_campaign=perfil`
- Facebook: `/?utm_source=facebook&utm_medium=organic_social&utm_campaign=perfil`
- Google: `/?utm_source=google&utm_medium=organic&utm_campaign=business_profile`

Las UTM no constituyen un sistema de medición por sí solas; definir herramienta y
privacidad antes de activarla. Los parámetros no modifican la URL canonical.

## SEO local y referencias consultadas

Se priorizaron intención local («uñas / manicure / pedicure en Los Olivos»), páginas
de servicios útiles, precios claros, contacto directo y datos consistentes. No se
crearon páginas repetidas por distrito ni promesas de posiciones garantizadas.
Google indica que la información completa ayuda y que los resultados locales
dependen principalmente de relevancia, distancia y popularidad:
[documentación oficial](https://support.google.com/business/answer/7091?hl=es).

Como referencia de navegación/CTA se revisó [Aura Studio](https://aurastudiope.com/),
sin copiar textos, imágenes, identidad ni promociones. Licencia de fotografías:
[Pexels](https://www.pexels.com/license/).

## Puertas de lanzamiento

1. Comprobar aprobación del local físico en Google y que el propietario confirme
   visualmente el pin de la entrada en Google y Facebook; la dirección de Facebook
   ya se guardó sin numeración de puerta inventada.
2. El propietario confirmó que aún no tiene RUC: se deja sin especificar, sin
   inventar número. Quedan identidad del proveedor y procedimiento operativo del
   libro de reclamaciones. La página actual informa el pendiente y da contacto;
   no se presenta como un libro formal completado ni como asesoría legal.
3. Reconfirmar precios, adelanto, personal, duraciones y políticas heredadas.
4. Cerrar revisión de seguridad y visual móvil; no ignorar un fallo solo porque compila.
5. Aprobar despliegue de la versión revisada. Estos cambios son locales: no se
   ejecutó un despliegue ni un push. La web pública puede seguir mostrando la versión anterior.
6. Con datos y revisión cerrados, habilitar indexación de forma explícita y verificar
   HTML, robots, sitemap, metadatos, reservas y mapa en la URL pública.
7. Search Console: comprobar propiedad con acceso autorizado y enviar sitemap;
   pendiente, no se afirma que ya esté configurado.

### Comandos de comprobación (no publican)

Tras restaurar las alas y actualizar la ubicación, `npm run qa` terminó con código
0: lint, TypeScript, 4/4 pruebas y compilación. `npm run cf:prepare` y
`git diff --check` también pasaron. Se revisó visualmente `/contacto` en Chrome
con la versión compilada y se comprobó que su enlace usa el punto del edificio.
La comprobación visual móvil definitiva sigue pendiente; no se da por cerrada.

```bash
npm run qa
node --experimental-strip-types --test app/lib/booking-time.test.mjs
npm run cf:prepare
npx wrangler deploy --dry-run --cwd dist/server --config wrangler.json
```

`cf:prepare` debe conservar la cuenta, el Worker y la base D1 del proyecto Angeles.
No aplicar migraciones remotas ni activar planes, anuncios o facturación para este cierre.

## Verificación y límites

Comprobaciones realizadas:

- `npm run qa`: compilación de producción, tipos y lint completados. Tras excluir
  los worktrees ajenos de `.claude/`, lint y tipos se ejecutaron de nuevo sin errores
  ni avisos. Los avisos de sourcemap/migración del compilador siguen documentados;
  no impiden el empaquetado.
- `npm test`: 4/4 pruebas de fecha de Lima, año y horarios/duración correctas.
- Cloudflare: preparación y despliegue **en seco** completados, con cuenta/binding
  correctos. No se subió la versión ni se modificó D1 remota.
- Versión compilada probada en Wrangler local, enlazado solo a `127.0.0.1:3000`.
  Calendario hidratado y navegación al mes siguiente comprobados, sin errores de
  consola observados en esa prueba. Vista en Chrome conservada para revisión.
- Las 15 fichas de servicio compiladas muestran un H1, canonical correcto y JSON-LD
  válido (BeautySalon, Service, BreadcrumbList), sin videos, imágenes cargadas rotas
  ni desbordamiento horizontal en escritorio.
- Las diez páginas principales se revisaron también durante desarrollo. Galería:
  abrir/siguiente/cerrar comprobados; se corrigió el control de foco por teclado
  para que no se reinicie al cambiar de foto y excluya controles ocultos del ciclo.
  En la versión compilada se comprobó ArrowRight, Escape y devolución del foco al
  botón original; en desarrollo también Tab/Shift+Tab dentro del diálogo. Mapa:
  sin iframe antes del clic y cargado correctamente después del clic.
- Revisión móvil inicial detectó calendario comprimido y se corrigió apilando los
  paneles. **Falta una comprobación visual móvil final**: el control de tamaño de
  Chrome dejó de aplicar el ancho solicitado y devolvía escritorio. No se declara
  esa comprobación como aprobada.
  Se intentó además un marco de prueba local, bloqueado por las protecciones
  anti-incrustación del sitio; no se debilitaron esas protecciones y el archivo
  temporal de prueba se retiró. Queda revisar en un teléfono real o con un control
  de tamaño funcional: menú, reserva sin recortes, horas debajo del calendario,
  galería, contacto y ausencia de desbordamiento horizontal.
- [Captura de la portada compilada](evidence/web-preview-2026-10-18.png).
- [Galería tras la comprobación de teclado](evidence/galeria-teclado-2026-10-18.png).
- Tras el último ajuste de galería: lint, tipos, 4/4 pruebas, compilación y
  preparación/despliegue en seco de Cloudflare completados nuevamente. La primera
  recompilación encontró el directorio de salida ocupado por la vista local;
  se detuvo esa vista y la repetición finalizó correctamente. Nueva vista compilada
  local disponible en `http://localhost:3000/`; sin despliegue remoto.

### Seguridad de dependencias

Se actualizaron Next 16.4.2, React/React DOM/RSC 19.3.1, Vinext 1.2.1, Vite 8.3.4,
Wrangler 4.151.1 y sus componentes compatibles; Sharp 0.35.5 permite regenerar el
arte gráfico propio. El lockfile conserva las versiones instaladas.

La auditoría inicial informó 27 vulnerabilidades, incluida una crítica. Después
de actualizar y aplicar correcciones compatibles quedó en 15. La revisión final
fijó `fflate` en **0.7.5**, parche de la misma rama para las dependencias de
Satori/OpenType, sin bajar Vinext ni desactivar protecciones. Se comprobó la
versión instalada con `npm ls fflate --all`. `npm audit` informa ahora
**12: 8 altas y 4 moderadas, ninguna crítica**. Permanecen cadenas de herramientas
de desarrollo (`braces`/glob y esbuild/Drizzle).
`npm audit --omit=dev` informa **0**, pero esa clasificación no demuestra por sí sola
que todo el código empaquetado esté libre de vulnerabilidades.

No se aplicó `npm audit fix --force`: propone degradar Next ESLint/Vinext/Drizzle a
versiones incompatibles. La revisión del código de la aplicación no encontró uso
de patrones glob aportados por visitantes, extracción ZIP ni generación OG con
datos del visitante; la tarjeta OG es un PNG estático. El paquete antiguo de
esbuild está bajo el cargador de Drizzle: su consumidor usa `transform` y
`transformSync`, no el servidor `serve` afectado. Mantener las vistas de desarrollo
en loopback; no exponer el servidor de esbuild ni procesar patrones de terceros.
El aviso de `braces` no ofrece versión corregida a la fecha de esta revisión.

Como evidencia adicional, se inspeccionaron los 106 mapas de fuentes generados
(424 entradas de origen): no incluyen `braces`, `esbuild`, `fflate`, `satori` ni
`opentype`. Es una señal de exclusión del empaquetado, no una garantía exhaustiva:
el compilador sigue advirtiendo de mapas incompletos. No se declara auditoría sin
alertas ni se ocultan sus 12 avisos restantes. Reevaluar si se agregan subida de
archivos, generación de imágenes dinámica, nuevos servidores o patrones externos.

Después del parche, `npm run qa` volvió a pasar (lint, tipos, 4/4 pruebas y
compilación), así como `cf:prepare`, el despliegue en seco y `git diff --check`.
La simulación conservó el Worker Angeles, su binding D1 y la indexación cerrada;
no publicó archivos ni ejecutó migraciones remotas.
Referencias: [parche de fflate](https://github.com/advisories/GHSA-px8p-9vwx-vf98),
[alerta de braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) y
[alcance de esbuild](https://github.com/advisories/GHSA-67mh-4wv8-2f99).
Referencia comprobada: [aviso de Next](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j).

Se conservaron las modificaciones ajenas en `.claude/`. No se borraron proyectos,
desinstalaron integraciones ni cambiaron credenciales, permisos o facturación.
