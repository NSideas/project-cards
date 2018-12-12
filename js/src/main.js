
const cards = document.querySelectorAll('.card');

function randomContent() {
  const title = chance.sentence();
  const subTitle = chance.sentence({ words: 5 });
  const description = chance.paragraph();
  let html = `<h2>${title}</h2>`;
  html += `<h5>${subTitle}</h5>`;
  html += `<p>${description}</p>`;
  return html;
}

for (let card of cards) {
  card.querySelector('.card-body--inner').innerHTML = randomContent();
  card.addEventListener('click', () => {
    let delay = 125;
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
