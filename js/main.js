
/*
  ========================================
  Main JavaScript File
  ========================================
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonial Slider
  initTestimonialSlider();

  // Contact Form Handling
  initContactForm();
});

/*
  ========================================
  Testimonial Slider
  ========================================
*/
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.control-prev');
  const nextBtn = document.querySelector('.control-next');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  // Update slider position
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Event listeners for controls
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? cards.length - 1 : currentIndex - 1;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  });

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Auto slide every 5 seconds
  const autoSlide = setInterval(() => {
    currentIndex = (currentIndex === cards.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }, 5000);

  // Pause auto slide when hovering over testimonials
  track.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });

  // Initial setup
  updateSlider();
}

/*
  ========================================
  Contact Form Handling
  ========================================
*/
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactForm || !formStatus) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'form-status error';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }
    
    // In a real application, you would send this data to a server
    // For demo, we'll simulate a successful submission
    formStatus.textContent = 'Sending...';
    formStatus.className = 'form-status';
    
    setTimeout(function() {
      // Simulate form submission
      console.log('Form submitted with data:', { name, email, subject, message });
      
      // Show success message
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.className = 'form-status success';
      
      // Reset form
      contactForm.reset();
      
      // Clear success message after 5 seconds
      setTimeout(function() {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }, 1500); // Simulate a delay
  });
}

/*
  ========================================
  Scroll Animation
  ========================================
*/
// Add scroll animations by revealing elements as they enter viewport
window.addEventListener('load', function() {
  // Add animation classes to elements that should animate on scroll
  const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-item, .testimonial-card, .contact-container, .booking-container');
  
  // Set initial state (invisible)
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }
  
  // Function to reveal elements when they enter viewport
  function revealElements() {
    animateElements.forEach(el => {
      if (isInViewport(el)) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', revealElements);
  
  // Check on initial load
  revealElements();
});
