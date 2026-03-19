const heroImages = [
    './media/10244.jpeg',
    './media/10074.jpeg',
    './media/10011.jpg'
];
let currentImageIndex = 0;
const displayImageElement = document.querySelector('.display_img img');
const navLinks = document.querySelectorAll('.nav_sec_2 ul li');
const contentRows = document.querySelectorAll('.top_trending_img');
const posterImages = document.querySelectorAll('.top_trending_img img');

function setupNavHighlight() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            console.log(`${link.textContent} selected.`);
        });
    });
}

function startImageSlider() {
    if (!displayImageElement || heroImages.length < 2) return;

    const changeImage = () => {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        displayImageElement.style.opacity = 0.3;
        
        setTimeout(() => {
            displayImageElement.src = heroImages[currentImageIndex];
            displayImageElement.style.opacity = 1;
        }, 500); 
    };

    setInterval(changeImage, 5000);
}

function setupCarouselScrolling() {
    contentRows.forEach((row, index) => {
        const scrollRightButton = document.createElement('i');
        scrollRightButton.className = 'fa-solid fa-chevron-right scroll-button-right';
        
        row.parentElement.appendChild(scrollRightButton); 

        scrollRightButton.addEventListener('click', () => {
        
            row.scrollBy({
                left: 500, 
                behavior: 'smooth' 
            });
        });

        const scrollLeftButton = document.createElement('i');
        scrollLeftButton.className = 'fa-solid fa-chevron-left scroll-button-left';
        row.parentElement.appendChild(scrollLeftButton); 

        scrollLeftButton.addEventListener('click', () => {
            row.scrollBy({
                left: -500, 
                behavior: 'smooth'
            });
        });
    });
}

function setupPosterHoverEffect() {
    posterImages.forEach(poster => {
    
        poster.addEventListener('mouseenter', () => {
            
            const overlay = document.createElement('div');
            overlay.className = 'poster-overlay';
            overlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            poster.parentElement.style.position = 'relative'; 
            poster.parentElement.appendChild(overlay);
        });

        poster.addEventListener('mouseleave', () => {
            
            const overlay = poster.parentElement.querySelector('.poster-overlay');
            if (overlay) {
                overlay.remove();
            }
        });
        
        poster.addEventListener('click', () => {
             alert(`Playing content: ${poster.src.split('/').pop()}`);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavHighlight();
    startImageSlider();
    setupCarouselScrolling();
    setupPosterHoverEffect();
});