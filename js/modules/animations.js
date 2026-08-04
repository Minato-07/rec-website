/* =====================================================
   RUET Esports Community
   Animations Module
===================================================== */

export function initAnimations() {

    const animatedElements = document.querySelectorAll(

        ".about-card, \
        .game-card, \
        .event-card, \
        .gallery__item, \
        .team-card, \
        .stat-card"

    );

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    animatedElements.forEach((element) => {

        observer.observe(element);

    });

}