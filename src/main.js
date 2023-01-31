/* eslint-disable no-unused-vars */
// import * as Bootstrap from 'bootstrap';
// import { Carousel } from '../node_modules/bootstrap/js/dist/carousel';
// import { Carousel } from '../node_modules/bootstrap/dist/js/bootstrap.esm.min.js';
// import { Modal } from '../node_modules/bootstrap/js/dist/modal';
import '../node_modules/bootstrap/js/src/carousel';
import '../node_modules/bootstrap/js/src/modal';

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

const teaserModal = document.getElementById('modal-video');

teaserModal.addEventListener('shown.bs.modal', (event) => {
  teaserModal.querySelector('iframe').src += '&autoplay=1';
});
