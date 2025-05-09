/**
 * Gallery Loader Script
 * This script loads images from localStorage (uploaded by admin) into the main website gallery
 */

document.addEventListener('DOMContentLoaded', function() {
    // Function to load gallery images from localStorage
    function loadGalleryImages() {
        // Get the gallery carousel element
        const galleryCarousel = document.querySelector('.gallery-carousel');
        
        // If gallery carousel doesn't exist, exit
        if (!galleryCarousel) return;
        
        // Get uploaded images from localStorage
        const uploadedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        
        // If there are uploaded images, add them to the gallery
        if (uploadedImages.length > 0) {
            // Add each uploaded image to the gallery
            uploadedImages.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <div class="position-relative">
                        <img class="img-fluid rounded" src="${item.image}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <h5 class="text-white">${item.title}</h5>
                        </div>
                    </div>
                `;
                
                // Add the new gallery item to the carousel
                galleryCarousel.appendChild(galleryItem);
            });
            
            // Reinitialize the owl carousel if it exists
            if (typeof $.fn.owlCarousel !== 'undefined') {
                // Destroy existing carousel instance if it exists
                if (galleryCarousel.hasClass('owl-loaded')) {
                    $(galleryCarousel).trigger('destroy.owl.carousel');
                }
                
                // Initialize the carousel
                $(galleryCarousel).owlCarousel({
                    center: true,
                    autoplay: true,
                    dots: true,
                    loop: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                        992: { items: 4 }
                    }
                });
            }
        }
    }
    
    // Load gallery images when the page loads
    loadGalleryImages();
});