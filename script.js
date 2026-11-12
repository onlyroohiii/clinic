const form = document.querySelector('#booking-form');
const message = document.querySelector('#form-message');
const STORE_KEY = 'dermadent-demo-appointment-requests';

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.header nav').classList.toggle('open');
});
document.querySelectorAll('.header nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.header nav').classList.remove('open')));

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  list.unshift({ ...data, created: new Date().toLocaleString() });
  localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, 30)));
  message.textContent = 'Request saved in this browser demo. Connect a secure booking service to receive real appointment requests.';
  form.reset();
});

const dialog = document.querySelector('#admin-dialog');
const renderInbox = () => {
  const requests = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  const list = document.querySelector('#admin-list');
  list.innerHTML = requests.length ? requests.map(item => `<article class="admin-request"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.phone)} · ${escapeHtml(item.service || 'No service selected')}</p><p>${escapeHtml(item.email || '')} ${escapeHtml(item.message || '')}</p><small>${escapeHtml(item.created)}</small></article>`).join('') : '<div class="admin-empty">No demo requests saved in this browser yet.</div>';
};
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
document.querySelector('#admin-open').addEventListener('click', () => { renderInbox(); dialog.showModal(); });
document.querySelector('#admin-close').addEventListener('click', () => dialog.close());
document.querySelector('#clear-requests').addEventListener('click', () => { localStorage.removeItem(STORE_KEY); renderInbox(); });
