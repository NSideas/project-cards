"use strict";var cards=document.querySelectorAll(".card"),cardWrapper=document.getElementById("card-wrapper"),closeButton=document.getElementById("close-project"),cardDelay=250,mq={small:window.matchMedia("(min-width: 400px)"),medium:window.matchMedia("(min-width: 700px)"),large:window.matchMedia("(min-width: 1000px)")},cardHeight=mq.medium.matches?480:mq.small.matches?360:300,cardScale=mq.small.matches?.95:.925,gutter=cardWrapper.clientWidth*(1-cardScale)/2,childIndex=function e(t){return Array.from(t.parentNode.children).indexOf(t)};function randomProjectContent(e){var t="<h1>".concat(chance.animal()," ").concat(chance.animal(),"</h1>"),c="<h2>".concat(chance.sentence(),"</h2>");c+="<h4>".concat(chance.company(),"</h4>"),c+="<p>".concat(chance.paragraph(),"</p>"),c+="<p>".concat(chance.paragraph(),"</p>"),e.querySelector(".card-header").innerHTML=t,e.querySelector(".card-body--inner").innerHTML=c}function positionCard(e){var t=cards[e],c=document.getElementById("header"),a,n=(c?c.clientHeight:0)+e*cardHeight;t.style.transform="scaleX(".concat(cardScale,") translateY(").concat(n+gutter*e,"px)")}function openCard(e){var t=cards[e];t.classList.add("expanded","anim-in"),document.body.classList.add("no-scroll"),t.style.transform="scaleX(1) translateY(".concat(window.pageYOffset,"px)"),t.style.top="-".concat(window.pageYOffset,"px"),setTimeout(function(){t.classList.remove("anim-in"),closeButton&&closeButton.classList.add("visible")},cardDelay)}function closeCard(e){closeButton&&closeButton.classList.remove("visible");var t=cards[e];t.scrollTop=0,t.classList.add("anim-out"),document.body.classList.remove("no-scroll"),positionCard(e),setTimeout(function(){t.classList.remove("expanded","anim-out"),t.style.top="0"},cardDelay)}function fetchProjectInfo(c,e){openCard(c),fetch(e).then(function(e){return e.text()}).then(function(e){var t;cards[c].querySelector(".card-body--outer").innerHTML+=e,setTimeout(function(){cards[c].classList.add("content-loaded")},125)}).catch(function(e){console.log("Fetch Error",e)})}function setUpCards(){var e=cards.length*(cardHeight+gutter);cardWrapper.style.height="".concat(e,"px"),closeButton.addEventListener("click",function(){var e=document.querySelector(".card.expanded");closeCard(childIndex(e))});for(var t=function e(t){positionCard(t);var c=cards[t].querySelector(".card-header"),a=c.getAttribute("href");c.addEventListener("click",function(){cards[t].classList.contains("content-loaded")?cards[t].classList.contains("expanded")||openCard(t):fetchProjectInfo(t,a)})},c=0;c<cards.length;c++)t(c)}setUpCards();
//# sourceMappingURL=index.js.map