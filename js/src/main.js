
const cards = document.querySelectorAll('.card');
const cardWrapper = document.getElementById('card-wrapper');
let cardHeight = 360;

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
  console.log(hh);
  const y = hh + index * cardHeight;
  const margin = cardWrapper.clientWidth * 0.025;
  el.style.transform = `scaleX(.95) translateY(${y + margin * index}px)`;
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
