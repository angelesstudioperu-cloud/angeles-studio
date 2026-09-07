import type { StudioService } from '../content/services';

type PriceTagProps = {
  service: Pick<StudioService, 'priceFrom' | 'priceIsFrom'>;
  className?: string;
  /** El catálogo muestra el monto pelado; la lista completa sí matiza con «desde». */
  showFrom?: boolean;
};

/** Precio tal como figura en la lista del salón: «desde» solo donde la lista lo dice. */
export function PriceTag({ service, className = '', showFrom = true }: PriceTagProps) {
  return (
    <span className={`price-tag ${className}`}>
      {showFrom && service.priceIsFrom && <small>desde</small>}
      <b>S/ {service.priceFrom}</b>
    </span>
  );
}
