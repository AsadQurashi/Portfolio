// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }
  
  // Form Submission with Formspree
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formMessage = document.getElementById('formMessage');
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      // Show loading state
      formMessage.textContent = 'Sending your message...';
      formMessage.className = 'form-message';
      formMessage.style.display = 'block';
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      
      try {
        const formData = new FormData(this);
        
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          formMessage.textContent = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
          formMessage.className = 'form-message success';
          contactForm.reset();
          
          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        formMessage.textContent = '❌ Oops! There was a problem sending your message. Please try emailing me directly at asadqurashi3709@gmail.com';
        formMessage.className = 'form-message error';
      } finally {
        submitBtn.disabled = false;
        btnText.textContent = originalText;
      }
    });
  }
  
  // Project Scrolling
  const projectsScroll = document.querySelector('.projects-scroll');
  const leftScroll = document.querySelector('.left-scroll');
  const rightScroll = document.querySelector('.right-scroll');
  
  if (projectsScroll && leftScroll && rightScroll) {
    const scrollAmount = 400;
    
    leftScroll.addEventListener('click', () => {
      projectsScroll.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    rightScroll.addEventListener('click', () => {
      projectsScroll.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Touch/swipe support for mobile
    let startX;
    let scrollLeft;
    
    projectsScroll.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - projectsScroll.offsetLeft;
      scrollLeft = projectsScroll.scrollLeft;
    });
    
    projectsScroll.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const x = e.touches[0].pageX - projectsScroll.offsetLeft;
      const walk = (x - startX) * 2;
      projectsScroll.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  function highlightNavLink() {
    let scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink();
  
  // Smooth Scrolling for Navigation Links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });
  
  // Form Validation
  const formInputs = document.querySelectorAll('.form-control');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }
    });
    
    input.addEventListener('focus', function() {
      this.style.borderColor = '#00c6ff';
    });
  });
  
  // Navbar Background on Scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 23, 42, 0.98)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });
  
  // Project Card Hover Effect Enhancement
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});