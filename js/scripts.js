
//GALERÍA DE PRODUCTO   DETALLE       
document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('.product-thumbnail');

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function () {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');

        // Cambiar imagen principal
        const newImageSrc = this.getAttribute('data-main-image');
        const newImageAlt = this.getAttribute('alt');
        mainImage.src = newImageSrc;
        mainImage.alt = newImageAlt;
        mainImage.style.opacity = '0.7';
        setTimeout(() => {
          mainImage.style.opacity = '1';
        }, 150);
      });
    });
  }
});

// Función para mostrar modal de compra exitosa
function showSuccessPurchaseModal() {

  //  modal
  const modalHTML = `
    <div class="modal fade" id="successPurchaseModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content card-bg">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center py-4">
                    <div class="mb-4">
                        <i class="bi bi-cart-check-fill custom-text-primary custom-icon-large"></i>
                    </div>
                    <h2 class="mb-3 custom-text-primary">¡Compra Exitosa!</h2>
                    <p class="text-muted mb-4">Tu pedido ha sido procesado correctamente y está siendo preparado para el envío.</p>
                    
                    <div class="alert custom-alert mb-4">
                        <h3 class="alert-heading custom-text-primary">Detalles de tu compra</h3>
                        <p class="mb-1">N° de pedido: <span class="custom-bold">#247635</span></p>
                        <p class="mb-0">Fecha: <span class="custom-bold">05/09/2025</span></p>
                    </div>
                    
                    <p class="small text-muted mb-4">
                        Puedes ver el estado de tu pedido y hacer seguimiento desde tu perfil en cualquier momento.
                    </p>
                </div>
                <div class="modal-footer border-0 justify-content-center">
                    <button type="button" class="custom-btn btn-primary-custom" data-redirect="index.html">
                        <i class="bi bi-house me-2"></i>Volver al inicio
                    </button>
                    <button type="button" class="custom-btn btn-outline-custom" data-redirect="profile.html">
                        <i class="bi bi-person me-2"></i>Ver mi perfil
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = new bootstrap.Modal(document.getElementById('successPurchaseModal'));
  modal.show();
  const redirectButtons = document.querySelectorAll('#successPurchaseModal [data-redirect]');
  redirectButtons.forEach(button => {
    button.addEventListener('click', function () {
      window.location.href = this.dataset.redirect;
    });
  });

  // Redirigir cuando cierro el modal
  document.getElementById('successPurchaseModal').addEventListener('hidden.bs.modal', function () {
    window.location.href = 'index.html';
  });
}

// Función para mostrar notificación de contacto
function showContactNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
  notification.style.zIndex = '1060';
  notification.style.transition = 'opacity 0.5s ease-in-out';
  notification.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        ${message}
    `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Carousel 
function initMultiViewCarousel() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const imageWrappers = document.querySelectorAll('.multi-view .image-wrapper');

  // Chequea en desktop si existe prevBtn y nextBtn
  if (!prevBtn || !nextBtn || imageWrappers.length === 0) return;

  let currentActiveIndex = 1; // empieza con la 2da imagen activa (cuestión visual)

  function updateGallery() {
    // Reset de imagenes
    imageWrappers.forEach((wrapper, index) => {
      const img = wrapper.querySelector('.gallery-img');
      wrapper.classList.add('d-none');
      img.classList.remove('active');
    });
    for (let i = -1; i <= 1; i++) {
      const imageIndex = (currentActiveIndex + i + imageWrappers.length) % imageWrappers.length;
      const wrapper = imageWrappers[imageIndex];
      const img = wrapper.querySelector('.gallery-img');
      wrapper.classList.remove('d-none');
      if (i === 0) {
        img.classList.add('active');
      }
    }
  }

  function nextImage() {
    currentActiveIndex = (currentActiveIndex + 1) % imageWrappers.length;
    updateGallery();
  }
  function prevImage() {
    currentActiveIndex = (currentActiveIndex - 1 + imageWrappers.length) % imageWrappers.length;
    updateGallery();
  }
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);
  let autoAdvanceInterval = setInterval(nextImage, 4000);
  const carouselContainer = document.querySelector('.multi-view-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoAdvanceInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      autoAdvanceInterval = setInterval(nextImage, 4000);
    });
  }
  updateGallery();
}

// Notificación de envío de formulario de contacto
document.addEventListener('DOMContentLoaded', function () {

  initMultiViewCarousel();
  const contactForm = document.querySelector('.contact-arch-form form');

  //Form de contacto - Éxito
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showContactNotification('Formulario de contacto enviado con éxito. Te responderemos pronto.');
      contactForm.reset();
    });
  }

  // Checkout - Modal de compra exitosa
  const payButton = document.getElementById('payButton');
  const checkoutForm = document.getElementById('checkoutForm');

  if (payButton && checkoutForm) {

    payButton.addEventListener('click', function (e) {
      e.preventDefault();

      let isValid = true;
      const inputs = checkoutForm.querySelectorAll('input[required]');
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        showSuccessPurchaseModal();
      } else {
        showContactNotification('Por favor, completa todos los campos requeridos.');
      }
    });
  }
});

// Modernismo Catalán - Animación para todos los elementos
function initModernismAnimation() {
  const elements = document.querySelectorAll('.modernism-image, .modernism-content, .modernism-title, .modernism-text');

  if (elements.length === 0) return;

  function checkVisibility() {
    elements.forEach(element => {
      const position = element.getBoundingClientRect();

      // Si el elemento está en el viewport
      if (position.top < window.innerHeight - 100 && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
  }

  // Verifico al cargar y al hacer scroll
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
}
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length === 0) return;
  function checkTimelineVisibility() {
    timelineItems.forEach(item => {
      const position = item.getBoundingClientRect();
      if (position.top < window.innerHeight - 150 && !item.classList.contains('animated')) {
        item.classList.add('animated');
      }
    });
  }
  checkTimelineVisibility();
  window.addEventListener('scroll', checkTimelineVisibility);
}
// cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initModernismAnimation();
    initTimelineAnimation();
  });
} else {
  initModernismAnimation();
  initTimelineAnimation();
}

//VIDEO
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');

  function getVideoSource(isMobile) {
    return isMobile ? heroVideo.dataset.srcMobile : heroVideo.dataset.srcDesktop;
  }

  function updateHeroVideo(event) {
    const isMobile = event.matches ?? mobileMediaQuery.matches;
    const newSource = getVideoSource(isMobile);

    if (heroVideo.currentSrc && heroVideo.currentSrc.includes(newSource)) return;

    const wasPlaying = !heroVideo.paused && !heroVideo.ended;

    heroVideo.src = newSource;
    heroVideo.load();

    if (wasPlaying || heroVideo.autoplay) {
      heroVideo.play().catch(() => { });
    }
  }

  updateHeroVideo(mobileMediaQuery);

  if (mobileMediaQuery.addEventListener) {
    mobileMediaQuery.addEventListener('change', updateHeroVideo);
  } else {
    mobileMediaQuery.addListener(updateHeroVideo);
  }
}

// Control de cantidad - funcionalidad puramente  visual para carrito y productos
document.addEventListener('DOMContentLoaded', function () {
  const quantityControls = document.querySelectorAll('.quantity-controls');

  quantityControls.forEach(control => {
    const minusBtn = control.querySelector('.bi-dash').parentElement;
    const plusBtn = control.querySelector('.bi-plus').parentElement;
    const quantitySpan = control.querySelector('span');
    const quantityValue = control.querySelector('.quantity-value');

    // Para carrito (usa span normal)
    if (quantitySpan && !quantityValue) {
      minusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantitySpan.textContent);
        if (currentQuantity > 1) {
          quantitySpan.textContent = currentQuantity - 1;
        }
      });

      plusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantitySpan.textContent);
        quantitySpan.textContent = currentQuantity + 1;
      });
    }

    // Para página de producto (usa .quantity-value)
    if (quantityValue) {
      minusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantityValue.textContent);
        if (currentQuantity > 1) {
          quantityValue.textContent = currentQuantity - 1;
        }
      });

      plusBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let currentQuantity = parseInt(quantityValue.textContent);
        quantityValue.textContent = currentQuantity + 1;
      });
    }
  });

  // data-action para mayor flexibilidad 
  const quantityButtons = document.querySelectorAll('.quantity-btn');

  quantityButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const action = this.dataset.action;
      const control = this.closest('.quantity-controls');
      const quantityDisplay = control.querySelector('.quantity-value') || control.querySelector('span');

      if (quantityDisplay) {
        let currentQuantity = parseInt(quantityDisplay.textContent);

        if (action === 'decrease' && currentQuantity > 1) {
          quantityDisplay.textContent = currentQuantity - 1;
        } else if (action === 'increase') {
          quantityDisplay.textContent = currentQuantity + 1;
        }
      }
    });
  });
});

// ===== "AUTENTICACIÓN " : Para facilitar la prueba visual del flujon=====
const AUTH_KEY = 'is_auth';
const ADMIN_AUTH_KEY = 'is_admin_auth';

// Estado de sesión de usuarios
function isLoggedIn() { return sessionStorage.getItem(AUTH_KEY) === '1'; }
function setLoggedIn() { sessionStorage.setItem(AUTH_KEY, '1'); }
function clearLoggedIn() { sessionStorage.removeItem(AUTH_KEY); }

// Estado de sesión de administradores
function isAdminLoggedIn() { return sessionStorage.getItem(ADMIN_AUTH_KEY) === '1'; }
function setAdminLoggedIn() { sessionStorage.setItem(ADMIN_AUTH_KEY, '1'); }
function clearAdminLoggedIn() { sessionStorage.removeItem(ADMIN_AUTH_KEY); }

// Actualizar navbar según sesión
function updateNavbar() {
  const guestMenu = document.querySelector('#navGuest');
  const userMenu = document.querySelector('#navUser');
  const profileName = document.querySelector('#navProfileName');
  const loginLink = document.querySelector('#navGuest a');

  if (!guestMenu || !userMenu) return;

  if (isLoggedIn()) {
    if (profileName) profileName.textContent = 'Mi perfil'; // fijo (mock)
    guestMenu.classList.add('d-none');
    userMenu.classList.remove('d-none');
  } else {
    userMenu.classList.add('d-none');
    guestMenu.classList.remove('d-none');
    // Asegurar que el enlace apunte a login.html cuando no está logueado
    if (loginLink) loginLink.href = 'login.html';
  }
}

// Redirecciones en páginas con restricción (es limitado obviamente)
function handleRouteGuards() {
  if (document.body.dataset.needAuth === 'true' && !isLoggedIn()) {
    location.replace('login.html');
  }
  if (document.body.dataset.needGuest === 'true' && isLoggedIn()) {
    location.replace('profile.html');
  }
  if (document.body.dataset.needAdminGuest === 'true' && isAdminLoggedIn()) {
    location.replace('dashboard.html');
  }
  if (document.body.dataset.needAdminAuth === 'true' && !isAdminLoggedIn()) {
    // If we're already in admin directory, use relative path, otherwise use full path
    if (window.location.pathname.includes('/admin/')) {
      location.replace('login.html');
    } else {
      location.replace('admin/login.html');
    }
  }
}

// Eventos de formularios y logout
function setupAuthEvents() {
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (loginForm.checkValidity()) {
        setLoggedIn();
        location.href = 'profile.html';
      } else {
        loginForm.reportValidity();
      }
    });
  }

  const adminLoginForm = document.querySelector('#adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (adminLoginForm.checkValidity()) {
        setAdminLoggedIn();
        location.href = 'dashboard.html'; // Redirigir al dashboard de admin
      } else {
        adminLoginForm.reportValidity();
      }
    });
  }

  const registerForm = document.querySelector('#registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (registerForm.checkValidity()) {
        setLoggedIn();
        location.href = 'profile.html';
      } else {
        registerForm.reportValidity();
      }
    });
  }

  const logoutButton = document.querySelector('#btnLogout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      // Si estamos en admin, hacer logout de admin
      if (window.location.pathname.includes('/admin/')) {
        clearAdminLoggedIn();
        location.href = 'login.html';
      } else {
        clearLoggedIn();
        location.href = 'index.html';
      }
    });
  }
}

function validatePasswordStrength(input) {
  const isValid = input.value.length >= 8;
  input.classList.toggle('is-invalid', !isValid);
  input.classList.toggle('is-valid', isValid && input.value.length > 0);
  return isValid;
}

function validateEditUserPasswordStrength(input) {
  // Para edit user, campo vacío es válido (mantener contraseña actual)
  if (input.value.length === 0) {
    input.classList.remove('is-invalid', 'is-valid');
    return true;
  }
  
  const isValid = input.value.length >= 8;
  input.classList.toggle('is-invalid', !isValid);
  input.classList.toggle('is-valid', isValid);
  return isValid;
}

function validatePasswordMatch() {
  const password = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  
  if (!password || !confirmPassword) return true;
  
  const isMatching = password.value === confirmPassword.value;
  const hasValue = confirmPassword.value.length > 0;
  
  confirmPassword.classList.toggle('is-invalid', !isMatching && hasValue);
  confirmPassword.classList.toggle('is-valid', isMatching && hasValue);
  
  return isMatching;
}

function validateAdminPasswordMatch() {
  const password = document.getElementById('adminPassword');
  const confirmPassword = document.getElementById('adminPasswordConfirm');
  
  if (!password || !confirmPassword) return true;
  
  const isMatching = password.value === confirmPassword.value;
  const hasValue = confirmPassword.value.length > 0;
  
  confirmPassword.classList.toggle('is-invalid', !isMatching && hasValue);
  confirmPassword.classList.toggle('is-valid', isMatching && hasValue);
  
  return isMatching;
}

function validateUserPasswordMatch() {
  const password = document.getElementById('newUserPassword');
  const confirmPassword = document.getElementById('confirmUserPassword');
  
  if (!password || !confirmPassword) return;
  
  const isMatching = password.value === confirmPassword.value;
  confirmPassword.classList.toggle('is-invalid', !isMatching && confirmPassword.value.length > 0);
  confirmPassword.classList.toggle('is-valid', isMatching && confirmPassword.value.length > 0);
  
  return isMatching;
}

function validateEditUserPasswordMatch() {
  const password = document.getElementById('editUserPassword');
  const confirmPassword = document.getElementById('confirmEditUserPassword');
  
  if (!password || !confirmPassword) return;

  if (!password.value && !confirmPassword.value) {
    confirmPassword.classList.remove('is-invalid', 'is-valid');
    return true;
  }
  
  const isMatching = password.value === confirmPassword.value;
  confirmPassword.classList.toggle('is-invalid', !isMatching && confirmPassword.value.length > 0);
  confirmPassword.classList.toggle('is-valid', isMatching && confirmPassword.value.length > 0);
  
  return isMatching;
}

function setupPasswordValidation() {
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  if (newPasswordInput && confirmPasswordInput) {
    newPasswordInput.addEventListener('input', (e) => validatePasswordStrength(e.target));
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
  }

  const adminPasswordInput = document.getElementById('adminPassword');
  const adminConfirmPasswordInput = document.getElementById('adminPasswordConfirm');
  
  if (adminPasswordInput && adminConfirmPasswordInput) {
    adminPasswordInput.addEventListener('input', (e) => validatePasswordStrength(e.target));
    adminConfirmPasswordInput.addEventListener('input', validateAdminPasswordMatch);
  }

  const newUserPasswordInput = document.getElementById('newUserPassword');
  const confirmUserPasswordInput = document.getElementById('confirmUserPassword');
  
  if (newUserPasswordInput && confirmUserPasswordInput) {
    newUserPasswordInput.addEventListener('input', (e) => validatePasswordStrength(e.target));
    confirmUserPasswordInput.addEventListener('input', validateUserPasswordMatch);
  }

  const editUserPasswordInput = document.getElementById('editUserPassword');
  const confirmEditUserPasswordInput = document.getElementById('confirmEditUserPassword');
  
  if (editUserPasswordInput && confirmEditUserPasswordInput) {
    editUserPasswordInput.addEventListener('input', (e) => validateEditUserPasswordStrength(e.target));
    confirmEditUserPasswordInput.addEventListener('input', validateEditUserPasswordMatch);
  }
}

// ===== FUNCIONALIDAD DE PERFIL =====
// Funcionalidad del botón guardar perfil
function setupProfileEvents() {
  const saveBtn = document.getElementById('btnSaveProfile');
  const msgBox = document.getElementById('profileMessage');
  const changePasswordForm = document.getElementById('changePasswordForm');

  const showMessage = (message, isError = false) => {
    if (!msgBox) return;
    
    const alertClass = isError ? 'alert-danger' : 'alert-success';
    msgBox.innerHTML = `
      <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    msgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showMessage('<strong>Perfil actualizado correctamente.</strong>');
    });
  }

  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const currentPassword = document.getElementById('currentPassword')?.value;
      const newPassword = document.getElementById('newPassword')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      
      // Trigger validation
      document.getElementById('newPassword').dispatchEvent(new Event('input'));
      document.getElementById('confirmPassword').dispatchEvent(new Event('input'));
      
      // Check if any field is invalid
      const invalidFields = changePasswordForm.querySelectorAll('.is-invalid');
      if (invalidFields.length > 0) {
        return; // Don't submit if there are validation errors
      }
      
      if (!currentPassword || !newPassword || !confirmPassword) {
        return;
      }
      
      // If we get here, the form is valid
      showMessage('<strong>Contraseña cambiada correctamente.</strong>');
      changePasswordForm.reset();
    });
  }

  // Funcionalidad para admin
  const saveAdminBtn = document.getElementById('btnSaveAdminProfile');
  const adminMsgBox = document.getElementById('adminProfileMessage');

  if (saveAdminBtn && adminMsgBox) {
    // Función para mostrar mensaje
    const showAdminMessage = (message, isError = false) => {
      const alertClass = isError ? 'alert-danger' : 'alert-success';
      adminMsgBox.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      adminMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    saveAdminBtn.addEventListener('click', () => {
      showAdminMessage('<strong>Perfil de administrador actualizado correctamente.</strong>');
    });

    if (changePasswordForm) {
      changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword')?.value;
        const newPassword = document.getElementById('adminPassword')?.value;
        const confirmPassword = document.getElementById('adminPasswordConfirm')?.value;
        
        // Trigger validation
        document.getElementById('adminPassword').dispatchEvent(new Event('input'));
        document.getElementById('adminPasswordConfirm').dispatchEvent(new Event('input'));
        
        // Check if any field is invalid
        const invalidFields = changePasswordForm.querySelectorAll('.is-invalid');
        if (invalidFields.length > 0) {
          return; // Don't submit if there are validation errors
        }
        
        if (!currentPassword || !newPassword || !confirmPassword) {
          return;
        }
        
        // If we get here, the form is valid
        changePasswordForm.reset();
      });
    }
  }

  // Funcionalidad para producto-editar
  const productEditForm = document.getElementById('productEditForm');
  const productEditMsgBox = document.getElementById('productEditMessage');

  if (productEditForm && productEditMsgBox) {
    productEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      productEditMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Cambios realizados con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      productEditMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Funcionalidad para categoria-editar
  const categoryEditForm = document.getElementById('categoryEditForm');
  const categoryEditMsgBox = document.getElementById('categoryEditMessage');

  if (categoryEditForm && categoryEditMsgBox) {
    categoryEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      categoryEditMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Cambios realizados con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      categoryEditMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Funcionalidad para producto-nuevo
  const productNewForm = document.getElementById('productNewForm');
  const productNewMsgBox = document.getElementById('productNewMessage');

  if (productNewForm && productNewMsgBox) {
    productNewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      productNewMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Producto creado con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      productNewMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Funcionalidad para categoria-nueva
  const categoryCreateForm = document.getElementById('categoryCreateForm');
  const categoryCreateMsgBox = document.getElementById('categoryCreateMessage');

  if (categoryCreateForm && categoryCreateMsgBox) {
    categoryCreateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      categoryCreateMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Categoría creada con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      categoryCreateMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Funcionalidad para usuario-nuevo
  const userCreateForm = document.getElementById('userCreateForm');
  const userCreateMsgBox = document.getElementById('userCreateMessage');

  if (userCreateForm && userCreateMsgBox) {
    userCreateForm.addEventListener('submit', (e) => {
      e.preventDefault();

      userCreateMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Usuario creado con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      userCreateMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Funcionalidad para usuario-editar
  const userEditForm = document.getElementById('userEditForm');
  const userEditMsgBox = document.getElementById('userEditMessage');

  if (userEditForm && userEditMsgBox) {
    userEditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      userEditMsgBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Cambios realizados con éxito.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      userEditMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

// Inicializar funcionalidad de autenticación y perfil
document.addEventListener('DOMContentLoaded', () => {
  // Para wireframe: auto-login admin en páginas admin (excepto login)
  if (window.location.pathname.includes('/admin/') && 
      !window.location.pathname.includes('login.html') && 
      !isAdminLoggedIn()) {
    setAdminLoggedIn();
  }
  
  handleRouteGuards();
  updateNavbar();
  setupAuthEvents();
  setupPasswordValidation();
  setupProfileEvents();
});

// ========================================================================== 
// FUNCIONES ADMIN 
// ========================================================================== 

// Función para cambiar la cantidad de productos en la página de nueva orden
// Controla los límites máximos según el stock disponible de cada producto
function changeQuantity(productId, change) {
  const span = document.getElementById('qty_' + productId);
  if (!span) return; // Si no existe el elemento, sale

  const currentValue = parseInt(span.textContent);
  let maxValue = 999; 

  // límites máximos por producto según stock disponible
  if (productId === 'prod1') maxValue = 15;
  else if (productId === 'prod3') maxValue = 6;
  else if (productId === 'prod4') maxValue = 3;

  const newValue = Math.max(0, Math.min(maxValue, currentValue + change));
  span.textContent = newValue;
}

// Función para agregar productos a la orden en proceso
// Valida que haya cantidad seleccionada antes de agregar
function addToOrder(productId) {
  const qtySpan = document.getElementById('qty_' + productId);
  if (!qtySpan) return; // Si no existe el elemento, salir

  const quantity = parseInt(qtySpan.textContent);

  if (quantity > 0) {
    alert(`Agregado ${quantity} producto(s) a la orden`);
  } else {
    alert('Seleccione una cantidad mayor a 0');
  }
}

// Función para actualizar el costo de envío según el tipo seleccionado
function updateShippingCost(shippingType) {
  const shippingElement = document.getElementById('shipping');
  if (!shippingElement) return; // Si no existe el elemento, salir

  const costs = {
    'standard': '€8,00',
    'express': '€15,00',
    'pickup': '€0,00'
  };

  shippingElement.textContent = costs[shippingType] || '€8,00';
}

// Función para agregar campos de imagen adicionales
function addImageField() {
  const container = document.querySelector('.additional-images-container');
  if (!container) return;

  const newField = document.createElement('div');
  newField.className = 'd-flex gap-2 mb-2';
  newField.innerHTML = `
    <input type="url" class="form-control" placeholder="URL imagen adicional">
    <button type="button" class="btn btn-light-custom" data-action="remove"><i class="bi bi-trash3"></i></button>
  `;

  const addButton = container.querySelector('#addImageBtn');
  if (addButton) {
    addButton.parentElement.insertBefore(newField, addButton.parentElement);
  }
  const removeBtn = newField.querySelector('[data-action="remove"]');
  if (removeBtn) {
    removeBtn.addEventListener('click', function () {
      this.parentElement.remove();
    });
  }
}

// Event listeners para páginas admin
document.addEventListener('DOMContentLoaded', function () {
  // Event listeners para order-new.html
  const quantityButtons = document.querySelectorAll('[data-change]');
  quantityButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.dataset.product;
      const change = parseInt(this.dataset.change);
      changeQuantity(productId, change);
    });
  });

  const addButtons = document.querySelectorAll('[data-action="add"]');
  addButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.dataset.product;
      addToOrder(productId);
    });
  });

  const shippingSelect = document.getElementById('shippingSelect');
  if (shippingSelect) {
    shippingSelect.addEventListener('change', function () {
      updateShippingCost(this.value);
    });
  }

  // Event listener para product-new.html
  const addImageBtn = document.getElementById('addImageBtn');
  if (addImageBtn) {
    addImageBtn.addEventListener('click', addImageField);
  }

  // Event listener para profile.html
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      return false;
    });
  }

  // Event listeners para editar imágenes
  const editImageButtons = document.querySelectorAll('[data-action="edit-image"]');
  const hiddenFileInput = document.getElementById('hiddenFileInput');
  const categoryImageInput = document.getElementById('categoryImageInput');

  editImageButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (hiddenFileInput) {
        hiddenFileInput.click();
      } else if (categoryImageInput) {
        categoryImageInput.click();
      }
    });
  });

  // Event listener para actualizar nombre de imagen en modal
  const deleteImageButtons = document.querySelectorAll('[data-bs-target="#modalDeleteImage"]');
  const imageNameText = document.getElementById('imageNameText');

  deleteImageButtons.forEach(button => {
    button.addEventListener('click', function () {
      const imageName = this.dataset.imageName;
      if (imageNameText && imageName) {
        imageNameText.textContent = imageName;
      }
    });
  });

  // Event listener para category-new.html - botón de subir imagen
  const uploadImageBtn = document.getElementById('uploadImageBtn');

  if (uploadImageBtn && categoryImageInput) {
    uploadImageBtn.addEventListener('click', function () {
      categoryImageInput.click();
    });
  }

  // Preview de imagen para category-new.html y category-edit.html
  if (categoryImageInput) {
    categoryImageInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      const categoryImagePreview = document.getElementById('categoryImagePreview');
      const imagePlaceholder = document.getElementById('imagePlaceholder');
      const newImagePreview = document.getElementById('newImagePreview');

      if (file && categoryImagePreview) {
        const reader = new FileReader();
        reader.onload = function (e) {
          categoryImagePreview.src = e.target.result;

          // Para category-new.html
          if (imagePlaceholder) {
            categoryImagePreview.classList.remove('image-preview-hidden');
            imagePlaceholder.classList.add('image-preview-hidden');
          }

          // Para category-edit.html
          if (newImagePreview) {
            newImagePreview.classList.remove('new-image-preview-hidden');
            if (imagePlaceholder) {
              imagePlaceholder.classList.add('image-preview-hidden');
            }
          }
        }
        reader.readAsDataURL(file);
      }
    });
  }

  // Event listener para eliminar producto en products.html
  const confirmDeleteProductBtn = document.getElementById('confirmDeleteProduct');
  const productDeleteMsgBox = document.getElementById('productDeleteMessage');
  const modalDeleteProduct = document.getElementById('modalDeleteProduct');

  if (confirmDeleteProductBtn && productDeleteMsgBox && modalDeleteProduct) {
    confirmDeleteProductBtn.addEventListener('click', function () {
      const modal = bootstrap.Modal.getInstance(modalDeleteProduct);
      if (modal) {
        modal.hide();
      }
      modalDeleteProduct.addEventListener('hidden.bs.modal', function showDeleteNotification() {
        productDeleteMsgBox.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto eliminado exitosamente.</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        productDeleteMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        modalDeleteProduct.removeEventListener('hidden.bs.modal', showDeleteNotification);
      });
    });
  }

  // Event listener para eliminar categoría en categories.html
  const confirmDeleteCategoryBtn = document.getElementById('confirmDeleteCategory');
  const categoryDeleteMsgBox = document.getElementById('categoryDeleteMessage');
  const modalDeleteCategory = document.getElementById('modalDeleteCategory');

  if (confirmDeleteCategoryBtn && categoryDeleteMsgBox && modalDeleteCategory) {
    confirmDeleteCategoryBtn.addEventListener('click', function () {
      const modal = bootstrap.Modal.getInstance(modalDeleteCategory);
      if (modal) {
        modal.hide();
      }
      modalDeleteCategory.addEventListener('hidden.bs.modal', function showDeleteNotification() {
        categoryDeleteMsgBox.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Categoría eliminada exitosamente.</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        categoryDeleteMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        modalDeleteCategory.removeEventListener('hidden.bs.modal', showDeleteNotification);
      });
    });
  }

  // Event listener para eliminar usuario en users.html
  const confirmDeleteUserBtn = document.getElementById('confirmDeleteUser');
  const userDeleteMsgBox = document.getElementById('userDeleteMessage');
  const modalDeleteUser = document.getElementById('modalDeleteUser');

  if (confirmDeleteUserBtn && userDeleteMsgBox && modalDeleteUser) {
    confirmDeleteUserBtn.addEventListener('click', function () {
      const modal = bootstrap.Modal.getInstance(modalDeleteUser);
      if (modal) {
        modal.hide();
      }
      modalDeleteUser.addEventListener('hidden.bs.modal', function showDeleteNotification() {
        // Mostrar notificación de éxito de eliminación de user
        userDeleteMsgBox.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Usuario eliminado exitosamente.</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        userDeleteMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        modalDeleteUser.removeEventListener('hidden.bs.modal', showDeleteNotification);
      });
    });
  }
});

// Mostrar/ocultar dropdown de productos
function toggleProductDropdown() {
  const dropdown = document.getElementById('productDropdown');
  dropdown.classList.toggle('show');
}

// Seleccionar producto del dropdown
function selectProduct(sku, name, description, price, stock) {
  if (stock <= 0) return;
  
  document.getElementById('productSearch').value = '';
  document.getElementById('productDropdown').classList.remove('show');
  
  console.log('Agregando producto:', sku, name, price, stock);
}

// Filtrar productos por búsqueda
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
  
  const dropdown = document.getElementById('productDropdown');
  if (searchValue.length > 0) {
    dropdown.classList.add('show');
  } else {
    dropdown.classList.remove('show');
  }
}

// Mostrar/ocultar dropdown de clientes
function toggleClientDropdown() {
  const dropdown = document.getElementById('clientDropdown');
  dropdown.classList.toggle('show');
}

// Seleccionar cliente del dropdown
function selectClient(id, fullName, email, nombre, apellido, telefono) {
  document.getElementById('clientSearch').value = fullName + ' - ' + email;
  document.getElementById('clientId').value = id;
  document.getElementById('clientEmail').value = email;
  document.getElementById('clientNombre').value = nombre;
  document.getElementById('clientApellido').value = apellido;
  document.getElementById('clientTelefono').value = telefono;
  
  document.getElementById('clientDropdown').classList.remove('show');
}

// Filtrar clientes por búsqueda
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
  
  const dropdown = document.getElementById('clientDropdown');
  if (searchValue.length > 0) {
    dropdown.classList.add('show');
  }
  
  if (searchValue === '') {
    document.getElementById('clientId').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('clientNombre').value = '';
    document.getElementById('clientApellido').value = '';
    document.getElementById('clientTelefono').value = '';
    dropdown.classList.remove('show');
  }
}

// Incrementar cantidad de producto
function increaseQuantity(button) {
  const quantitySpan = button.parentElement.querySelector('.quantity-value');
  let currentQuantity = parseInt(quantitySpan.textContent);
  quantitySpan.textContent = currentQuantity + 1;
  updateSubtotal(button);
}

// Disminuir cantidad de producto
function decreaseQuantity(button) {
  const quantitySpan = button.parentElement.querySelector('.quantity-value');
  let currentQuantity = parseInt(quantitySpan.textContent);
  if (currentQuantity > 1) {
    quantitySpan.textContent = currentQuantity - 1;
    updateSubtotal(button);
  }
}

// Actualizar subtotal de producto
function updateSubtotal(button) {
  const row = button.closest('tr');
  const quantitySpan = row.querySelector('.quantity-value');
  const quantity = parseInt(quantitySpan.textContent);
  
  const priceCell = row.querySelector('.text-end.d-none.d-lg-table-cell') || row.querySelector('.text-end');
  if (priceCell) {
    const unitPrice = parseFloat(priceCell.textContent.replace('€', '').replace(',', '.'));
    const subtotalCell = row.querySelector('td:nth-last-child(2)');
    const newSubtotal = (unitPrice * quantity).toFixed(2);
    subtotalCell.textContent = '€' + newSubtotal.replace('.', ',');
  }
  
  updateTotals();
}

// Actualizar totales generales
function updateTotals() {
  let subtotalProducts = 0;
  
  const subtotalCells = document.querySelectorAll('tbody tr td:nth-last-child(2)');
  subtotalCells.forEach(cell => {
    const value = parseFloat(cell.textContent.replace('€', '').replace(',', '.'));
    if (!isNaN(value)) {
      subtotalProducts += value;
    }
  });

  const shipping = 0;
  const total = subtotalProducts + shipping;
  
  const subtotalElement = document.getElementById('subtotalProductos');
  const totalElement = document.getElementById('total');
  
  if (subtotalElement) {
    subtotalElement.textContent = '€' + subtotalProducts.toFixed(2).replace('.', ',');
  }
  
  if (totalElement) {
    totalElement.textContent = '€' + total.toFixed(2).replace('.', ',');
  }
}

// Guardar orden
function saveOrder() {
  const orderNewMsgBox = document.getElementById('orderNewMessage');
  const orderEditMsgBox = document.getElementById('orderEditMessage');
  
  if (orderNewMsgBox) {
    orderNewMsgBox.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Orden creada con éxito.</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    orderNewMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (orderEditMsgBox) {
    orderEditMsgBox.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Orden actualizada con éxito.</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    orderEditMsgBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Event listeners adicionales para órdenes
document.addEventListener('DOMContentLoaded', function() {
  // Event listeners para búsqueda de productos
  const productSearchInput = document.getElementById('productSearch');
  if (productSearchInput) {
    productSearchInput.addEventListener('click', toggleProductDropdown);
    productSearchInput.addEventListener('keyup', filterProducts);
  }

  // Event listeners para búsqueda de clientes
  const clientSearchInput = document.getElementById('clientSearch');
  if (clientSearchInput) {
    clientSearchInput.addEventListener('click', toggleClientDropdown);
    clientSearchInput.addEventListener('keyup', filterClients);
  }

  // Event listeners para selección de productos
  const productOptions = document.querySelectorAll('.product-option');
  productOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const sku = this.dataset.sku;
      const name = this.dataset.name;
      const description = this.dataset.description;
      const price = parseFloat(this.dataset.price);
      const stock = parseInt(this.dataset.stock);
      selectProduct(sku, name, description, price, stock);
    });
  });

  // Event listeners para selección de clientes
  const clientOptions = document.querySelectorAll('.client-option');
  clientOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.dataset.clientId;
      const fullName = this.dataset.fullName;
      const email = this.dataset.email;
      const nombre = this.dataset.nombre;
      const apellido = this.dataset.apellido;
      const telefono = this.dataset.telefono;
      selectClient(id, fullName, email, nombre, apellido, telefono);
    });
  });

  // Event listeners para botones de cantidad
  const quantityButtons = document.querySelectorAll('[data-action="increase"], [data-action="decrease"]');
  quantityButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.dataset.action;
      if (action === 'increase') {
        increaseQuantity(this);
      } else if (action === 'decrease') {
        decreaseQuantity(this);
      }
    });
  });

  // Event listener para botón guardar orden
  const saveOrderBtn = document.getElementById('saveOrderBtn');
  if (saveOrderBtn) {
    saveOrderBtn.addEventListener('click', function(e) {
      e.preventDefault();
      saveOrder();
    });
  }

  // Event listeners para botones con redirección
  const redirectButtons = document.querySelectorAll('[data-redirect]');
  redirectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.dataset.redirect;
      if (url) {
        window.location.href = url;
      }
    });
  });

  // Cerrar dropdowns al hacer clic fuera
  document.addEventListener('click', function(event) {
    const productDropdown = document.getElementById('productDropdown');
    const productSearchInput = document.getElementById('productSearch');
    
    if (productDropdown && productSearchInput) {
      if (!productDropdown.contains(event.target) && !productSearchInput.contains(event.target)) {
        productDropdown.classList.remove('show');
      }
    }
    
    const clientDropdown = document.getElementById('clientDropdown');
    const clientSearchInput = document.getElementById('clientSearch');
    
    if (clientDropdown && clientSearchInput) {
      if (!clientDropdown.contains(event.target) && !clientSearchInput.contains(event.target)) {
        clientDropdown.classList.remove('show');
      }
    }
  });
});
