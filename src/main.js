/* eslint-disable no-unused-vars */
// import * as Bootstrap from 'bootstrap';
// import { Carousel } from '../node_modules/bootstrap/js/dist/carousel';
// import { Carousel } from '../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';
// import { Modal } from '../node_modules/bootstrap/js/dist/modal';
import 'bootstrap/js/src/carousel.js';
import 'bootstrap/js/src/modal.js';

/**
 * -----------------------------------------------------------------------------
 * LIGHTBOX
 * -----------------------------------------------------------------------------
 */

const lightbox = document.getElementById('lightbox');

if (lightbox) {
  lightbox.addEventListener('show.bs.modal', (event) => {
    // Button that triggered the modal
    const button = event.relatedTarget;

    // Extract info from data-bs-* attributes
    const lightboxData = button.getAttribute('data-bs-src');

    // Update the modal's content.
    const modalImage = lightbox.querySelector('img');
    modalImage.src = lightboxData;
  });
}

// Autoplay the teaser
const teaserModal = document.getElementById('modal-video');

teaserModal.addEventListener('shown.bs.modal', (event) => {
  teaserModal.querySelector('iframe').src += '&autoplay=1';
});

/* Set scrollbar width variables to calculate full bleed width to avoid
horizontal overflow */
document.documentElement.style.setProperty(
  '--scrollbar-width',
  `${window.innerWidth - document.documentElement.clientWidth}px`
);
