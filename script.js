const slider = document.querySelector('.slider');
const previewsContainer = document.querySelector('.previews');

// Generate previews dynamically based on slider items
const items = document.querySelectorAll('.item');
items.forEach((item, index) => {
    const preview = document.createElement('div');
    preview.classList.add('preview');
    preview.style.backgroundImage = item.style.backgroundImage;
    preview.setAttribute('data-index', index);
    previewsContainer.appendChild(preview);

    preview.addEventListener('click', () => {
        slideTo(index);
    });
});

let currentIndex = 0;

function slideTo(index) {
    const items = document.querySelectorAll('.item');
    const newIndex = (index + items.length) % items.length;

    // Calculate the distance to slide
    const distance = newIndex - currentIndex;

    if (distance > 0) {
        for (let i = 0; i < distance; i++) {
            slider.appendChild(slider.firstElementChild);
        }
    } else {
        for (let i = distance; i < 0; i++) {
            slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
        }
    }

    currentIndex = newIndex;
    updatePreviews(currentIndex);
}

function updatePreviews(activeIndex) {
    const previews = document.querySelectorAll('.preview');
    previews.forEach((preview, index) => {
        if (index === activeIndex) {
            preview.classList.add('active');
        } else {
            preview.classList.remove('active');
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        slideTo(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
        slideTo(currentIndex - 1);
    }
});

// Swipe functionality for touch devices
let startX, isSwiping = false;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-diffX}px)`;
});

slider.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    slider.style.transition = 'transform 0.75s ease';
    slider.style.transform = 'translateX(0)';

    if (diffX > 50) {
        slideTo(currentIndex + 1);
    } else if (diffX < -50) {
        slideTo(currentIndex - 1);
    }
    isSwiping = false;
});

updatePreviews(currentIndex);
