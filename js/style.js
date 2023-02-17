const nav = document.querySelector('#nav');

function changeNavBG() {
  if (window.scrollY < 90) {
    nav.classList.remove('nav-scroll');
  } else {
    nav.classList.add('nav-scroll');
  }
}

window.onscroll = function() {
  changeNavBG();
};

