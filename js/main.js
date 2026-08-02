/* =====================================================
   RUET Esports Community
   Version 0.1
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Navbar Scroll Effect
    ========================================== */

    const header = document.querySelector(".header");

    function updateNavbar() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

    /* ==========================================
       Smooth Scroll
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /* ==========================================
       Hero Mouse Glow
    ========================================== */

    const glow = document.querySelector(".hero-glow");

    if (glow) {

        document.addEventListener("mousemove", (e) => {

            const x = e.clientX;
            const y = e.clientY;

            glow.animate(

                {
                    left: `${x - 350}px`,
                    top: `${y - 350}px`
                },

                {
                    duration: 800,
                    fill: "forwards",
                    easing: "ease-out"
                }

            );

        });

    }

});