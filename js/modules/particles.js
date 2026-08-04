/* =====================================================
   Hero Particles
===================================================== */

function initializeParticles() {

    const container = document.querySelector(".hero__particles");

    if (!container) return;

    for (let i = 0; i < 25; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";

        particle.style.animationDelay = Math.random() * 6 + "s";
        particle.style.animationDuration = 4 + Math.random() * 6 + "s";

        container.appendChild(particle);

    }

}