

const cards = document.querySelectorAll('.card');
const cardWrapper = document.getElementById('card-wrapper');


const mq = {
  small:  window.matchMedia("(min-width: 400px)"),
  medium: window.matchMedia("(min-width: 700px)"),
  large:  window.matchMedia("(min-width: 1000px)")
};


let cardHeight = mq.medium.matches ? 480
               : mq.small.matches ? 360
               : 300;

let cardScale = mq.small.matches ? 0.95 : 0.925;
let gutter = cardWrapper.clientWidth * (1 - cardScale)/2;

function randomProjectContent(el) {
  let projectTitle = `<h1>${chance.animal()} ${chance.animal()}</h1>`;
  let projectBody  = `<h2>${chance.sentence()}</h2>`;
      projectBody += `<h4>${chance.company()}</h4>`;
      projectBody += `<p>${chance.paragraph()}</p>`;
      projectBody += `<p>${chance.paragraph()}</p>`;

  el.querySelector('.card-header').innerHTML = projectTitle;
  el.querySelector('.card-body--inner').innerHTML = projectBody;
}

function positionCard(index) {
  const el = cards[index];
  const header = document.getElementById('header');
  const hh = header ? header.clientHeight : 0;
  const y = hh + index * cardHeight;
  el.style.transform = `scaleX(${cardScale}) translateY(${y + gutter * index}px)`;
}

function openCard(index, delay) {
  const el = cards[index];
  if (index === cards.length - 1) {
    cards[index - 1].classList.add('extra-margin');
  }
  el.classList.add('expanded', 'anim-in');
  document.body.classList.add('no-scroll');
  el.style.transform = `scaleX(1) translateY(${window.pageYOffset}px)`;
  el.style.top = `-${window.pageYOffset}px`;
  setTimeout(() => {
    el.classList.remove('anim-in');
  }, delay);
}

function closeCard(index, delay) {
  const el = cards[index];
  el.scrollTop = 0;
  el.classList.add('anim-out');
  document.body.classList.remove('no-scroll');
  positionCard(index);
  setTimeout(() => {
    el.classList.remove('expanded', 'anim-out');
    el.style.top = `0`;
    if (index === cards.length - 1) {
      cards[index - 1].classList.remove('extra-margin');
    }
  }, delay);
}

function cardExpansion(index) {
  let delay = 250;
  if (!cards[index].classList.contains('expanded')) {
    openCard(index, delay);
  } else {
    closeCard(index, delay);
  }
}

for (let i = 0; i < cards.length; i++) {
  positionCard(i);
  randomProjectContent(cards[i]);
  let cardHeader = cards[i].querySelector('.card-header');
  cardHeader.addEventListener('click', (e) => {
    e.preventDefault();
    cardExpansion(i);
  });
}
