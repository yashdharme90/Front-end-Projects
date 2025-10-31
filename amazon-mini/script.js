// // A simple array of image sources for the main display_img section
// // Replace these paths with your actual image paths for a slider effect
// const heroImages = [
//     './media/10244.jpeg', // The current image
//     './media/10074.jpeg', // Example 1
//     './media/10011.jpg'   // Example 2
//     // Add more images here
// ];

// let currentImageIndex = 0;
// const displayImageElement = document.querySelector('.display_img img');
// const navLinks = document.querySelectorAll('.nav_sec_2 ul li');

// // === 1. Highlight Active Navigation Link on Click ===
// function setupNavHighlight() {
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             // Remove 'active' class from all links
//             navLinks.forEach(l => l.classList.remove('active'));
            
//             // Add 'active' class to the clicked link
//             link.classList.add('active');

//             // Optional: You could navigate to a new page or filter content here
//             console.log(`${link.textContent} clicked!`);
//         });
//     });
// }


// // === 2. Simple Main Image Slider Functionality ===
// function startImageSlider() {
//     // Check if the display image element exists
//     if (!displayImageElement) return; 

//     // Function to change the image
//     const changeImage = () => {
//         currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
//         // Use a simple fade transition effect (requires CSS to work)
//         displayImageElement.style.opacity = 0.3; 
        
//         setTimeout(() => {
//             displayImageElement.src = heroImages[currentImageIndex];
//             displayImageElement.style.opacity = 1;
//         }, 500); // Wait for 500ms for the fade-out, then change src and fade-in
//     };

//     // Change image every 5 seconds (5000 milliseconds)
//     setInterval(changeImage, 5000);
// }


// // === 3. Initialize all functions when the DOM is fully loaded ===
// document.addEventListener('DOMContentLoaded', () => {
//     setupNavHighlight();
//     startImageSlider();
// });











// --- Global Declarations ---
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


// === 1. Highlight Active Navigation Link on Click ===
function setupNavHighlight() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove 'active' class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            link.classList.add('active');
            console.log(`${link.textContent} selected.`);
        });
    });
}

// === 2. Simple Main Image Slider Functionality ===
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

// === 3. Horizontal Carousel Scrolling Logic (The new feature!) ===
function setupCarouselScrolling() {
    // We target all the horizontal image containers
    contentRows.forEach((row, index) => {
        // Create an element for the right-scroll button (or select your existing one)
        const scrollRightButton = document.createElement('i');
        scrollRightButton.className = 'fa-solid fa-chevron-right scroll-button-right';
        // Add the button to the end of the row container
        row.parentElement.appendChild(scrollRightButton); 

        // Listen for clicks on the scroll button
        scrollRightButton.addEventListener('click', () => {
            // Scroll the row container horizontally by 500 pixels
            row.scrollBy({
                left: 500, 
                behavior: 'smooth' // For smooth scrolling effect
            });
        });

        // OPTIONAL: Create a Left-scroll button (since you only had the less-than icon)
        const scrollLeftButton = document.createElement('i');
        scrollLeftButton.className = 'fa-solid fa-chevron-left scroll-button-left';
        row.parentElement.appendChild(scrollLeftButton); 

        scrollLeftButton.addEventListener('click', () => {
            row.scrollBy({
                left: -500, // Scroll left
                behavior: 'smooth'
            });
        });
    });
}


// === 4. Add Interactive Hover Effect to Posters (To simulate controls appearing) ===
function setupPosterHoverEffect() {
    posterImages.forEach(poster => {
        // When mouse enters the poster
        poster.addEventListener('mouseenter', () => {
            // Add a temporary overlay element to simulate controls (Play/Info button)
            const overlay = document.createElement('div');
            overlay.className = 'poster-overlay';
            overlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            poster.parentElement.style.position = 'relative'; // Ensure parent can position the overlay
            poster.parentElement.appendChild(overlay);
        });

        // When mouse leaves the poster
        poster.addEventListener('mouseleave', () => {
            // Remove the overlay
            const overlay = poster.parentElement.querySelector('.poster-overlay');
            if (overlay) {
                overlay.remove();
            }
        });
        
        // When a poster is clicked, you could redirect or show a modal
        poster.addEventListener('click', () => {
             alert(`Playing content: ${poster.src.split('/').pop()}`);
        });
    });
}


// === 5. Initialize all functions when the DOM is fully loaded ===
document.addEventListener('DOMContentLoaded', () => {
    setupNavHighlight();
    startImageSlider();
    setupCarouselScrolling();
    setupPosterHoverEffect();
});