/**
 * Puente entre el catálogo y el formulario de reserva: al tocar un precio,
 * el catálogo emite este evento y el formulario preselecciona ese servicio.
 */
export const SELECT_SERVICE_EVENT = 'angeles:select-service';

export type SelectServiceDetail = { slug: string };
