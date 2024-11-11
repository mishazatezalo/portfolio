let currentIndex = 0;

function slide(direction) {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length - 1; // Subtract 1 to start from 0

    if (direction === 'next' && currentIndex < totalCards) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }

    slider.style.transform = `translateX(-${currentIndex * 95}%)`;
}