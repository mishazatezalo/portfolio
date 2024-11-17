let currentIndex = 0;

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
    const slider = document.querySelector('.slider-container');
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
});
// Add this after your existing JavaScript - Mobile-only enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Only run these functions if on mobile
    if (window.innerWidth <= 768) {
        addMobileCardFlip();
        addMobileTouchSlider();
    }
});

function addMobileCardFlip() {
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        let isFlipped = false;
        
        // Replace the existing click handler for mobile
        cardContainer.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                isFlipped = !isFlipped;
                this.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
            }
        });
    }
}

function addMobileTouchSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    // Add touch events only for mobile
    slider.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        if (window.innerWidth <= 768 && isDragging) {
            touchEndX = e.changedTouches[0].screenX;
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > 50) { // Minimum swipe distance
                if (difference > 0) {
                    slide('next'); // Using your existing slide function
                } else {
                    slide('prev'); // Using your existing slide function
                }
            }
            isDragging = false;
        }
    }, { passive: true });
}

// Add mobile check for resize
window.addEventListener('resize', function() {
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        // Reset transform on resize if switching from mobile to desktop
        if (window.innerWidth > 768) {
            cardContainer.style.transform = '';
        }
    }
});