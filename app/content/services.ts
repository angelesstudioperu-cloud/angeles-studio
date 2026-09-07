/**
 * Precios oficiales tomados de la lista de precios de Ángeles Nails Salon.
 *
 * `durationMinutes` son ESTIMACIONES provisionales pensadas para que la clienta
 * pueda calcular su tiempo. El salón las confirmará y hay que reemplazarlas.
 *
 * Las fotos son de stock con licencia libre (ver `docs/creditos-imagenes.md`) y se
 * reemplazan por trabajos reales del salón antes del lanzamiento.
 */

export type ServiceCategory = 'manos' | 'pies' | 'mirada';

export type ServiceMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type StudioService = {
  slug: string;
  category: ServiceCategory;
  name: string;
  shortName?: string;
  note: string;
  priceFrom: number;
  /** La lista original dice «desde» en manos y pies; en mirada los precios son cerrados. */
  priceIsFrom?: boolean;
  /** Estimado provisional, pendiente de confirmación del salón. */
  durationMinutes: number;
  featured?: boolean;
  media: ServiceMedia;
  /** Párrafo de apertura de la subpágina del servicio. */
  intro: string;
  idealFor: string[];
  includes: string[];
  care: string[];
  faq: [string, string][];
};

export type Removal = {
  slug: string;
  name: string;
  price: number;
  durationMinutes: number;
};

export const categoryContent: Record<
  ServiceCategory,
  { label: string; title: string; intro: string; image: string; imageAlt: string; imageWidth: number; imageHeight: number }
> = {
  manos: {
    label: 'Manos',
    title: 'Uñas que se ven impecables de cerca',
    intro:
      'Esmaltado en gel y sistemas de extensión: preparación cuidadosa, estructura ligera y un acabado que aguanta el día a día.',
    image: '/images/servicio-manos.webp',
    imageAlt: 'Manicure nude con nail art delicado terminado en Ángeles Nails Salon',
    imageWidth: 1400,
    imageHeight: 937,
  },
  pies: {
    label: 'Pies',
    title: 'Pedicure con calma y con técnica',
    intro:
      'Desde la limpieza que ordena y devuelve comodidad hasta el acripie que aguanta semanas sin perder forma.',
    image: '/images/servicio-pies.webp',
    imageAlt: 'Sesión de pedicure spa en cabina',
    imageWidth: 1400,
    imageHeight: 2100,
  },
  mirada: {
    label: 'Mirada y cejas',
    title: 'Una mirada abierta, sin exagerar',
    intro:
      'Lifting, laminado, henna y depilación: definimos tu mirada respetando la forma natural de tu ceja y tu pestaña.',
    image: '/images/servicio-mirada.webp',
    imageAlt: 'Especialista trabajando el diseño de pestañas de una clienta',
    imageWidth: 1400,
    imageHeight: 934,
  },
};

const cuidadoUnas = [
  'Aplica aceite de cutícula a diario: es lo que evita que el borde se levante.',
  'No uses las uñas como herramienta para abrir, raspar ni despegar.',
  'Usa guantes con detergentes y productos de limpieza.',
  'Vuelve para el relleno cada 3 o 4 semanas, antes de que crezca demasiado.',
];

const cuidadoPies = [
  'Deja pasar unas horas antes de calzado cerrado y ajustado.',
  'Hidrata talones y planta a diario.',
  'Evita cortar la cutícula en casa: es la barrera contra infecciones.',
];

const cuidadoMirada = [
  'Las primeras 24 horas evita agua, vapor, sauna y piscina.',
  'No frotes la zona ni uses productos oleosos sobre ella.',
  'Duerme boca arriba la primera noche si puedes.',
];

export const services: StudioService[] = [
  // ---------------------------------------------------------------- Manos
  {
    slug: 'esmaltado-en-gel',
    category: 'manos',
    name: 'Esmaltado en gel',
    note: 'Preparación, forma y color de larga duración sobre tu uña natural.',
    priceFrom: 30, priceIsFrom: true,
    durationMinutes: 60,
    featured: true,
    media: { src: '/images/servicios/esmaltado-en-gel.webp', width: 1200, height: 2133, alt: 'Aplicación de esmalte en gel sobre la uña natural' },
    intro:
      'Es el servicio más pedido y el mejor punto de partida si nunca te has hecho las uñas con nosotras. Trabajamos sobre tu uña natural: la preparamos, le damos forma y sellamos el color en cabina UV para que aguante entre dos y tres semanas sin descascararse.',
    idealFor: [
      'Uñas cortas o medianas que solo necesitan color y prolijidad.',
      'Quien quiere algo discreto para el trabajo o el día a día.',
      'Primera vez: es el servicio menos invasivo de la carta.',
    ],
    includes: [
      'Limpieza y retiro de cutícula.',
      'Limado y elección de forma contigo.',
      'Base, color y top coat curados en cabina.',
      'Aceite de cutícula al terminar.',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿Cuánto me dura?', 'Entre dos y tres semanas, dependiendo del crecimiento de tu uña y de cuánto trabajes con las manos.'],
      ['¿Daña mi uña natural?', 'No, si el retiro se hace bien. Nunca lo arranques en casa: vuelve para el retiro con lima (S/ 10).'],
    ],
  },
  {
    slug: 'unas-polygel',
    category: 'manos',
    name: 'Uñas polygel',
    note: 'Extensión moldeable, ligera y resistente para largos medianos.',
    priceFrom: 50, priceIsFrom: true,
    durationMinutes: 120,
    media: { src: '/images/servicios/unas-polygel.webp', width: 1200, height: 1800, alt: 'Uñas de polygel terminadas con esmalte rosa' },
    intro:
      'El polygel está a medio camino entre el acrílico y el gel: se moldea sin olor fuerte y pesa menos que el acrílico, pero aguanta bastante más que un gel simple. Es nuestra recomendación si quieres largo medio y una uña que se sienta cómoda desde el primer día.',
    idealFor: [
      'Quien quiere extensión pero sin la rigidez del acrílico.',
      'Uñas naturales delgadas que no toleran mucho peso.',
      'Largos cortos y medianos con buena resistencia.',
    ],
    includes: [
      'Preparación y nivelación de la uña natural.',
      'Aplicación del molde y modelado del polygel.',
      'Limado de estructura y definición de forma.',
      'Color o acabado natural, según elijas.',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿Cada cuánto necesita relleno?', 'Cada 3 o 4 semanas. Si esperas más, la estructura se desbalancea y puede levantarse.'],
      ['¿Puedo llevar largo extremo?', 'Podemos hacerlo, pero el polygel rinde mejor en largos cortos y medianos. Para largos muy extensos te recomendamos acrílico.'],
    ],
  },
  {
    slug: 'unas-acrilicas',
    category: 'manos',
    name: 'Uñas acrílicas',
    note: 'El sistema más firme: ideal si buscas largo y durabilidad.',
    priceFrom: 50, priceIsFrom: true,
    durationMinutes: 120,
    featured: true,
    media: { src: '/images/servicios/unas-acrilicas.webp', width: 1200, height: 1800, alt: 'Uñas acrílicas largas en rojo trabajadas en cabina' },
    intro:
      'El acrílico es el sistema más resistente de la carta y el que mejor sostiene largos pronunciados y formas definidas (almendra, coffin, stiletto). Si quieres unas uñas que aguanten trabajo manual y no se doblen, este es el camino.',
    idealFor: [
      'Largos medianos y extensos.',
      'Formas marcadas: almendra, coffin, stiletto.',
      'Quien ya sabe que le gusta el largo y quiere durabilidad.',
    ],
    includes: [
      'Preparación de la uña natural y colocación de tips o molde.',
      'Aplicación y modelado del acrílico.',
      'Limado de estructura, apex y forma.',
      'Esmaltado en gel del color que elijas.',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿El acrílico arruina la uña?', 'Lo que la daña es el retiro casero. Nosotras lo retiramos con lima y evaluamos el estado de tu uña antes de volver a construir.'],
      ['¿Puedo hacer solo relleno?', 'Sí, si tu estructura está sana. Lo evaluamos cuando llegues.'],
    ],
  },
  {
    slug: 'unas-rubber',
    category: 'manos',
    name: 'Uñas rubber',
    note: 'Refuerzo flexible que protege la uña natural y da brillo.',
    priceFrom: 50, priceIsFrom: true,
    durationMinutes: 105,
    media: { src: '/images/servicios/unas-rubber.webp', width: 1200, height: 1797, alt: 'Manos curando gel bajo lámpara en cabina' },
    intro:
      'El rubber gel es un gel de consistencia más elástica que se aplica como capa de refuerzo sobre tu uña natural. No añade largo, añade resistencia: es lo que pedimos cuando la uña se quiebra sola pero no quieres extensión.',
    idealFor: [
      'Uñas que se parten o se doblan solas.',
      'Quien quiere fortalecer sin llevar largo.',
      'Etapas de recuperación después de un acrílico.',
    ],
    includes: [
      'Limpieza, retiro de cutícula y nivelación.',
      'Capa de rubber gel modelada a mano.',
      'Curado en cabina y definición de forma.',
      'Color o acabado transparente.',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿Es lo mismo que el builder gel?', 'Son primos. El rubber es más flexible y el builder más firme; elegimos según lo frágil que esté tu uña.'],
      ['¿Se ve grueso?', 'No. Se trabaja en capa fina y sigue la curva de tu uña.'],
    ],
  },
  {
    slug: 'unas-builder-gel',
    category: 'manos',
    name: 'Uñas builder gel',
    note: 'Estructura de gel para nivelar y fortalecer sin peso extra.',
    priceFrom: 50, priceIsFrom: true,
    durationMinutes: 105,
    media: { src: '/images/servicios/unas-builder-gel.webp', width: 1200, height: 1800, alt: 'Manos con uñas rojas terminadas apoyadas en la mesa de trabajo' },
    intro:
      'El builder gel construye estructura: nivela la superficie, marca el apex y corrige uñas que crecen curvadas o desparejas. Puede ir sobre tu uña natural o sobre una extensión corta, y queda más firme que el rubber.',
    idealFor: [
      'Uñas desniveladas o con curvatura marcada.',
      'Quien quiere una base sólida sin llegar al acrílico.',
      'Largos cortos con acabado muy prolijo.',
    ],
    includes: [
      'Preparación completa de la uña natural.',
      'Construcción del apex y nivelación.',
      'Limado de estructura y forma.',
      'Esmaltado en gel o acabado natural.',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿Cuánto dura?', 'Entre 3 y 4 semanas antes del relleno, igual que el resto de sistemas de gel.'],
      ['¿Sirve si me como las uñas?', 'Sí, es uno de los mejores aliados para dejar el hábito. Lo evaluamos en cabina.'],
    ],
  },
  {
    slug: 'unas-soft-gel',
    category: 'manos',
    name: 'Uñas soft gel',
    note: 'Tips preformados de acabado natural y aplicación rápida.',
    priceFrom: 50, priceIsFrom: true,
    durationMinutes: 90,
    featured: true,
    media: { src: '/images/galeria/nailart-floral.webp', width: 1000, height: 1500, alt: 'Uñas soft gel con nail art floral pintado a mano' },
    intro:
      'Los tips de soft gel vienen preformados y se adhieren a toda la uña, así que la sesión es más corta y el resultado se ve muy natural desde el primer momento. Es la opción más rápida si necesitas extensión para una fecha puntual.',
    idealFor: [
      'Quien tiene poco tiempo y quiere extensión el mismo día.',
      'Acabados naturales, tipo “uña propia pero perfecta”.',
      'Eventos: matrimonios, viajes, sesiones de fotos.',
    ],
    includes: [
      'Medición y elección del tip para cada dedo.',
      'Preparación y adhesión con gel curado en cabina.',
      'Limado de forma y refinado del borde.',
      'Color, francesa o nail art (el diseño puede ajustar el precio).',
    ],
    care: cuidadoUnas,
    faq: [
      ['¿Se nota el borde del tip?', 'No: se lima y se sella para que el borde desaparezca contra tu uña.'],
      ['¿Aguanta como el acrílico?', 'Aguanta muy bien en largos cortos y medianos. Para largo extremo seguimos recomendando acrílico.'],
    ],
  },

  // ----------------------------------------------------------------- Pies
  {
    slug: 'pedicure-spa-en-gel',
    category: 'pies',
    name: 'Pedicure spa en gel',
    note: 'Limpieza completa, cuidado de cutícula y esmaltado en gel.',
    priceFrom: 40, priceIsFrom: true,
    durationMinutes: 75,
    featured: true,
    media: { src: '/images/servicios/pedicure-spa-en-gel.webp', width: 1200, height: 2136, alt: 'Aplicación de esmalte en gel rosa durante un pedicure spa' },
    intro:
      'El servicio completo de pies: remojo, limpieza profunda, trabajo de cutícula, corte y esmaltado en gel. Sales con los pies cómodos y con un color que aguanta tres o cuatro semanas, incluso en verano.',
    idealFor: [
      'Mantenimiento mensual de pies.',
      'Antes de viajes, playa o temporada de sandalias.',
      'Quien quiere color que no se descascare a los tres días.',
    ],
    includes: [
      'Remojo y limpieza.',
      'Trabajo de cutícula y corte de uña.',
      'Retiro de durezas en la zona que lo necesite.',
      'Esmaltado en gel curado en cabina.',
    ],
    care: cuidadoPies,
    faq: [
      ['¿Incluye retiro del esmalte anterior?', 'No. El retiro de gel se cobra aparte (S/ 10) y lo hacemos con lima.'],
      ['¿Puedo venir con hongos o una uña encarnada?', 'No trabajamos sobre uñas con infección o lesión visible. Te recomendamos evaluación con un podólogo y te esperamos después.'],
    ],
  },
  {
    slug: 'acripie',
    category: 'pies',
    name: 'Acripie',
    note: 'Refuerzo acrílico en pies para un acabado firme y parejo.',
    priceFrom: 60, priceIsFrom: true,
    durationMinutes: 120,
    media: { src: '/images/servicios/acripie.webp', width: 1200, height: 800, alt: 'Cabina de pedicure con esmaltes y herramientas ordenadas' },
    intro:
      'El acripie aplica la técnica del acrílico a las uñas de los pies. Sirve para emparejar uñas irregulares, reconstruir una uña dañada o simplemente conseguir un acabado uniforme que dura mucho más que un esmaltado.',
    idealFor: [
      'Uñas de los pies desparejas, cortas o quebradas.',
      'Reconstrucción estética de una uña golpeada.',
      'Quien quiere durabilidad máxima en pies.',
    ],
    includes: [
      'Limpieza y preparación completa del pie.',
      'Aplicación y modelado del acrílico uña por uña.',
      'Limado de forma y superficie.',
      'Esmaltado en gel del color que elijas.',
    ],
    care: cuidadoPies,
    faq: [
      ['¿Cuánto dura?', 'Bastante más que un esmaltado: entre 6 y 8 semanas según el crecimiento.'],
      ['¿Duele?', 'No. Si hay una zona sensible avísanos y ajustamos el trabajo.'],
    ],
  },
  {
    slug: 'solo-limpieza',
    category: 'pies',
    name: 'Solo limpieza',
    note: 'Higiene, corte y cuidado de cutícula sin esmaltado.',
    priceFrom: 20, priceIsFrom: true,
    durationMinutes: 45,
    media: { src: '/images/servicios/solo-limpieza.webp', width: 1200, height: 1800, alt: 'Trabajo de limpieza y cutícula en pedicure' },
    intro:
      'La versión sin color: limpieza, corte, cutícula y retiro de durezas. Es el servicio de mantenimiento puro, ideal si prefieres tus uñas al natural o si vienes entre un esmaltado y otro.',
    idealFor: [
      'Mantenimiento entre servicios de color.',
      'Quien prefiere las uñas al natural.',
      'Presupuestos ajustados que igual quieren pies cuidados.',
    ],
    includes: [
      'Remojo y limpieza.',
      'Corte y limado de uña.',
      'Trabajo de cutícula.',
      'Retiro de durezas puntuales.',
    ],
    care: cuidadoPies,
    faq: [
      ['¿Puedo agregar color después?', 'Sí. Si lo decides en cabina pasamos a pedicure spa en gel y ajustamos el precio.'],
      ['¿Cada cuánto conviene?', 'Cada 3 o 4 semanas mantiene el pie cómodo sin que se acumulen durezas.'],
    ],
  },

  // --------------------------------------------------------------- Mirada
  {
    slug: 'lifting-de-pestanas',
    category: 'mirada',
    name: 'Lifting de pestañas',
    note: 'Curvatura desde la raíz para abrir la mirada de forma natural.',
    priceFrom: 35,
    durationMinutes: 60,
    featured: true,
    media: { src: '/images/servicio-mirada.webp', width: 1400, height: 934, alt: 'Especialista trabajando el lifting de pestañas de una clienta' },
    intro:
      'El lifting curva tu propia pestaña desde la raíz, sin añadir extensiones. El efecto es que la mirada se abre y las pestañas se ven más largas, pero al despertar sigues siendo tú: no hay mantenimiento diario ni riesgo de que se despeguen.',
    idealFor: [
      'Pestañas rectas o que apuntan hacia abajo.',
      'Quien quiere resultado natural y cero mantenimiento.',
      'Alternativa a las extensiones si te resultan pesadas.',
    ],
    includes: [
      'Evaluación de tu pestaña natural.',
      'Elección de curvatura según tu ojo.',
      'Permanente y fijación con protección del párpado.',
      'Nutrición final de la pestaña.',
    ],
    care: cuidadoMirada,
    faq: [
      ['¿Cuánto dura?', 'Entre 6 y 8 semanas, hasta que la pestaña completa su ciclo natural de recambio.'],
      ['¿Puedo usar máscara de pestañas después?', 'Sí, pasadas las primeras 24 horas. Evita las máscaras a prueba de agua porque cuesta retirarlas.'],
      ['¿Se puede combinar con tinte?', 'Se puede. Consúltanos al reservar y te confirmamos el precio del combinado.'],
    ],
  },
  {
    slug: 'laminado-de-cejas',
    category: 'mirada',
    name: 'Laminado de cejas',
    note: 'Peinado y fijado que ordena la ceja y le da volumen.',
    priceFrom: 20,
    durationMinutes: 45,
    media: { src: '/images/servicios/laminado-de-cejas.webp', width: 1200, height: 1800, alt: 'Peinado y fijado de cejas durante un laminado' },
    intro:
      'El laminado peina el vello hacia arriba y lo fija ahí durante semanas. Es lo que hace que una ceja rebelde o con huecos se vea llena, ordenada y con esa textura peinada que se ve en fotos, sin maquillaje encima.',
    idealFor: [
      'Cejas rebeldes que no se quedan en su lugar.',
      'Cejas con zonas ralas que se ven mejor peinadas.',
      'Quien se maquilla las cejas todos los días y quiere dejar de hacerlo.',
    ],
    includes: [
      'Diseño de la forma junto contigo.',
      'Laminado y fijación del vello.',
      'Nutrición final.',
      'Depilación de contorno si la necesitas (se cobra aparte).',
    ],
    care: cuidadoMirada,
    faq: [
      ['¿Cuánto dura?', 'Entre 4 y 6 semanas.'],
      ['¿Cada cuánto lo puedo repetir?', 'Recomendamos dejar pasar al menos 6 semanas para no resecar el vello.'],
    ],
  },
  {
    slug: 'pigmentacion-con-henna',
    category: 'mirada',
    name: 'Pigmentación con henna',
    note: 'Color y definición temporal que rellena zonas sin vello.',
    priceFrom: 30,
    durationMinutes: 40,
    media: { src: '/images/servicios/pigmentacion-con-henna.webp', width: 1200, height: 1800, alt: 'Clienta con cejas definidas después de la pigmentación' },
    intro:
      'La henna tiñe el vello y también la piel debajo, así que rellena visualmente los espacios vacíos y deja la ceja definida sin necesidad de maquillaje. Es temporal y reversible: una buena manera de probar una forma antes de comprometerte con algo permanente.',
    idealFor: [
      'Cejas con huecos o zonas sin vello.',
      'Quien quiere probar una forma más definida sin micropigmentación.',
      'Cejas claras que se pierden en el rostro.',
    ],
    includes: [
      'Diseño y medición de la forma.',
      'Prueba y mezcla del tono contigo.',
      'Aplicación y tiempo de reposo.',
      'Retiro y revisión del resultado.',
    ],
    care: [
      'Las primeras 24 horas evita agua y productos oleosos en la zona.',
      'El tono baja un poco el primer día: es normal.',
      'Los exfoliantes faciales aceleran la pérdida del color en la piel.',
    ],
    faq: [
      ['¿Cuánto dura?', 'En el vello, entre 4 y 6 semanas. En la piel, entre 5 y 10 días.'],
      ['¿Es lo mismo que microblading?', 'No. La henna es temporal y no perfora la piel; el microblading es un procedimiento semipermanente que no realizamos.'],
    ],
  },
  {
    slug: 'depilacion-de-cejas',
    category: 'mirada',
    name: 'Depilación de cejas',
    note: 'Diseño de forma según tu rostro y tu crecimiento natural.',
    priceFrom: 15,
    durationMinutes: 20,
    media: { src: '/images/servicios/depilacion-de-cejas.webp', width: 1200, height: 800, alt: 'Depilación y diseño de cejas con pinza' },
    intro:
      'No quitamos vello por quitarlo: primero miramos la forma de tu rostro y hacia dónde crece tu ceja, y recién ahí definimos qué sacar. La idea es que la ceja siga siendo tuya, solo que ordenada.',
    idealFor: [
      'Mantenimiento cada 3 o 4 semanas.',
      'Corregir una forma que quedó demasiado delgada.',
      'Antes de un evento, junto con el laminado.',
    ],
    includes: [
      'Diseño de la forma junto contigo.',
      'Depilación de contorno.',
      'Peinado y recorte si hace falta.',
      'Calmante final.',
    ],
    care: [
      'Evita el sol directo y el maquillaje sobre la zona por unas horas.',
      'Si tu piel es sensible, aplica gel calmante ese día.',
    ],
    faq: [
      ['¿Con pinza o con cera?', 'Elegimos según tu piel y tu tipo de vello. Si tomas algún tratamiento dermatológico, avísanos antes.'],
      ['¿Cada cuánto vuelvo?', 'Cada 3 o 4 semanas mantiene la forma sin que tengas que corregir en casa.'],
    ],
  },
  {
    slug: 'depilacion-de-bozo',
    category: 'mirada',
    name: 'Depilación de bozo',
    note: 'Retiro rápido y prolijo del vello del labio superior.',
    priceFrom: 10,
    durationMinutes: 10,
    media: { src: '/images/servicios/depilacion-de-bozo.webp', width: 1200, height: 800, alt: 'Trabajo de depilación facial en cabina' },
    intro:
      'Un servicio corto que casi siempre se suma a otro. Retiramos el vello del labio superior con cuidado extra, porque es una de las zonas más sensibles del rostro.',
    idealFor: [
      'Sumarlo a tu cita de cejas o pestañas.',
      'Antes de un maquillaje, para que el producto asiente parejo.',
    ],
    includes: ['Limpieza de la zona.', 'Depilación del labio superior.', 'Calmante final.'],
    care: [
      'No apliques maquillaje sobre la zona por unas horas.',
      'Evita el sol directo el resto del día.',
    ],
    faq: [
      ['¿Se pone más oscuro después?', 'No. El vello vuelve con el mismo grosor con el que crecía antes.'],
      ['¿Puedo si uso ácidos o isotretinoína?', 'Avísanos antes de reservar: con esos tratamientos la piel se levanta y preferimos no depilar.'],
    ],
  },
  {
    slug: 'depilacion-de-rostro',
    category: 'mirada',
    name: 'Depilación de rostro',
    note: 'Limpieza completa de vello facial en una sola sesión.',
    priceFrom: 30,
    durationMinutes: 30,
    media: { src: '/images/servicios/depilacion-de-rostro.webp', width: 1200, height: 1800, alt: 'Sesión de depilación facial completa' },
    intro:
      'Cubre el rostro completo: frente, mejillas, patillas, mentón y bozo. Deja la piel lisa y hace que el maquillaje asiente mucho mejor, sin el efecto “pelusa” a contraluz.',
    idealFor: [
      'Antes de un evento o una sesión de fotos.',
      'Quien tiene vello facial fino y visible a contraluz.',
      'Mantenimiento mensual junto con el diseño de cejas.',
    ],
    includes: [
      'Limpieza previa del rostro.',
      'Depilación de frente, mejillas, patillas, mentón y bozo.',
      'Calmante final.',
    ],
    care: [
      'Nada de sol directo, sauna ni piscina las primeras 24 horas.',
      'Retoma exfoliantes y ácidos recién a las 48 horas.',
      'Usa protector solar al día siguiente.',
    ],
    faq: [
      ['¿Me va a salir más grueso?', 'No. Es un mito: la depilación no cambia el grosor del vello.'],
      ['¿Puedo maquillarme después?', 'Mejor espera unas horas para no irritar la piel recién depilada.'],
    ],
  },
];

export const removals: Removal[] = [
  { slug: 'retiro-esmaltado-gel', name: 'Esmaltado en gel · manos o pies', price: 10, durationMinutes: 15 },
  { slug: 'retiro-acrilico-polygel', name: 'Uñas acrílicas / uñas polygel', price: 15, durationMinutes: 20 },
  { slug: 'retiro-gel-estructural', name: 'Uñas rubber gel / builder gel / soft gel', price: 20, durationMinutes: 25 },
];

export const categories: ServiceCategory[] = ['manos', 'pies', 'mirada'];

export const featuredServices = services.filter((service) => service.featured);

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((service) => service.category === category);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

/** Otros servicios de la misma categoría, para el bloque «también te puede interesar». */
export function relatedServices(service: StudioService, limit = 3) {
  return services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, limit);
}

export function servicePath(slug: string) {
  return `/servicios/${slug}`;
}

export function formatPrice(price: number) {
  return `S/ ${price}`;
}

/** Etiqueta larga para selects y metadatos. */
export function priceLabel(service: Pick<StudioService, 'priceFrom' | 'priceIsFrom'>) {
  return `S/ ${service.priceFrom}`;
}

export function formatFlatPrice(price: number) {
  return `S/ ${price}`;
}

/** Duración aproximada; el salón confirma el tiempo real al reservar. */
export function formatDuration(minutes: number) {
  if (minutes < 60) return `aprox. ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `aprox. ${hours} h ${rest} min` : `aprox. ${hours} h`;
}
