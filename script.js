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
