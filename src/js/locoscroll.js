import LocomotiveScroll from 'locomotive-scroll'
import { ScrollTrigger } from "gsap/ScrollTrigger"

function initScroll(){
    // document.querySelectorAll('section').forEach( x=> x.setAttribute('data-scroll-section',''));
    document.querySelectorAll('header,h2,h3,h4,h5,.scroll').forEach( x=> x.setAttribute('data-scroll',''))
    document.querySelectorAll('.scroll-1').forEach( x=> x.setAttribute('data-scroll-speed','-1'))
    document.querySelectorAll('.scroll1').forEach( x=> x.setAttribute('data-scroll-speed','1'))
    document.querySelectorAll('.scroll0').forEach( x=> x.setAttribute('data-scroll-speed','0'))
}

function initSmoothScroll(container) {

    scroll = new LocomotiveScroll({
        el: container.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.15
    });


    window.onresize = scroll.update();

    scroll.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
          return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.defaults({
        scroller: document.querySelector('[data-scroll-container]'),
     });

     /**
      * Remove Old Locomotive Scrollbar
      */

     const scrollbar = document.querySelectorAll('.c-scrollbar');

     if (scrollbar.length > 1) {
        scrollbar[0].remove();
     }

     // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
     ScrollTrigger.addEventListener('refresh', () => scroll.update());

     // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
     ScrollTrigger.refresh();
}

export { initScroll, initSmoothScroll }