$(document).ready(function () {
  window.toggleMenu = function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  }
  $(".navbar-burger").click(toggleMenu);
});
