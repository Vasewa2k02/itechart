const burgerMenu = document.getElementsByClassName("burger-menu");
const navMenu = document.getElementsByClassName("nav__menu");

burgerMenu[0].addEventListener("click", function () {
  burgerMenu[0].classList.toggle("active");
  navMenu[0].classList.toggle("active");
});
