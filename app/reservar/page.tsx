import Link from 'next/link';
import { BookingForm } from '../components/BookingForm';
import { MotionEffects } from '../components/MotionEffects';
import { PageHero } from '../components/PageHero';
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

      <PageHero
        breadcrumb="Reservar"
        eyebrow="Reserva"
        title={<span className="booking-title">Hagamos espacio <em>para ti.</em></span>}
        intro="Atendemos con cita previa. Cuéntanos qué buscas y cuándo te queda cómodo, y coordinamos el resto por WhatsApp."
        image={{ src: '/images/servicio-pies.webp', alt: 'Pedicure spa en gel en proceso', width: 1400, height: 2100 }}
        caption={{ index: '02', text: <>Pedicure spa<br />desde S/ 40.</> }}
        actions={
          <a className="text-link" href={whatsappLink(`Hola, ${business.name}. Quisiera reservar una cita.`)} target="_blank" rel="noreferrer">
            Prefiero escribir directo <span aria-hidden="true">↗</span>
          </a>
        }
      />

      <section className="booking-steps" aria-label="Cómo funciona la reserva">
        {steps.map(([number, title, copy]) => (
          <article key={number}>
            <span aria-hidden="true">{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="booking" id="formulario">
        <div className="booking-heading">
          <p className="eyebrow">Formulario</p>
          <h2 className="booking-title">Cuéntanos <em>qué necesitas.</em></h2>
          <p>
            El formulario arma el mensaje y lo abre en tu WhatsApp. Separas la cita con un adelanto de{' '}
            <strong>S/ {business.bookingDeposit}</strong>, que se descuenta del total.
          </p>
          <Link className="text-link" href="/servicios">Revisar precios antes <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="booking-card">
          <BookingForm preselect={preselect} />
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
