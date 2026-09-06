import { business, whatsappLink } from '../content/business';

const greeting = `Hola, ${business.name}. Quisiera consultar por una cita.`;

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink(greeting)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribir a ${business.name} por WhatsApp`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.4L3 29l6.8-1.7A13 13 0 1 0 16 3Zm0 2.4a10.6 10.6 0 1 1-5.5 19.6l-.4-.2-4 1 1.1-3.9-.3-.4A10.6 10.6 0 0 1 16 5.4Zm-4.8 5c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.7-.4l-2.3-1.2c-.3-.1-.6-.2-.8.2l-1.1 1.4c-.2.2-.4.3-.7.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6.1-.2.1-.5 0-.7l-1-2.4c-.2-.6-.5-.5-.7-.5h-.5Z"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
