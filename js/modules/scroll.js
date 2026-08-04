/* =====================================================
   RUET Esports Community
   Scroll Module
===================================================== */

export function initScroll() {

    const backToTop = document.querySelector(".back-to-top");

    if (!backToTop) return;

    function updateButton() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateButton, {

        passive: true

    });

    backToTop.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    updateButton();

}