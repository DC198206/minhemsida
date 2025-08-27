/*
  Modern JavaScript Enhancements for DC Digital Support & Säkerhet
*/

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initMenu();
  initScrollAnimations();
  initFormValidation();
  
  // Remove preload class after a short delay
  setTimeout(function() {
    document.body.classList.remove('is-preload');
  }, 100);
});

// Menu functionality
function initMenu() {
  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('#header nav a[href="#menu"]');
  const closeBtn = document.querySelector('#menu .close');
  const menuLinks = document.querySelectorAll('#menu a');
  
  if (!menu || !openBtn || !closeBtn) return;
  
  // Open menu
  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.add('visible');
    document.body.classList.add('is-menu-visible');
  });
  
  // Close menu
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.remove('visible');
    document.body.classList.remove('is-menu-visible');
  });
  
  // Close menu when clicking on links
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('visible');
      document.body.classList.remove('is-menu-visible');
    });
  });
  
  // Close menu when clicking outside
  menu.addEventListener('click', function(e) {
    if (e.target === menu) {
      menu.classList.remove('visible');
      document.body.classList.remove('is-menu-visible');
    }
  });
  
  // Close menu with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('is-menu-visible')) {
      menu.classList.remove('visible');
      document.body.classList.remove('is-menu-visible');
    }
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });
    
    // Remove error class when user starts typing
    form.addEventListener('input', function(e) {
      if (e.target.hasAttribute('required')) {
        e.target.classList.remove('error');
      }
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip menu toggle links
    if (href === '#menu') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading state to buttons
document.querySelectorAll('button, .button').forEach(button => {
  button.addEventListener('click', function() {
    if (this.type === 'submit' || this.classList.contains('primary')) {
      this.classList.add('loading');
      this.disabled = true;
      
      // Remove loading state after 2 seconds (simulating form submission)
      setTimeout(() => {
        this.classList.remove('loading');
        this.disabled = false;
      }, 2000);
    }
  });
});