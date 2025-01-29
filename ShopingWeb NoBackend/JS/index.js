let isThrottled = false; // Prevent rapid scrolling

// Store sections
const sections = document.querySelectorAll('section');
const sectionCount = sections.length;

// Define sensitivity factor (how sensitive the scroll should be)
const sensitivity = 50; // You can adjust this value for more or less sensitivity

// Prevent manual scrolling during throttle
const lockScroll = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
};

// Function to handle scrolling logic
const handleScroll = (event) => {
    if (isThrottled) {
        lockScroll(event);
        return;
    }

    // Determine the scroll direction
    let scrollDirection = 0;

    if (event.deltaY !== undefined) {
        scrollDirection = event.deltaY;
    } else if (event.touches && event.touches.length > 1) {
        // If it is a touch event and we have two fingers (pinch), don't handle it
        return;
    } else if (event.touches) {
        // For touch events, use the difference between two touch points to detect scroll
        const touchStart = event.touches[0].clientY;
        const touchEnd = event.touches[1]?.clientY || touchStart;
        scrollDirection = touchStart - touchEnd;
    }

    // Add sensitivity control: only trigger scroll if deltaY exceeds a threshold
    if (Math.abs(scrollDirection) < sensitivity) {
        return; // Ignore small scroll movements to prevent "micro-scrolls"
    }

    // Get the currently visible section
    const currentSectionIndex = [...sections].findIndex(
        section => section.getBoundingClientRect().top >= 0
    );

    if (scrollDirection > 0) {
        // Scroll down - move to the next section if it's not the last section
        if (currentSectionIndex < sectionCount - 1) {
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // Scroll up - move to the previous section if it's not the first section
        if (currentSectionIndex > 0) {
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Set the throttle to true and reset it after a delay (300ms for quicker response)
    isThrottled = true;
    setTimeout(() => {
        isThrottled = false; // Reset throttle after delay
    }, 300); // Shorten throttle delay time to 300ms for quicker response on mobile
};

// Handle wheel events for desktops
window.addEventListener('wheel', (event) => {
    handleScroll(event);
}, { passive: false });

// Handle touchmove events for mobile devices
window.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        // Only handle single touch events (prevents multi-touch issues like zoom)
        handleScroll(event);
    } else {
        // If there are multiple touch points (e.g., pinch-to-zoom), ignore the event
        return;
    }
}, { passive: false });
