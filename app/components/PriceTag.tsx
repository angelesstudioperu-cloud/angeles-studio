import type { StudioService } from '../content/services';

type PriceTagProps = {
  service: Pick<StudioService, 'priceFrom' | 'priceIsFrom'>;
  className?: string;
};

/**
 * Precio tal como aparece en la lista impresa del salón: manos y pies dicen
 * «desde» porque el monto sube con largo y diseño; mirada es precio cerrado.
 */
export function PriceTag({ service, className = '' }: PriceTagProps) {
  return (
    <span className={`price-tag ${className}`}>
      {service.priceIsFrom && <small>desde</small>}
      <b>S/ {service.priceFrom}</b>
    </span>
  );
}
