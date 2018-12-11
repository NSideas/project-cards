
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
    card.classList.add('animating');
    if (!card.classList.contains('expanded')) {
      card.classList.add('expanded');
      document.body.classList.add('no-scroll');
    } else {
      card.classList.remove('expanded');
      document.body.classList.remove('no-scroll');
    }
    setTimeout(() => {
      card.classList.remove('animating');
    }, 1000)
  });
}
