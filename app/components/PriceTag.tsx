import type { StudioService } from '../content/services';

type PriceTagProps = {
  service: Pick<StudioService, 'priceFrom'>;
  className?: string;
};

/** Precio directo, sin calificadores, en todos los puntos de la experiencia. */
export function PriceTag({ service, className = '' }: PriceTagProps) {
  return (
    <span className={`price-tag ${className}`}>
      <b>S/ {service.priceFrom}</b>
    </span>
  );
}
