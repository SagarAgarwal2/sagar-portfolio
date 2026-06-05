document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  // Smooth cursor follow
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  // Hover states for custom cursor
  const hoverElements = document.querySelectorAll('a, button, .project-card, .btn, .theme-toggle, .contact-chip, .screenshot-item img');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      if (el.classList.contains('project-card')) {
        cursor.setAttribute('data-text', 'VIEW');
      } else if (el.tagName.toLowerCase() === 'img' && el.closest('.screenshot-item')) {
        cursor.setAttribute('data-text', 'ZOOM');
      } else {
        cursor.setAttribute('data-text', '');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      cursor.setAttribute('data-text', '');
    });
  });

  // Ensure cursor works properly with the lightbox
  const lightboxClose = document.querySelector('.lightbox-close');
  if (lightboxClose) {
    lightboxClose.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    lightboxClose.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  }

  // 2. Magnetic Buttons & Links
  const magneticElements = document.querySelectorAll('.btn, .nav-links a, .theme-toggle, .contact-chip');
  magneticElements.forEach(el => {
    el.classList.add('magnetic');
    
    el.addEventListener('mousemove', (e) => {
      el.classList.remove('leaving');
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull strength factor
      const strength = 0.35;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.classList.add('leaving');
      el.style.transform = 'translate(0px, 0px)';
    });
  });

  // 3. Mouse-Tracking Gradients on Project Cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

});
