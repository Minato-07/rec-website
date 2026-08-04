/* =====================================================
   RUET Esports Community
   Navbar Module
===================================================== */

export function initNavbar() {

    /* ==========================================
       Elements
    ========================================== */

    const header = document.getElementById("header");

    const menu = document.getElementById("navbarMenu");

    const toggle = document.getElementById("navbarToggle");

    const overlay = document.getElementById("navbarOverlay");

    if (!header || !menu || !toggle || !overlay) return;

    const navLinks = menu.querySelectorAll(".navbar__link");

    const sections = document.querySelectorAll("main section[id]");

    let isMenuOpen = false;

    let ticking = false;


    /* ==========================================
       Open Menu
    ========================================== */

    function openMenu() {

        menu.classList.add("is-open");

        overlay.classList.add("is-active");

        toggle.classList.add("is-active");

        toggle.setAttribute("aria-expanded", "true");

        document.body.classList.add("menu-open");

        isMenuOpen = true;

    }


    /* ==========================================
       Close Menu
    ========================================== */

    function closeMenu() {

        menu.classList.remove("is-open");

        overlay.classList.remove("is-active");

        toggle.classList.remove("is-active");

        toggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

        isMenuOpen = false;

    }


    /* ==========================================
       Toggle
    ========================================== */

    toggle.addEventListener("click", () => {

        if (isMenuOpen) {

            closeMenu();

        }

        else {

            openMenu();

        }

    });


    /* ==========================================
       Overlay
    ========================================== */

    overlay.addEventListener("click", closeMenu);


    /* ==========================================
       ESC Key
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (

            event.key === "Escape" &&

            isMenuOpen

        ) {

            closeMenu();

        }

    });


    /* ==========================================
       Close After Clicking Link
    ========================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* ==========================================
       Sticky Navbar
    ========================================== */

    function updateNavbar() {

        if (window.scrollY > 30) {

            header.classList.add("header--scrolled");

        }

        else {

            header.classList.remove("header--scrolled");

        }

    }
        /* ==========================================
       Active Navigation Link
    ========================================== */

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 140;

            const sectionBottom = sectionTop + section.offsetHeight;

            if (

                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom

            ) {

                currentSection = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }


    /* ==========================================
       Scroll Handler
    ========================================== */

    function handleScroll() {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                updateNavbar();

                updateActiveLink();

                ticking = false;

            });

            ticking = true;

        }

    }


    /* ==========================================
       Smooth Scroll
    ========================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId.startsWith("#")) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });


    /* ==========================================
       Window Events
    ========================================== */

    window.addEventListener(

        "scroll",

        handleScroll,

        {

            passive: true

        }

    );


    window.addEventListener(

        "resize",

        () => {

            if (

                window.innerWidth > 992 &&

                isMenuOpen

            ) {

                closeMenu();

            }

        }

    );


    /* ==========================================
       Initial State
    ========================================== */

    updateNavbar();

    updateActiveLink();

}