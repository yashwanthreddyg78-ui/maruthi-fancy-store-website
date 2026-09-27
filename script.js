const STORE_NUMBER = '917330001111';

function openWhatsApp(message) {
  window.open(`https://wa.me/${STORE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

function contactWhatsApp(subject) {
  openWhatsApp(`Hello Maruthi Fancy Store, I am interested in ${subject}. Please share more details.`);
}

function scrollToProducts() {
  const section = document.querySelector('.featured-products');
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (menu && links) menu.addEventListener('click', () => links.classList.toggle('open'));

  document.querySelectorAll('.inquire').forEach(button => {
    button.addEventListener('click', () => contactWhatsApp(button.dataset.product));
  });

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.catalog-grid .product-card');
  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.category;
    cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  }));

  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    openWhatsApp(`Hello Maruthi Fancy Store, my name is ${data.get('name')}. My phone number is ${data.get('phone')}. ${data.get('message')}`);
    const status = document.querySelector('#form-status');
    status.textContent = 'Your enquiry is ready in WhatsApp. Please press Send to contact us.';
    form.reset();
  });
});
