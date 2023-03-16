const subscribeForm = document.getElementsByClassName("menu__subscribe-form");
const subscribeButton = document.getElementsByClassName(
  "menu__subscribe-button"
);

subscribeButton[0].addEventListener("mouseover", () => {
  subscribeForm[0].classList.add("menu__subscribe-form-hover");
});

subscribeButton[0].addEventListener("mouseout", () => {
  subscribeForm[0].classList.remove("menu__subscribe-form-hover");
});
