function toggleProductDropdown() {
  const dropdown = document.getElementById('productDropdown');
  dropdown.classList.toggle('show');
}

function selectProduct(sku, name, description, price, stock) {
  if (stock <= 0) return; // No permitir productos sin stock
  
  // Limpiar el campo de búsqueda
  document.getElementById('productSearch').value = '';
  
  // Cerrar dropdown
  document.getElementById('productDropdown').classList.remove('show');
  
  // En una implementación real, aquí se añadiría una nueva fila a la tabla de productos
  console.log('Agregando producto:', sku, name, price, stock);
  
  // TODO: Añadir fila a la tabla con los datos del producto
}

function filterProducts() {
  const searchInput = document.getElementById('productSearch');
  const searchValue = searchInput.value.toLowerCase();
  const productOptions = document.querySelectorAll('.product-option');
  
  productOptions.forEach(option => {
    const text = option.textContent.toLowerCase();
    if (text.includes(searchValue)) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
  
  // Mostrar dropdown si hay texto
  const dropdown = document.getElementById('productDropdown');
  if (searchValue.length > 0) {
    dropdown.classList.add('show');
  } else {
    dropdown.classList.remove('show');
  }
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('productDropdown');
  const searchInput = document.getElementById('productSearch');
  
  if (!dropdown.contains(event.target) && !searchInput.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

function toggleClientDropdown() {
  const dropdown = document.getElementById('clientDropdown');
  dropdown.classList.toggle('show');
}

function selectClient(id, fullName, email, nombre, apellido, telefono) {
  document.getElementById('clientSearch').value = fullName + ' - ' + email;
  document.getElementById('clientId').value = id;
  document.getElementById('clientEmail').value = email;
  document.getElementById('clientNombre').value = nombre;
  document.getElementById('clientApellido').value = apellido;
  document.getElementById('clientTelefono').value = telefono;

  // Cerrar dropdown
  document.getElementById('clientDropdown').classList.remove('show');
}

function filterClients() {
  const searchInput = document.getElementById('clientSearch');
  const searchValue = searchInput.value.toLowerCase();
  const clientOptions = document.querySelectorAll('.client-option');

  clientOptions.forEach(option => {
    const text = option.textContent.toLowerCase();
    if (text.includes(searchValue)) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });

  // Mostrar dropdown si hay texto
  const dropdown = document.getElementById('clientDropdown');
  if (searchValue.length > 0) {
    dropdown.classList.add('show');
  }

  // Limpiar campos si el input está vacío
  if (searchValue === '') {
    document.getElementById('clientId').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('clientNombre').value = '';
    document.getElementById('clientApellido').value = '';
    document.getElementById('clientTelefono').value = '';
    dropdown.classList.remove('show');
  }
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('clientDropdown');
  const searchInput = document.getElementById('clientSearch');

  if (!dropdown.contains(event.target) && !searchInput.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

function increaseQuantity(button) {
  const quantitySpan = button.parentElement.querySelector('.quantity-value');
  let currentQuantity = parseInt(quantitySpan.textContent);
  quantitySpan.textContent = currentQuantity + 1;
  updateSubtotal(button);
}

function decreaseQuantity(button) {
  const quantitySpan = button.parentElement.querySelector('.quantity-value');
  let currentQuantity = parseInt(quantitySpan.textContent);
  if (currentQuantity > 1) {
    quantitySpan.textContent = currentQuantity - 1;
    updateSubtotal(button);
  }
}

function updateSubtotal(button) {
  // En una implementación real, aquí se actualizarían los subtotales y el total
  const row = button.closest('tr');
  const quantitySpan = row.querySelector('.quantity-value');
  const quantity = parseInt(quantitySpan.textContent);
  
  // Obtener precio unitario (esto sería dinámico en una implementación real)
  const priceCell = row.querySelector('.text-end.d-none.d-md-table-cell');
  if (priceCell) {
    const unitPrice = parseFloat(priceCell.textContent.replace('€', '').replace(',', '.'));
    const subtotalCell = row.querySelector('td:nth-last-child(2)'); // Penúltima columna
    const newSubtotal = (unitPrice * quantity).toFixed(2);
    subtotalCell.textContent = '€' + newSubtotal.replace('.', ',');
  }
  
  // Actualizar total general
  updateTotals();
}

function updateTotals() {
  let subtotalProducts = 0;
  
  // Calcular subtotal de productos
  const subtotalCells = document.querySelectorAll('#orderProducts tbody tr td:nth-last-child(2)');
  subtotalCells.forEach(cell => {
    const value = parseFloat(cell.textContent.replace('€', '').replace(',', '.'));
    if (!isNaN(value)) {
      subtotalProducts += value;
    }
  });

  // Costos fijos
  const shipping = 0; // Envío gratuito
  
  // Calcular total (sin impuestos)
  const total = subtotalProducts + shipping;
  
  // Actualizar elementos del DOM
  document.getElementById('subtotalProductos').textContent = '€' + subtotalProducts.toFixed(2).replace('.', ',');
}
