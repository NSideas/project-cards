

const cards = document.querySelectorAll('.card');
const cardWrapper = document.getElementById('card-wrapper');
const closeButton = document.getElementById('close-project');
const cardDelay = 250;

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

const childIndex = (el) => Array.from(el.parentNode.children).indexOf(el);

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

function openCard(index) {
  const el = cards[index];
  el.classList.add('expanded', 'anim-in');
  document.body.classList.add('no-scroll');
  el.style.transform = `scaleX(1) translateY(${window.pageYOffset}px)`;
  el.style.top = `-${window.pageYOffset}px`;
  setTimeout(() => {
    el.classList.remove('anim-in');
    if (closeButton) {
      closeButton.classList.add('visible');
    }
  }, cardDelay);
}

function closeCard(index) {
  if (closeButton) {
    closeButton.classList.remove('visible');
  }
  const el = cards[index];
  el.scrollTop = 0;
  el.classList.add('anim-out');
  document.body.classList.remove('no-scroll');
  positionCard(index);
  setTimeout(() => {
    el.classList.remove('expanded', 'anim-out');
    el.style.top = `0`;
  }, cardDelay);
}

function fetchProjectInfo(index, project) {
  openCard(index);
  fetch(project).then((response) => {
    return response.text();
  }).then((content) => {
    const cardBody = cards[index].querySelector('.card-body--outer');
    cardBody.innerHTML += content;
    const stateObj = { page: index };
    history.pushState(stateObj, "project page", project);
    setTimeout(() => {
      cards[index].classList.add('content-loaded');
    }, 125);
  }).catch((err) => {
    console.log('Fetch Error', err);
  });
}

function closeCurrentCard() {
  const currentCard = document.querySelector('.card.expanded');
  closeCard(childIndex(currentCard));
}

function setUpCards() {
  const wrapperHeight = cards.length * (cardHeight + gutter);
  cardWrapper.style.height = `${wrapperHeight}px`;
  closeButton.addEventListener('click',;
  for (let i = 0; i < cards.length; i++) {
    positionCard(i);
    let cardHeader = cards[i].querySelector('.card-header');
    let project = cardHeader.getAttribute('href');
    cardHeader.addEventListener('click', () => {
      if (!cards[i].classList.contains('content-loaded')) {
        fetchProjectInfo(i, project);
      } else if (!cards[i].classList.contains('expanded')) {
        openCard(i);
      }
    });
  }
}

setUpCards();

window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
