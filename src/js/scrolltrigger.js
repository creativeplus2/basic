import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


function loadAnimation() {
    var tl = gsap.timeline();

    tl.set(".loading-fade", {
        autoAlpha: 1,
    });
    tl.set(".single-word-inner", {
        yPercent: 125,
        rotate: 0.001,
        opacity: 0
     });
    tl.set(".fade-in, .fade-in-first", {
        y: "2em",
        opacity: 0
     });
    tl.to(".loading-fade", {
        duration: .45,
        autoAlpha: 0,
        ease: "Linear.easeIn",
    });
    tl.to(".single-word-inner", {
        duration: 1,
        yPercent: 0,
        opacity: 1,
        ease: "Expo.easeOut",
        stagger: .025,
        rotate: 0.001,
     }, "<");
    tl.to(".fade-in", {
        duration: 1.5,
        y: "0em",
        opacity: 1,
        ease: "Expo.easeOut",
        stagger: .05,
        rotate: 0.001,
        clearProps: "all"
     }, "<");
}

function pageTransition() {
    var tl = gsap.timeline();

    tl.to(".loading-fade", {
        duration: .45,
        autoAlpha: 1,
        ease: "Power3.easeOut"
    });


}

function observer(){
  
    if(document.querySelector(".animategroup-bottom-top")) {

        gsap.set(".animate-bottom-top, .animategroup-bottom-top > *", { 
            opacity: 0, y: 150
        });
        ScrollTrigger.batch(".animate-bottom-top", {
            onEnter: batch => gsap.to(batch, {
                scrollTrigger: { 
                    trigger: batch,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                ease: "Power3.easeOut",
                duration: 1,
                opacity: 1,
                y:0,
                stagger: 0.15
            }),
            once: true
        });
        ScrollTrigger.batch('.animategroup-bottom-top', {
            onEnter: batch => {
                batch.forEach((group, index) => gsap.to(group.children, {
                    scrollTrigger: { 
                        trigger: batch,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    ease: "Power3.easeOut",
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.2, 
                    delay: index * 0.2
                }))
            },
            once: true
        });

    }
    // gsap.set(".rollingText", {xPercent: 100})

    // gsap.to(".rollingText", {
    // 	xPercent: -200,
    // 	scrollTrigger: {
    // 		trigger: ".wrapperRollingText",
    // 		scrub: 2,
    // 		start: "-200px center",
    // 		end: "bottom top",
    // 		pin: true,
    // 		pinSpacing: false,
    // 		markers: true
    // 	}
    // });





    if(document.querySelector(".animate-image")) {

        gsap.set(".animate-image", { 
            opacity: 0
        });
        ScrollTrigger.batch(".animate-image", {
            onEnter: batch => gsap.to(batch, {
                scrollTrigger: { 
                    trigger: batch,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
                clipPath:"polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                translateY :0, 
                opacity: 1, 
                duration: .5,
            }),
            once: true
        });

    }

}

export { loadAnimation, pageTransition, observer }