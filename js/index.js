"use strict";var cards=document.querySelectorAll(".card"),cardWrapper=document.getElementById("card-wrapper"),cardHeight=360;function randomContent(){var a="<h2>".concat(chance.sentence(),"</h2>");return a+="<h4>".concat(chance.company(),"</h4>"),a+="<p>".concat(chance.paragraph(),"</p>"),a+="<p>".concat(chance.paragraph(),"</p>")}function positionCard(a){var n=cards[a],c=a*cardHeight,e=.025*cardWrapper.clientWidth;n.style.transform="scaleX(.95) translateY(".concat(c+e*a,"px)")}function openCard(a,n){var c=cards[a];a===cards.length-1&&cards[a-1].classList.add("extra-margin"),c.classList.add("expanded","anim-in"),document.body.classList.add("no-scroll"),c.style.transform="scaleX(1) translateY(".concat(window.pageYOffset,"px)"),c.style.top="-".concat(window.pageYOffset,"px"),setTimeout(function(){c.classList.remove("anim-in")},n)}function closeCard(a,n){var c=cards[a];c.scrollTop=0,c.classList.add("anim-out"),document.body.classList.remove("no-scroll"),positionCard(a),setTimeout(function(){c.classList.remove("expanded","anim-out"),c.style.top="0",a===cards.length-1&&cards[a-1].classList.remove("extra-margin")},n)}function cardExpansion(a){var n=250;cards[a].classList.contains("expanded")?closeCard(a,n):openCard(a,n)}for(var _loop=function a(n){positionCard(n),cards[n].querySelector(".card-body--inner").innerHTML=randomContent();var c=cards[n].querySelector(".card-header");c.querySelector("h1").innerHTML="".concat(chance.animal()," ").concat(chance.animal()),c.addEventListener("click",function(a){a.preventDefault(),cardExpansion(n)})},i=0;i<cards.length;i++)_loop(i);
//# sourceMappingURL=index.js.map