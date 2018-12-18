

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

function positionCard(card) {
  const index = childIndex(card);
  const header = document.getElementById('header');
  const hh = header ? header.clientHeight : 0;
  const y = hh + index * cardHeight;
  card.style.transform = `scaleX(${cardScale}) translateY(${y + gutter * index}px)`;
}

function openCard(card, project, push) {
  if (push) {
    const index = childIndex(card);
    const stateObj = { page: index };
    history.pushState(stateObj, 'project page', `?content=${project}`);
  }
  card.classList.add('expanded', 'anim-in');
  document.body.classList.add('no-scroll');
  card.style.transform = `scaleX(1) translateY(${window.pageYOffset}px)`;
  card.style.top = `-${window.pageYOffset}px`;
  setTimeout(() => {
    card.classList.remove('anim-in');
    if (closeButton) {
      closeButton.classList.add('visible');
    }
  }, cardDelay);
}

function closeCard(card) {
  if (closeButton) {
    closeButton.classList.remove('visible');
  }
  card.scrollTop = 0;
  card.classList.add('anim-out');
  document.body.classList.remove('no-scroll');
  positionCard(card);
  setTimeout(() => {
    card.classList.remove('expanded', 'anim-out');
    card.style.top = `0`;
  }, cardDelay);
}

function defaultHistoryState() {
  const stateObj = { page: 'project index' };
  history.pushState(stateObj, document.title, window.location.href);
}

function fetchProjectInfo(card, project) {
  openCard(card, project, true);
  fetch(`/pages/${project}.html`).then((response) => {
    return response.text();
  }).then((content) => {
    const cardBody = card.querySelector('.card-body--outer');
    cardBody.innerHTML += content;
    setTimeout(() => {
      card.classList.add('content-loaded');
    }, 125);
  }).catch((err) => {
    console.log('Fetch Error', err);
  });
}

function closeCurrentCard() {
  const currentCard = document.querySelector('.card.expanded');
  closeCard(currentCard);
}

function setUpCards() {
  const wrapperHeight = cards.length * (cardHeight + gutter);
  cardWrapper.style.height = `${wrapperHeight}px`;
  defaultHistoryState();
  for (let card of cards) {
    positionCard(card);
    let cardHeader = card.querySelector('.card-header');
    let project = cardHeader.getAttribute('href');
    cardHeader.addEventListener('click', () => {
      if (!card.classList.contains('content-loaded')) {
        fetchProjectInfo(card, project);
      } else if (!card.classList.contains('expanded')) {
        openCard(card, project, true);
      }
    });
  }
}

setUpCards();

window.addEventListener('popstate', (e) => {
  if (e.state.page === 'project index') {
    closeCurrentCard();
  } else {
    openCard(cards[e.state.page], `project-${e.state.page + 1}`, false);
  }
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function pageLoad() {
  if (window.location.search) {
    const project = getUrlParameter('content');
    fetchProjectInfo(document.getElementById(project), project, true);
  }
}

window.addEventListener('load', pageLoad);
