document.addEventListener('DOMContentLoaded', () => {
  

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
