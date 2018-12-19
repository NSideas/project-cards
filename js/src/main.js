
const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const cards = document.querySelectorAll('.card');
const cardWrapper = document.getElementById('card-wrapper');
const closeButton = document.getElementById('close-project');
const cardDelay = 250;

const mq = {
  small:  window.matchMedia("(min-width: 400px)"),
  medium: window.matchMedia("(min-width: 700px)"),
  large:  window.matchMedia("(min-width: 1000px)")
};

let cardHeight, cardScale, gutter;

function calculateScale() {
  cardHeight = mq.medium.matches ? 480
             : mq.small.matches ? 360
             : 300;

  cardScale = mq.small.matches ? 0.95 : 0.925;
  gutter = cardWrapper.clientWidth * (1 - cardScale)/2;
}

function setWrapperHeight() {
  const wrapperHeight = cards.length * (cardHeight + gutter);
  cardWrapper.style.height = `${wrapperHeight}px`;
}

const childIndex = (el) => Array.from(el.parentNode.children).indexOf(el);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

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
    const stateObj = { content: project };
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
  const stateObj = { content: 'project index' };
  history.pushState(stateObj, document.title, 'index.html');
}

function fetchProjectInfo(card, project) {
  openCard(card, project, true);
  fetch(`./pages/${project}.html`).then((response) => {
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
  calculateScale();
  setWrapperHeight();
  let createPushState = true;
  if (!getUrlParameter('content')) {
    defaultHistoryState();
  }
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

function resetCards() {
  calculateScale();
  setWrapperHeight();
  for (let card of cards) {
    positionCard(card);
  }
}

setUpCards();
setTimeout(() => {
  cardWrapper.classList.add('visible');
  cardWrapper.classList.remove('no-trans');
}, cardDelay);

const popStateHandler = (event) => {
  console.log('Popstate fired!');
  if (event.state.content === 'project index') {
    closeCurrentCard();
  } else {
    const project = getUrlParameter('content');
    openCard(document.getElementById(project), project, false);
  }
};

window.addEventListener('popstate', popStateHandler);

function pageLoad() {
  if (window.location.search) {
    const project = getUrlParameter('content');
    fetchProjectInfo(document.getElementById(project), project, true);
  }
}

window.addEventListener('load', pageLoad);

window.addEventListener('resize', debounce(() => {
  console.log('Window resize');
  resetCards();
}, 100));
