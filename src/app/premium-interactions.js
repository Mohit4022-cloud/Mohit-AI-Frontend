// Premium Interactions and Animations

// Scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Trigger count-up animation for numbers
      if (entry.target.querySelector('.count-up')) {
        animateValue(entry.target.querySelector('.count-up'));
      }
    }
  });
}, observerOptions);

// Observe all reveal elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal, .reveal-scale, .stagger').forEach(el => {
    scrollObserver.observe(el);
  });
});

// Number counting animation
function animateValue(el) {
  const finalValue = el.textContent;
  const isPercentage = finalValue.includes('%');
  const isMultiplier = finalValue.includes('×') || finalValue.includes('x');
  const isDash = finalValue.includes('-');
  
  let numericValue = parseFloat(finalValue.replace(/[^0-9.-]/g, ''));
  if (isNaN(numericValue)) return;
  
  const duration = 2000;
  const startTime = Date.now();
  const startValue = 0;
  
  function update() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.round(startValue + (numericValue - startValue) * easeOutQuart);
    
    if (isDash) {
      const parts = finalValue.split('-');
      el.textContent = currentValue + '-' + parts[1];
    } else if (isPercentage) {
      el.textContent = currentValue + '%';
    } else if (isMultiplier) {
      el.textContent = currentValue + '×';
    } else {
      el.textContent = currentValue;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = finalValue;
    }
  }
  
  update();
}

// Magnetic button effect
document.addEventListener('DOMContentLoaded', () => {
  const magneticButtons = document.querySelectorAll('.button-magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0) scale(1)';
    });
  });
});

// Parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.floating-shape');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Dynamic gradient on mouse move
document.addEventListener('mousemove', (e) => {
  const gradientElements = document.querySelectorAll('.gradient-mouse');
  gradientElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 110, 199, 0.3) 0%, transparent 50%)`;
  });
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typewriter on load
document.addEventListener('DOMContentLoaded', () => {
  const typewriterElements = document.querySelectorAll('.typewriter');
  typewriterElements.forEach(el => {
    const text = el.textContent;
    typeWriter(el, text, 50);
  });
});

// Blur optimization for performance
const blurElements = document.querySelectorAll('[class*="backdrop-filter"], [class*="backdrop-blur"]');
blurElements.forEach(el => {
  el.classList.add('blur-optimized');
});

// Cursor glow effect
document.addEventListener('DOMContentLoaded', () => {
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.style.cssText = `
    position: fixed;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 110, 199, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursorGlow);
  
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  
  // Smooth cursor follow
  function animateCursor() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
});

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) {
      console.warn('Slow animation detected:', entry.name, entry.duration);
    }
  }
});

performanceObserver.observe({ entryTypes: ['measure'] });