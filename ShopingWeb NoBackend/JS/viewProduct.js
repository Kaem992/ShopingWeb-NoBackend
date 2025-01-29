document.addEventListener('DOMContentLoaded', function() {
    const colorDisplay = document.getElementById('colorDisplay');
    const carouselItems = document.querySelectorAll('.carousel-item');

    const colors = ['Gray', 'White', 'Blank']; // Corresponding colors for the carousel items

    // Update the color display when the carousel slide changes
    document.querySelector('#carouselExampleIndicators').addEventListener('slid.bs.carousel', function(event) {
        const activeIndex = event.to; // Get the index of the active slide
        colorDisplay.textContent = colors[activeIndex]; // Update the color in the sidebar
    });
});