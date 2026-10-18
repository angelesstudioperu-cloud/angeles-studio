'use client';

import { useState } from 'react';
import { addressLines, business } from '../content/business';

const { lat, lng } = business.geo;
const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=17&output=embed`;

/**
 * Mapa real de Google Maps.
 * El CSP permite `frame-src https://www.google.com` únicamente para este embed.
 */
export function LocationMap({ tone = 'light' }: { tone?: 'light' | 'peony' }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`location-map location-map-${tone}`}>
      {loaded ? <iframe
        src={embedUrl}
        title={`Ubicación de ${business.name} en Google Maps`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      /> : <div className="map-consent">
        <p>Encuentranos en Los Olivos</p>
        <button type="button" className="button button-primary" onClick={() => setLoaded(true)}>Cargar mapa de Google</button>
        <small>Al cargarlo te conectas con Google. También puedes <a href={business.mapsUrl} target="_blank" rel="noreferrer">abrir la ubicación ↗</a>.</small>
      </div>}
      <div className="location-map-card">
        <p className="eyebrow">Estamos aquí</p>
        <address>
          {addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>

      </div>
    </div>
  );
}
