// Initialize AOS
AOS.init();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

document.querySelector('.scroll-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update copyright year
document.querySelector('.current-year').textContent = new Date().getFullYear();

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});

// Preloader Handler
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Cookie Consent
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.remove('show');
    });
});

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Animation on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 50) {
            element.classList.add('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Mobile menu close on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name.length < 2) {
            alert('Please enter a valid name');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters');
            return;
        }
        
        // If validation passes, you can add your form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const theme = localStorage.getItem('theme');

// Set initial theme
if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

darkModeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Gallery Lightbox
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        const modalImage = document.getElementById('modalImage');
        modalImage.src = image.src;
        modal.show();
    });
});

// Booking Form Handler
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const service = this.querySelector('select').value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelector('select:nth-of-type(2)').value;
    const description = this.querySelector('textarea').value;
    
    // Validate form
    if (!service || !date || !time || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send this data to your server
    alert('Thank you for booking! We will confirm your appointment shortly.');
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    this.reset();
});

// Update gallery items to be clickable
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.cursor = 'pointer';
});

// Add booking button to service boxes
document.querySelectorAll('.service-box').forEach(box => {
    const bookButton = document.createElement('button');
    bookButton.className = 'btn btn-primary mt-3';
    bookButton.textContent = 'Book Now';
    bookButton.addEventListener('click', () => {
        const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
        modal.show();
    });
    box.appendChild(bookButton);
});

// Language Selector
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.language-dropdown');
const currentLang = document.querySelector('.current-lang');

langBtn.addEventListener('click', () => {
    langDropdown.classList.toggle('show');
});

document.querySelectorAll('.language-dropdown a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.target.dataset.lang;
        currentLang.textContent = lang.toUpperCase();
        changeLang(lang);
        langDropdown.classList.remove('show');
    });
});

function changeLang(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        element.textContent = translations[lang][key];
    });
}

// Live Chat
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    chatToggle.style.display = 'none';
});

sendMessage.addEventListener('click', sendChatMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="time">Just now</span>
        `;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response (replace with actual backend integration)
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'message received';
            response.innerHTML = `
                <p>Thank you for your message. Our team will assist you shortly.</p>
                <span class="time">Just now</span>
            `;
            chatMessages.appendChild(response);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Initialize testimonial carousel
$('.testimonial-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

// Use loading system for form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (this.id !== 'statusTracker') { // Skip for status tracker
            e.preventDefault();
            loading.show();
            
            // Simulate form submission
            setTimeout(() => {
                loading.hide();
                notifications.show('Form submitted successfully!', 'success');
                this.reset();
            }, 2000);
        }
    });
});

// Use notifications for service booking
document.getElementById('bookServiceBtn').addEventListener('click', function() {
    const device = document.getElementById('deviceType').value;
    const service = document.getElementById('serviceType').value;
    
    if (!device || !service) {
        notifications.show('Please select both device and service type', 'error');
        return;
    }
    
    loading.show();
    setTimeout(() => {
        loading.hide();
        const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
        bookingModal.show();
    }, 1000);
});

// Add loading animation to status tracker
document.getElementById('statusTracker').addEventListener('submit', function(e) {
    e.preventDefault();
    loading.show();
    
    setTimeout(() => {
        loading.hide();
        const serviceId = document.getElementById('serviceId').value.trim().toUpperCase();
        
        if (mockServiceData[serviceId]) {
            showServiceStatus(serviceId);
            notifications.show('Service status found!', 'success');
        } else {
            notifications.show('Service ID not found. Please check and try again.', 'error');
        }
    }, 1500);
});

// Enhanced Gallery Carousel Initialization
$(document).ready(function(){
    const galleryCarousel = $(".gallery-carousel").owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        nav: true,
        center: true,
        lazyLoad: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                margin: 10,
                nav: false // Hide navigation on mobile
            },
            576: {
                items: 1,
                margin: 15
            },
            768: {
                items: 1,
                margin: 20
            },
            992: {
                items: 1,
                margin: 30
            }
        },
        onInitialized: function() {
            // Add touch swipe support
            this.$element.find('.owl-item').on('touchstart', function() {
                galleryCarousel.trigger('stop.owl.autoplay');
            });
            
            this.$element.find('.owl-item').on('touchend', function() {
                galleryCarousel.trigger('play.owl.autoplay');
            });
        }
    });

    // Prevent zoom on double tap for iOS
    $('.gallery-carousel img').on('touchend', function(e) {
        e.preventDefault();
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            galleryCarousel.trigger('refresh.owl.carousel');
        }, 200);
    });

    // Fullscreen support for mobile devices
    $('.gallery-carousel img').click(function() {
        if (
            document.fullscreenEnabled || 
            document.webkitFullscreenEnabled || 
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        ) {
            const elem = this;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }
    });
});

// Optional: Add fullscreen functionality
$('.gallery-carousel img').click(function() {
    var src = $(this).attr('src');
    var title = $(this).closest('.position-relative').find('.gallery-overlay h5').text();
    
    $('body').append(`
        <div class="gallery-fullscreen">
            <div class="fullscreen-content">
                <span class="close-fullscreen">&times;</span>
                <img src="${src}" alt="${title}">
                <h3>${title}</h3>
            </div>
        </div>
    `);

    $('.gallery-fullscreen').fadeIn();
});

$(document).on('click', '.close-fullscreen, .gallery-fullscreen', function(e) {
    if (e.target !== this) return;
    $('.gallery-fullscreen').fadeOut(function() {
        $(this).remove();
    });
});

// Prevent zoom on mobile devices
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });
