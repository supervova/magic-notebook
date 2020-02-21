/* eslint-disable no-plusplus, no-multi-assign  */

/**
 * -----------------------------------------------------------------------------
 * UTILITIES
 * -----------------------------------------------------------------------------
 */

// Avoid `console` errors in browsers that lack a console
(() => {
  let method;
  const noop = () => {};
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn',
  ];
  let length = methods.length;
  const console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();


/**
 * -----------------------------------------------------------------------------
 * LOCAL NAVIGATION: SCROLL TO TARGET
 * -----------------------------------------------------------------------------
 */

jQuery(document).ready(($) => {
  $('.carousel').carousel({
    interval: 5000,
  });

  $('.navbar__link, .navbar__menu .dropdown__item').click((e) => {
    const target = $(e.currentTarget).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top,
    }, 800);
    return false;
  });
});
