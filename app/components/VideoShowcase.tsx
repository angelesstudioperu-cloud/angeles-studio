import { business } from '../content/business';

/**
 * Huecos de video para el material que grabe el salón. Se reemplaza cada
 * `.video-tile` por un <video src=… controls poster=…> cuando llegue.
 */
const tiles = [
  { id: 'manos', label: 'Uñas en cabina' },
  { id: 'mirada', label: 'Lifting y cejas' },
  { id: 'pies', label: 'Pedicure spa' },
];

export function VideoShowcase() {
  return (
    <section className="videos" aria-labelledby="videos-title">
      <div className="section-bar">
        <div>
          <p className="eyebrow">En video</p>
          <h2 id="videos-title">Míranos trabajar.</h2>
          <p className="section-lead">
            Estamos grabando el proceso de cada servicio en cabina. Mientras tanto, los trabajos del día
            salen en nuestro TikTok.
          </p>
        </div>
        <a className="text-link" href={business.social.tiktok.url} target="_blank" rel="noreferrer">
          TikTok {business.social.tiktok.handle} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="videos-grid">
        {tiles.map((tile) => (
          <div className="video-tile" key={tile.id}>
            <span className="video-tile-icon" aria-hidden="true">▶</span>
            <p>{tile.label}</p>
            <small>Próximamente</small>
          </div>
        ))}
      </div>
    </section>
  );
}
