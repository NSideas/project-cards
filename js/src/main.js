
const cards = document.querySelectorAll('.card');

function randomContent() {
  let html  = `<h2>${chance.sentence()}</h2>`;
      html += `<h4>${chance.sentence({ words: 5 })}</h4>`;
      html += `<p>${chance.paragraph()}</p>`;
      html += `<p>${chance.paragraph()}</p>`;
  return html;
}

function openCard(el, delay) {
  el.classList.add('expanded', 'anim-in');
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    el.classList.remove('anim-in');
  }, delay);
}

function closeCard(el, delay) {
  el.classList.add('anim-out');
  document.body.classList.remove('no-scroll');
  setTimeout(() => {
    el.classList.remove('expanded', 'anim-out');
  }, delay);
}

function translateCard(el) {
  el.style.transform = 'scaleX(.95) translateY(-389px)';
}

function cardExpansion(el) {
  let delay = 250;
  if (!el.classList.contains('expanded')) {
    // translateCard(el);
    openCard(el, delay);
  } else {
    closeCard(el, delay);
  }
}

for (let card of cards) {
  card.querySelector('.card-body--inner').innerHTML = randomContent();
  let cardHeader = card.querySelector('.card-header');
  cardHeader.addEventListener('click', (e) => {
    e.preventDefault();
    cardExpansion(card);
  });
}
