const humanList = [
  {
    imgSrc: "./img/our-team-img1.png",
    imgAlt: "our-team-img1",
    name: "Fahim Rahman",
    link: "@rahman",
  },
  {
    imgSrc: "./img/our-team-img2.png",
    imgAlt: "our-team-img2",
    name: "Kazi Rahman",
    link: "@Rahman",
  },
];

function changeSwitcherButtonBackground(button) {
  const buttons = document.querySelectorAll(".switcher__button");
  buttons.forEach((btn) => btn.classList.remove("switcher__active-button"));
  button.classList.add("switcher__active-button");

  if (button.classList.contains("our-team__newst")) {
    switchOurTeamGroup([
      humanList[0],
      humanList[0],
      humanList[0],
      humanList[0],
    ]);
  } else if (button.classList.contains("our-team__popular")) {
    switchOurTeamGroup([
      humanList[1],
      humanList[1],
      humanList[1],
      humanList[1],
    ]);
  } else if (button.classList.contains("our-team__active")) {
    switchOurTeamGroup([
      humanList[1],
      humanList[0],
      humanList[1],
      humanList[0],
    ]);
  }
}

const ourTeamCards = document.getElementsByClassName("our-team__cards");

function switchOurTeamGroup(humanList) {
  ourTeamCards[0].innerHTML = "";

  for (let i = 0; i < humanList.length; i++) {
    ourTeamCards[0].innerHTML += `<div class="human-card">
                <img
                  src="${humanList[i].imgSrc}"
                  class="human-card__img"
                />
                <p class="human-card__name">${humanList[i].name}</p>
                <p class="human-card__link">${humanList[i].link}</p>
              </div>`;
  }
}

window.onload = function () {
  switchOurTeamGroup([humanList[1], humanList[1], humanList[1], humanList[1]]);
};
