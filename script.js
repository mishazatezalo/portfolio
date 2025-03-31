let currentIndex = 0;
let isMenuOpen = false;

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        nav.classList.add('active');
        toggle.classList.add('active');
        // Transform spans to X
        toggle.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        toggle.querySelectorAll('span')[1].style.opacity = '0';
        toggle.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    } else {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        // Reset spans
        toggle.querySelectorAll('span')[0].style.transform = 'none';
        toggle.querySelectorAll('span')[1].style.opacity = '1';
        toggle.querySelectorAll('span')[2].style.transform = 'none';
        // Allow body scrolling
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking a nav link
function setupNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
}

function slide(direction) {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length - 1;
    const progressDots = document.querySelectorAll('.progress-dot');

    // Update current index
    if (direction === 'next' && currentIndex < totalCards) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }

    // Smooth scroll animation
    slider.style.transform = `translateX(-${currentIndex * (100 + 2)}%)`; // Account for gap

    // Update active states
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentIndex) {
            card.classList.add('active');
        }
    });

    // Update progress dots
    progressDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });

    // Update button states
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    
    nextButton.style.opacity = currentIndex === totalCards ? '0.5' : '1';
    nextButton.style.cursor = currentIndex === totalCards ? 'not-allowed' : 'pointer';
}

// Add progress dots
document.addEventListener('DOMContentLoaded', function() {
    // Setup mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Setup nav links
    setupNavLinks();
    
    // Setup slider if it exists
    const slider = document.querySelector('.slider-container');
    if (slider) {
        const cards = document.querySelectorAll('.card');
        
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'slider-progress';
        
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot' + (index === 0 ? ' active' : '');
            dot.onclick = () => {
                currentIndex = index;
                slide('none');
            };
            progressContainer.appendChild(dot);
        });
        
        slider.appendChild(progressContainer);

        // Set initial active state
        cards[0].classList.add('active');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Reset menu if window is resized larger than mobile breakpoint
    if (window.innerWidth > 768 && isMenuOpen) {
        isMenuOpen = false;
        document.querySelector('nav').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.classList.remove('active');
            toggle.querySelectorAll('span')[0].style.transform = 'none';
            toggle.querySelectorAll('span')[1].style.opacity = '1';
            toggle.querySelectorAll('span')[2].style.transform = 'none';
        }
    }
});