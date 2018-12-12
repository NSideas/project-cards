
const cards = document.querySelectorAll('.card');

function randomContent() {
  let html  = `<h2>${chance.sentence()}</h2>`;
      html += `<h4>${chance.sentence({ words: 5 })}</h4>`;
      html += `<p>${chance.paragraph()}</p>`;
  return html;
}

for (let card of cards) {
  card.querySelector('.card-body--inner').innerHTML = randomContent();
  card.querySelector('.card-header').addEventListener('click', () => {
    let delay = 250;
    if (!card.classList.contains('expanded')) {
      card.classList.add('expanded', 'anim-in');
      document.body.classList.add('no-scroll');
      setTimeout(() => {
        card.classList.remove('anim-in');
      }, delay);
    } else {
      card.classList.add('anim-out');
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        card.classList.remove('expanded', 'anim-out');
      }, delay);
    }
  });
}
