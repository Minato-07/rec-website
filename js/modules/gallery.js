/* =====================================================
   RUET Esports Community
   Gallery Module
===================================================== */

export function initGallery() {

    const galleryItems = document.querySelectorAll(".gallery__item");

    if (!galleryItems.length) return;

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            // Lightbox will be implemented later.

        });

    });

}