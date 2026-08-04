/* =====================================================
   RUET Esports Community
   Main JavaScript
===================================================== */

import { initNavbar } from "./modules/navbar.js";
import { initScroll } from "./modules/scroll.js";
import { initGallery } from "./modules/gallery.js";
import { initContact } from "./modules/contact.js";
import { initAnimations } from "./modules/animations.js";

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

    initScroll();

    initGallery();

    initContact();

    initAnimations();

});