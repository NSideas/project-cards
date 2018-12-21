
const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const childIndex = (el) => Array.from(el.parentNode.children).indexOf(el);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const siteTitle = document.querySelector('.site-title');
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
  console.log('Positioning card');
  const index = childIndex(card);
  const header = document.getElementById('header');
  const hh = header ? header.clientHeight : 0;
  const y = hh + index * cardHeight;
  card.style.transform = `scaleX(${cardScale}) translateY(${y + gutter * index}px)`;
}

function fetchProjectInfo(card, project) {
  console.log('Fetching project info');
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

function openCard(card, project, push) {
  console.log('Opening card');
  if (push) {
    const stateObj = { content: project };
    history.pushState(stateObj, 'project page', `?content=${project}`);
  }
  card.classList.add('expanded', 'anim-in');
  card.style.transform = `scaleX(1) translateY(${window.pageYOffset}px)`;
  card.style.top = `-${window.pageYOffset}px`;
  bodyScrollLock.disableBodyScroll(card);
  const style = getComputedStyle(card.querySelector('.card-header'));
  const backgroundColor = style.backgroundColor;
  // console.log(backgroundColor);
  setTimeout(() => {
    card.classList.remove('anim-in');
    if (closeButton) {
      closeButton.classList.add('visible');
    }
  }, cardDelay);
  if (!card.classList.contains('content-loaded')) {
    fetchProjectInfo(card, project);
  }
}

function closeCard(card) {
  if (closeButton) {
    closeButton.classList.remove('visible');
  }
  card.scrollTop = 0;
  card.classList.add('anim-out');
  bodyScrollLock.enableBodyScroll(card);
  positionCard(card);
  setTimeout(() => {
    card.classList.remove('expanded', 'anim-out');
    card.style.top = `0`;
  }, cardDelay);
}

function closeCurrentCard() {
  const currentCard = document.querySelector('.card.expanded');
  closeCard(currentCard);
}

function defaultHistoryState(push) {
  const stateObj = { content: 'project index' };
  if (push) {
    history.pushState(stateObj, document.title, 'index.html');
  } else {
    history.replaceState(stateObj, document.title, 'index.html');
  }
}

function setUpCards() {
  console.log('Setting up cards');
  calculateScale();
  setWrapperHeight();
  if (!getUrlParameter('content')) {
    defaultHistoryState();
  }
  for (let card of cards) {
    positionCard(card);
    let cardHeader = card.querySelector('.card-header');
    let project = card.getAttribute('id');
    cardHeader.addEventListener('click', (e) => {
      e.preventDefault();
      if (!card.classList.contains('expanded')) {
        openCard(card, project, true);
      }
    });
  }
}

function resetCards() {
  calculateScale();
  setWrapperHeight();
  for (let card of cards) {
    if (!card.classList.contains('expanded')) {
      positionCard(card);
    }
  }
}

const popStateHandler = (event) => {
  console.log('Popstate fired!');
  if (event.state.content === 'project index') {
    closeCurrentCard();
  } else if (getUrlParameter('content')) {
    const project = getUrlParameter('content');
    openCard(document.getElementById(project), project, false);
  }
};

function pageLoad() {
  if (window.location.search) {
    const project = getUrlParameter('content');
    openCard(document.getElementById(project), project, false);
  }
}

function homeBtnHandler(e) {
  e.preventDefault();
  console.log('click');
  if (getUrlParameter('content') !== '') {
    closeCurrentCard();
    defaultHistoryState(true);
  } else {
    window.location = 'index.html';
  }
}

siteTitle.addEventListener('click', homeBtnHandler);

window.addEventListener('popstate', popStateHandler);

window.addEventListener('load', pageLoad);

window.addEventListener('resize', debounce(() => {
  resetCards();
}, 100));

setUpCards();
setTimeout(() => {
  cardWrapper.classList.add('visible');
  cardWrapper.classList.remove('no-trans');
}, cardDelay);
