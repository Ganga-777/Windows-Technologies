// Parallax Scrolling
document.addEventListener('scroll', () => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const scrolled = window.pageYOffset;
    
    parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// Particle Effect for Buttons
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);

    const size = Math.random() * 3 + 2;
    const destinationX = x + (Math.random() - 0.5) * 100;
    const destinationY = y - 100;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.style.setProperty('--dest-x', `${destinationX}px`);
    particle.style.setProperty('--dest-y', `${destinationY}px`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    particle.style.setProperty('--delay', `${delay}ms`);

    setTimeout(() => particle.remove(), 1000);
}

document.querySelectorAll('.particle-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 30; i++) {
            createParticle(x, y);
        }
    });
});

// Scroll Progress with Sections
const sections = document.querySelectorAll('section');
const progressBar = document.querySelector('.scroll-progress-bar');
const markers = document.querySelectorAll('.scroll-marker');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    
    const percentScrolled = (scrolled / fullHeight) * 100;
    progressBar.style.setProperty('--scroll-percent', `${percentScrolled}%`);
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            markers[index].classList.add('active');
        } else {
            markers[index].classList.remove('active');
        }
    });
});

// 3D Tilt Effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}); 