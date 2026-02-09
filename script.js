// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Confetti Text Effect
document.querySelectorAll('.confetti-trigger').forEach(trigger => {
    trigger.addEventListener('mouseenter', function (e) {
        // Prevent multiple triggers in quick succession if desired, 
        // but for now allow it for "more confetti" feel

        const phrases = this.dataset.phrases.split('|');
        const rect = this.getBoundingClientRect();

        // Center of the trigger element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        phrases.forEach((phrase, index) => {
            const el = document.createElement('span');
            el.classList.add('confetti-piece');
            el.textContent = phrase;
            document.body.appendChild(el);

            // Initial position (center of word)
            el.style.left = `${centerX}px`;
            el.style.top = `${centerY}px`;
            el.style.opacity = '0';
            el.style.transform = 'translate(-50%, -50%) scale(0.5)';

            // Randomize direction and distance
            // Spread them out more evenly or random
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = 60 + Math.random() * 80; // Distance to travel
            const duration = 3000 + Math.random() * 1500; // Slower duration for readability

            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;

            // Animate using Web Animations API for smoothness
            const animation = el.animate([
                {
                    opacity: 0,
                    transform: 'translate(-50%, -50%) scale(0.5)'
                },
                {
                    opacity: 1,
                    transform: `translate(calc(-50% + ${destX * 0.1}px), calc(-50% + ${destY * 0.1}px)) scale(1)`,
                    offset: 0.1 // Fade in quickly (10%)
                },
                {
                    opacity: 1,
                    transform: `translate(calc(-50% + ${destX * 0.8}px), calc(-50% + ${destY * 0.8}px)) scale(1)`,
                    offset: 0.8 // Stay visible for longer (until 80%)
                },
                {
                    opacity: 0,
                    transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(1)`
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            });

            animation.onfinish = () => el.remove();
        });
    });
});
