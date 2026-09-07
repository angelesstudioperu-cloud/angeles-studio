import type { StudioService } from '../content/services';

type PriceTagProps = {
  service: Pick<StudioService, 'priceFrom' | 'priceRegular' | 'priceIsFrom'>;
  className?: string;
};

/**
 * Precio vigente y, cuando existe, el regular tachado al lado.
 * El tachado solo debe usarse en servicios que de verdad se cobraron a ese precio.
 */
export function PriceTag({ service, className = '' }: PriceTagProps) {
  const onSale = typeof service.priceRegular === 'number' && service.priceRegular > service.priceFrom;

  return (
    <span className={`price-tag${onSale ? ' price-tag-sale' : ''} ${className}`}>
      {service.priceIsFrom && <small>desde</small>}
      {onSale && (
        <s aria-label={`Precio regular S/ ${service.priceRegular}`}>S/ {service.priceRegular}</s>
      )}
      <b>S/ {service.priceFrom}</b>
    </span>
  );
}
