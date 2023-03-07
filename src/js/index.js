import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, SplitText)
import barba from '@barba/core'
// import barbaPrefetch from '@barba/prefetch';
// barba.use(barbaPrefetch);
import initSwiperSlider from "./swiper"
import { loadAnimation, pageTransition, observer } from "./scrolltrigger"
import { splitText, hamburgerButton, headerChangeColor, disableLinks} from "./nav"
import { initScroll, initSmoothScroll } from "./locoscroll"
import { Tabs } from './tabs.js';
import { Accordions } from './accordions.js';

function initTabs(){
	// store tabs variable
    const tabs = document.querySelectorAll(".tabs");
    if(tabs){
        tabs.forEach(function(tabs){

            const tabButton = tabs.querySelectorAll(".tab-button");
            const contents = tabs.querySelectorAll(".tab-content");
            const tabfirstChild = tabs.querySelector('.tab-button-wrapper').firstElementChild;
            tabfirstChild.classList.add('active');
            const contentfirstChild = tabs.querySelector('.tab-content-wrapper').firstElementChild;
            contentfirstChild.classList.add('active');
            
            tabs.onclick = e => {
                const id = e.target.dataset.id;
                if (id) {
                tabButton.forEach(btn => {
                    btn.classList.remove("active");
                });
                e.target.classList.add("active");
            
                contents.forEach(content => {
                    content.classList.remove("active");
                });
                const element = document.getElementById(id);
                element.classList.add("active");
                }
            }
        })
    }
};


function initScript() {
    const tabs = new Tabs()
    const accordion = new Accordions()
    initScroll()
    splitText()
    hamburgerButton()
    headerChangeColor()
    initSwiperSlider()
    disableLinks()
    // initTabs()
    observer()
}

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

export default function initPageTransitions() {
      //let scroll;

        // do something after the transition finishes
    barba.hooks.after(() => {
        document.querySelector('html').classList.remove('is-transitioning');
        // reinit locomotive scroll
        scroll.init();
        scroll.update();
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        scroll.destroy();
    });
    // scroll to the top of the page
    barba.hooks.afterEnter(() => {
        window.scrollTo(0, 0);
    });


    barba.init({
        sync: true,
        debug: true,
        timeout: 7000,
        transitions: [{
            name: 'default',
            once(data) {
                initSmoothScroll(data.next.container);
                initScript();
                loadAnimation();
            },
            async leave(data) {
                pageTransition(data.current);
                await delay(500);
                data.current.container.remove();
            },
            async enter(data) {
                loadAnimation(data.next);
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                scroll.destroy();
                initSmoothScroll(data.next.container);
                initScript();
            },
        }]
    })
}

