import type { StudioService } from '../content/services';

type PriceTagProps = {
  service: Pick<StudioService, 'priceFrom' | 'priceIsFrom'>;
  className?: string;
};

/** Precio tal como figura en la lista del salón: «desde» solo donde la lista lo dice. */
export function PriceTag({ service, className = '' }: PriceTagProps) {
  return (
    <span className={`price-tag ${className}`}>
      {service.priceIsFrom && <small>desde</small>}
      <b>S/ {service.priceFrom}</b>
    </span>
  );
}
