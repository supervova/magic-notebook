/* eslint-disable no-plusplus, no-multi-assign  */

/**
 * -----------------------------------------------------------------------------
 * LOCAL NAVIGATION: SCROLL TO TARGET
 * -----------------------------------------------------------------------------
 */

jQuery(document).ready(($) => {
  $('.carousel').carousel({
    interval: 10000,
  });

  $('.navbar__link, .navbar__menu .dropdown__item').click((e) => {
    const target = $(e.currentTarget).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top,
    }, 800);
    return false;
  });
});
