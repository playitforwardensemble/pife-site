/* script.js */

document.addEventListener('DOMContentLoaded', function() {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const header = document.querySelector('header'); // Select the single header element
    const heroSection = document.querySelector('.hero-section');

    let lastScrollY = 0; // To track the previous scroll position

    // This logic only applies if a hero section exists on the page
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight; // Get the full height of the hero section
        // Threshold: header logic begins when scrolled past hero's bottom
        const scrollThreshold = heroHeight;

        // Function to handle scroll event
        function handleScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > scrollThreshold) {
                // User is scrolled past the hero section area

                // Always add 'scrolled-header' when past the hero, to make it fixed and hidden by default
                


                if (currentScrollY < lastScrollY) {
                    // SCROLLING UP: make fixed header visible (slides down and fades in)
                    header.classList.add('scrolled-header');
                    header.classList.add('is-visible');
                } else {
                    // SCROLLING DOWN: make fixed header hidden (slides up and fades out)
                    header.classList.remove('is-visible');
                }

            } else {
                if (header.classList.contains('scrolled-header')) {
                    header.classList.remove('is-visible'); // This initiates the fade-out animation

                    const onTransitionEnd = (event) => {
                        if (event.propertyName === 'opacity' && !header.classList.contains('is-visible') && window.scrollY <= scrollThreshold) {
                            header.classList.remove('scrolled-header'); // Remove fixed styling (reverts to absolute)
                            header.removeEventListener('transitionend', onTransitionEnd);
                        }
                    };
                    header.addEventListener('transitionend', onTransitionEnd);
                }
            }

            lastScrollY = currentScrollY; // Update last scroll position for next check
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Run on initial load in case the page is already scrolled (e.g., refreshing in middle of page)
        //handleScroll();

    } else {
        // If there's NO hero section on a page (e.g., if you add a page without one)
        // the header should always be fixed and visible by default.
        header.classList.add('scrolled-header');
        header.classList.add('is-visible'); // Make fixed header visible
    }
});