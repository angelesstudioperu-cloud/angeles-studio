import { NativeLink as Link } from '../components/NativeLink';
import { BookingForm } from '../components/BookingForm';
import { MotionEffects } from '../components/MotionEffects';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { business, whatsappLink } from '../content/business';

export const metadata = {
  title: 'Reservar cita',
  description:
    'Solicita tu cita en Ángeles Nails Salon, Los Olivos. Elige servicio, fecha y horario y te confirmamos disponibilidad por WhatsApp.',
};

const steps = [
  ['01', 'Envías tu solicitud', 'Eliges servicio, fecha y horario. El formulario arma el mensaje y abre tu WhatsApp listo para enviar.'],
  ['02', 'Confirmamos disponibilidad', 'Revisamos la agenda y te respondemos con la hora exacta y el tiempo estimado del servicio.'],
  ['03', 'Queda reservada', 'Tu cita solo está confirmada cuando te lo decimos por escrito. Si necesitas mover la hora, avísanos con anticipación.'],
];

export default async function BookingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const preselect = typeof query.servicio === 'string' ? query.servicio : undefined;

  return (
    <main className="subpage subpage-reservar">
      <MotionEffects />
      <a className="skip-link" href="#formulario">Saltar al formulario</a>
      <SiteHeader current="/reservar" />

      {/* El formulario abre la página: es a lo que viene quien entra aquí. */}
      <section className="booking booking-first" id="formulario">
        <div className="booking-card">
          <p className="booking-card-title">Solicita tu cita</p>
          <BookingForm preselect={preselect} />
        </div>

        <div className="booking-heading">
          <h2 className="booking-title">Hagamos espacio <em>para ti.</em></h2>
          <p className="booking-note">
            El formulario arma el mensaje y lo abre en tu WhatsApp. Separas la cita con un adelanto de{' '}
            <strong>S/ {business.bookingDeposit}</strong>, que se descuenta del total.
          </p>

          <ol className="booking-flow">
            {steps.map(([number, title, copy]) => (
              <li key={number}>
                <span aria-hidden="true">{number}</span>
                <b>{title}</b>
                <small>{copy}</small>
              </li>
            ))}
          </ol>

          <div className="booking-links">
            <a className="text-link" href={whatsappLink(`Hola, ${business.name}. Quisiera reservar una cita.`)} target="_blank" rel="noreferrer">
              Prefiero escribir directo <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href="/servicios">
              Revisar precios <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
