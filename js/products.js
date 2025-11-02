// Filtros para index.html y products.html
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gridProductos');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const VALID = new Set(['all','collares','brazaletes','aros','anillos','limitada','destacados']);

  function applyCategoryFilter(category) {
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    cards.forEach(card => {
      const col = card.closest('.col');
      if (!col) return;
      const cat = (card.dataset.categoria || '').toLowerCase().trim();
      col.classList.toggle('d-none', !(category === 'all' || cat === category));
    });
  }

  function setActiveAndFilter(category) {
    filterButtons.forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`[data-filter="${category}"]`);
    if (btn) btn.classList.add('active');
    applyCategoryFilter(category);
  }

  function applyFromHash() {
    const raw = (location.hash || '').replace('#','').trim().toLowerCase();
    const cat = VALID.has(raw) ? raw : 'all';
    setActiveAndFilter(cat);
  }

  // Click en botones de filtro (products.html)
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => setActiveAndFilter(btn.dataset.filter));
  });

  // Estado inicial + responder a cambios de hash
  applyFromHash();
  window.addEventListener('hashchange', applyFromHash);

  // Navegación a product.html?id=1 al clickear cualquier .product-card (index y productos)
  document.addEventListener('click', (evt) => {
    const card = evt.target.closest('.product-card');
    if (!card) return;
    if (evt.target.closest('a,button,input,select,label,textarea')) return;
    window.location.href = 'product.html?id=1';
  });
});
