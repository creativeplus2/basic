import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
import 'swiper/css/bundle'
import { gsap } from "gsap"

export default function initSwiperSlider() {
    var actueelSwiperSlide = document.querySelectorAll('.actueel-swiper-slider');
    actueelSwiperSlide.forEach(function(el, index){

        var sliderIndexID = 'slider-single-id-' + index;
        el.setAttribute('id', sliderIndexID)    
        var sliderThis = el;
    
        // Init Slider 1: Primary
        var swiperSliderMain = document.querySelector('#' + sliderIndexID + ' .swiper-container-main');
        var swiperMain = new Swiper(swiperSliderMain, {
          simulateTouch: false,
          loop: true,
          grabCursor: false,
          speed: 1200,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><div class="progress">' + '</div></span>';
            },
          },
          lazy: {
            loadPrevNext: true,
          },
          simulateTouch: false,
          effect: "fade"
        });
    
    
        // GSAP Animation Progress Bar (Will trigger slider to slide)
        var tl = gsap.timeline({paused: true});
    
        // Retrigger Animation on Slide Change
        function singleSwiperSliderEnd() {
          swiperMain.slideNext();
          tl.restart();
        }
        
        tl.to(sliderThis.querySelectorAll('.progress'), {
          duration: 5,
          scaleX: 1,
          ease: "Power1.easeInOut",
          onComplete: singleSwiperSliderEnd
        });
    
        // Reset Progress Bar On Slide Change
        swiperMain.on("slideChange", function () {
          startMainSliderBoth();
          addSwiperActiveContent();
        });
  
        startMainSliderBoth();
  
        function startMainSliderBoth() {
           tl.restart();
           addSwiperActiveZoom();
        }
    
        // Pause Carousel/Progress Bar On Hover
        sliderThis.querySelector('.swiper-pagination').addEventListener('mouseenter', function(){
            tl.pause();
        });
    
        sliderThis.querySelector('.swiper-pagination').addEventListener('mouseleave', function(){
            tl.resume();
        });
  
        function addSwiperActiveZoom() {
           gsap.fromTo(".swiper-slide-visible .overlay-zoom", {
              scale: 1
           }, {
              scale: 1.05, 
              ease: "Power1.easeInOut",
              duration: 6.2
           });
        }
        function addSwiperActiveContent() {
           gsap.fromTo(".swiper-slide-visible .flex-col:nth-child(1)", {
              yPercent: 10,
              opacity: 0
           }, {
              yPercent: 0, 
              ease: "Expo.easeOut",
              duration: 1.5,
              opacity: 1,
              delay: 0.9
           });
        }
  
     });
    
     var swiper = new Swiper(".mySwiper", {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 30,
        nested: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev",
        }
    });


    var cardSwiperSlider = document.querySelectorAll('.card-swiper-slider');
    cardSwiperSlider.forEach(function(el, index){
 
        var sliderIndexID = 'slider-single-id-' + index;
        el.setAttribute('id', sliderIndexID)    
        var sliderThis = el;
    
        // Init Slider 1: Primary
        var swiperSliderMain = document.querySelector('#' + sliderIndexID + ' .swiper-container-card');
        var swiperMain = new Swiper(swiperSliderMain, {
            loop: true,
            grabCursor: false,
            speed: 1200,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"><div class="progress">' + '</div></span>';
                },
            },
            lazy: {
                loadPrevNext: true,
            },
            simulateTouch: false
        });
   
        // GSAP Animation Progress Bar (Will trigger slider to slide)
        var tl = gsap.timeline({paused: true});
    
        // Retrigger Animation on Slide Change
        function singleSwiperSliderEnd() {
            swiperMain.slideNext();
            tl.restart();
        }
        
        tl.to(sliderThis.querySelectorAll('.progress'), {
            duration: 5,
            scaleX: 1,
            ease: "Power1.easeInOut",
            onComplete: singleSwiperSliderEnd
        });
    
        // Reset Progress Bar On Slide Change
        swiperMain.on("slideChange", function () {
            tl.restart();
        });
    
        // Pause Carousel/Progress Bar On Hover
        sliderThis.querySelector('.swiper-pagination').addEventListener('mouseenter', function(){
            tl.pause();
        });

        sliderThis.querySelector('.swiper-pagination').addEventListener('mouseleave', function(){
            tl.resume();
        });
        
        // Play/Pause Slider in viewport
        let triggerElement = sliderThis;
    
        ScrollTrigger.create({
            trigger: triggerElement,
            start: '0% 120%',
            end: '100% -20%',
            onEnter: () => tl.play(),
            onEnterBack: () => tl.play(),
            onLeave: () => tl.pause(),
            onLeaveBack: () => tl.pause(),
        });

    });
 
   
 }