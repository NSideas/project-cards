
const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const mq = {
  small:  window.matchMedia("(min-width: 400px)"),
  medium: window.matchMedia("(min-width: 700px)"),
  large:  window.matchMedia("(min-width: 1000px)")
};

const childIndex = (el) => Array.from(el.parentNode.children).indexOf(el);

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
