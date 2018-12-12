
const cards = document.querySelectorAll('.card');
const cardWrapper = document.getElementById('card-wrapper');
let cardHeight = 360;

function randomContent() {
  let html  = `<h2>${chance.sentence()}</h2>`;
      // html += `<h4>${chance.sentence({ words: 5 })}</h4>`;
      html += `<h4>${chance.company()}</h4>`;
      html += `<p>${chance.paragraph()}</p>`;
      html += `<p>${chance.paragraph()}</p>`;
  return html;
}

function positionCard(index) {
  const el = cards[index];
  const y = index * cardHeight;
  const margin = cardWrapper.clientWidth * 0.025;
  el.style.transform = `scaleX(.95) translateY(${y + margin * index}px)`;

}

function openCard(el, delay) {
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
  el.classList.add('anim-out');
  document.body.classList.remove('no-scroll');
  positionCard(index);
  setTimeout(() => {
    el.classList.remove('expanded', 'anim-out');
    el.style.top = `0`;
  }, delay);
}

function translateCard(el) {
  el.style.transform = 'scaleX(.95) translateY(-389px)';
}

function cardExpansion(index) {
  let delay = 250;
  if (!cards[index].classList.contains('expanded')) {
    openCard(cards[index], delay);
  } else {
    closeCard(index, delay);
  }
}

for (let i = 0; i < cards.length; i++) {
  positionCard(i);
  cards[i].querySelector('.card-body--inner').innerHTML = randomContent();
  let cardHeader = cards[i].querySelector('.card-header');
  cardHeader.querySelector('h1').innerHTML = chance.animal();
  cardHeader.addEventListener('click', (e) => {
    e.preventDefault();

    cards[cards.length - 1].style.marginBottom = '50vh';
    // cards[i].scrollIntoView();

    cardExpansion(i);

  });
}
