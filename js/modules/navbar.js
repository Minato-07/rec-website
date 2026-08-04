/* =====================================================
   RUET Esports Community
   Navbar Module
===================================================== */

export function initNavbar() {

    /* ==========================================
       Elements
    ========================================== */

    const header = document.getElementById("header");

    const mobileNav = document.getElementById("mobileNav");

    const toggle = document.getElementById("navbarToggle");

    const closeButton = document.getElementById("mobileNavClose");

    const overlay = document.getElementById("navbarOverlay");

    if (!header || !mobileNav || !toggle || !overlay) return;

    const desktopLinks = document.querySelectorAll(".navbar__link");

    const mobileLinks = document.querySelectorAll(".mobile-nav__link");

    const allLinks = [...desktopLinks, ...mobileLinks];

    const sections = document.querySelectorAll("main section[id]");

    let isMenuOpen = false;

    let ticking = false;

    /* ==========================================
       Open Mobile Menu
    ========================================== */

    function openMenu() {

        mobileNav.classList.add("is-open");

        overlay.classList.add("is-active");

        toggle.classList.add("is-active");

        toggle.setAttribute("aria-expanded", "true");

        document.body.classList.add("menu-open");

        isMenuOpen = true;

    }

    /* ==========================================
       Close Mobile Menu
    ========================================== */

    function closeMenu() {

        mobileNav.classList.remove("is-open");

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

        isMenuOpen ? closeMenu() : openMenu();

    });

    /* ==========================================
       Close Button
    ========================================== */

    if (closeButton) {

        closeButton.addEventListener("click", closeMenu);

    }

    /* ==========================================
       Overlay
    ========================================== */

    overlay.addEventListener("click", closeMenu);

    /* ==========================================
       ESC Key
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && isMenuOpen) {

            closeMenu();

        }

    });

    /* ==========================================
       Close After Clicking Link
    ========================================== */

    mobileLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

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

            const top = section.offsetTop - 140;

            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {

                currentSection = section.id;

            }

        });

        allLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    /* ==========================================
       Smooth Scroll
    ========================================== */

    allLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId.startsWith("#")) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            closeMenu();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

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
       Events
    ========================================== */

    window.addEventListener("scroll", handleScroll, {

        passive: true

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992 && isMenuOpen) {

            closeMenu();

        }

    });

    /* ==========================================
       Initial State
    ========================================== */

    updateNavbar();

    updateActiveLink();

}