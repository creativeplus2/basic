import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function splitText() {
    var splitTextWords = new SplitText(".split-words", {type: "words", wordsClass: "single-word"});
    document.querySelectorAll('.split-words .single-word').forEach(function(el, index){
        el.classList.add('relative', 'inline-block', 'overflow-hidden', 'p-[0.1em]', '-m-[0.1em]');
        wrapInner(el, 'div')    
    })
}

function wrapInner(parent, wrapper) {
    if (typeof wrapper === "string")
        wrapper = document.createElement(wrapper);
        wrapper.classList.add('single-word-inner', 'relative','transform', 'origin-bottom-left');

    var div = parent.appendChild(wrapper);

    while(parent.firstChild !== wrapper)
        wrapper.appendChild(parent.firstChild);
}

function toogleHamburgerButton(isActive, hamburger){
    const tl2 = gsap.timeline();

    if(isActive){
        hamburger.classList.add('active')
        tl2.set(".mobile-nav-item, .mobile-nav-info", { opacity:0, xPercent: 50 })
        .to(".mobile-nav", { ease: "Power4.easeOut", duration: 0.5, autoAlpha:1 })
        .to(".mobile-nav-item", {  ease: "Power4.easeOut", duration: 1, xPercent: 0, opacity: 1, stagger: .05 })
        .to(".mobile-nav-info", {  ease: "Power4.easeOut", duration: 1, xPercent: 0, opacity: 1},"-=.8")
    }else{
        hamburger.classList.remove('active')
        tl2.to(".mobile-nav-info", {  ease: "Power4.easeOut", duration: .25, opacity: 0})
        .to(".mobile-nav-item", { ease: "Power4.easeOut", duration: .7, opacity: 0, stagger: .025 },"-=.25")
        .to(".mobile-nav", { ease: "Power0.easeNone", duration: 0.5, autoAlpha:0 },"-=.25")
    }
}
function hamburgerButton(){
    let hamburger = document.querySelector('.hamburger')
    let isActive = false;
    hamburger.addEventListener('click', function(){
        isActive = !isActive;
        toogleHamburgerButton(isActive, hamburger)
    });
}
function headerChangeColor() {
    const navbar = document.querySelector('.nav-bar');
    const navHeight = navbar?.offsetHeight * 0.8;
    const sectionsDark = gsap.utils.toArray('.theme-dark');
    sectionsDark.forEach(sectionDark => {
        ScrollTrigger.create({
            trigger: sectionDark,
            start: () => "0% " + navHeight,
            end: "100% " + navHeight,
            onEnter: () => functionAddDark(),
            onEnterBack: () => functionAddDark(),
            markers: false,
        });
        function functionAddDark() {

            if (navbar?.classList.contains('theme-dark')) {
            } else {
                navbar?.classList.remove('theme-light');
                navbar?.classList.add('theme-dark');
            }
        };
    });

    const sectionsLight = gsap.utils.toArray('.theme-light');
    sectionsLight.forEach(sectionLight => {
        ScrollTrigger.create({
            trigger: sectionLight,
            start: () => "0% " + navHeight,
            end: "100% " + navHeight,
            onEnter: () => functionAddLight(),
            onEnterBack: () => functionAddLight(),
            markers: false,
        });
        function functionAddLight() {
            if (navbar?.classList.contains('theme-light')) {
            } else {
                navbar?.classList.remove('theme-dark');
                navbar?.classList.add('theme-light');
            }
        };
    });
}


function disableLinks() {
    var links = document.querySelectorAll('a[href]');
    var cbk = function(e) {
        if(e.currentTarget.href === window.location.href) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    for(var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', cbk);
    }
}

 export { splitText, hamburgerButton, headerChangeColor, disableLinks }