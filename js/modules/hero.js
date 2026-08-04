/* =====================================================
   Hero
===================================================== */

function initializeHero() {

    const logo = document.querySelector(".hero__logo img");

    if (!logo) return;

    window.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 70;
        const y = (window.innerHeight / 2 - e.clientY) / 70;

        logo.style.transform = `translate(${x}px, ${y}px)`;

    });

}