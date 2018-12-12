
const cards = document.querySelectorAll('.card');

function randomContent() {
  let html  = `<h2>${chance.sentence()}</h2>`;
      html += `<h4>${chance.sentence({ words: 5 })}</h4>`;
      html += `<p>${chance.paragraph()}</p>`;
  return html;
}

function cardExpansion(el) {
  let delay = 250;
  if (!el.classList.contains('expanded')) {
    el.classList.add('expanded', 'anim-in');
    document.body.classList.add('no-scroll');
    setTimeout(() => {
      el.classList.remove('anim-in');
    }, delay);
  } else {
    el.classList.add('anim-out');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      el.classList.remove('expanded', 'anim-out');
    }, delay);
  }
}

for (let card of cards) {
  card.querySelector('.card-body--inner').innerHTML = randomContent();
  let cardHeader = card.querySelector('.card-header');
  cardHeader.addEventListener('click', () => {
    cardExpansion(card);
  });
}
