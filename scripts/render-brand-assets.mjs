// Renderiza el diseño vectorial propio para las vistas previas de enlaces.
import sharp from 'sharp';

await sharp('public/brand/angeles-social-card.svg')
  .png()
  .toFile('public/brand/angeles-social-card.png');
console.log('Tarjeta social generada: 1200 x 630.');
