import { NativeLink as Link } from './NativeLink';
import { BrandLogo } from './BrandLogo';
import { addressLines, business, emailUrl, hoursLine, whatsappUrl } from '../content/business';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <BrandLogo size="lg" />
        <p>{business.tagline}</p>
        <address>
          {addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>{hoursLine}</span>
          <span>{business.hours.closed} · {business.bookingPolicy.toLowerCase()}</span>
        </address>
      </div>

      <div>
        <h3>Explora</h3>
        <Link href="/servicios">Servicios y precios</Link>
        <Link href="/galeria">Galería</Link>
        <Link href="/nosotros">El studio</Link>
        <Link href="/contacto">Cómo llegar</Link>
        <Link href="/reservar">Reservar</Link>
      </div>

      <div>
        <h3>Conecta</h3>
        <a href={business.social.instagram.url} target="_blank" rel="noreferrer">
          Instagram {business.social.instagram.handle} ↗
        </a>
        <a href={business.social.tiktok.url} target="_blank" rel="noreferrer">
          TikTok {business.social.tiktok.handle} ↗
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp {business.whatsappDisplay} ↗
        </a>
        <a href={emailUrl}>{business.email}</a>
        <a href={business.mapsUrl} target="_blank" rel="noreferrer">
          Ver en Google Maps ↗
        </a>
      </div>

      <div>
        <h3>Legal</h3>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/terminos">Términos</Link>
        <Link href="/libro-de-reclamaciones">Libro de reclamaciones</Link>
      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} {business.name} · {business.address.district}, {business.address.city}
      </p>
    </footer>
  );
}
