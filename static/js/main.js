const slides = document.querySelectorAll('.slide'),
sliderWrapper = document.querySelector('.slider-wrapper'),
 sliderInner = document.querySelector('.slider-inner'),
 slideWidth = window.getComputedStyle(sliderWrapper).width,
 scaleWidth = window.getComputedStyle(document.querySelector('.solid')).width,
 indicator = document.querySelector('.scale-indicator');
 let slideOffset = 0,
 indicatorOffset = 0;
document.addEventListener('keydown', slideActive);

// sliderInner.addEventListener('swiped-right', function() {
//     console.log('Hi');
//     slideNext();
// });

// sliderInner.addEventListener('swiped-left', function() {
//     slidePrev();
// });


function slideActive(e) {
    if (e.code === 'ArrowRight') {
        slideNext();
    }
    if (e.code === 'ArrowLeft') { 
        slidePrev();
    }
}

function slideNext() {
    if (slideOffset === slideWidth.slice(0, slideWidth.length-2) * (slides.length - 1)) {
        slideOffset = 0;
        indicatorOffset = 0;


    } else {
        slideOffset +=  +slideWidth.slice(0, slideWidth.length-2);
        indicatorOffset += (+scaleWidth.slice(0, slideWidth.length-2))/2;
    }
    sliderInner.style.transform = `translateX(-${slideOffset}px)`;
    debugger
    indicator.style.transform = `translateX(${indicatorOffset}px)`;//NaN
    
}

function slidePrev() {
    if (slideOffset === 0) {
        slideOffset = +slideWidth.slice(0, slideWidth.length-2) * (slides.length - 1);
        indicatorOffset = +scaleWidth.slice(0, slideWidth.length-2);
        console.log(indicatorOffset);
    } else {
        slideOffset -= +slideWidth.slice(0, slideWidth.length-2);
        indicatorOffset -= (+scaleWidth.slice(0, slideWidth.length-2))/2;
    }
    sliderInner.style.transform = `translateX(-${slideOffset}px)`;
    indicator.style.transform = `translateX(${indicatorOffset}px)`;
    
}







function parallax(selector, distance, speed) {
    const item = document.querySelector(selector);
    item.style.transform = `translateY(${distance * speed}px)`
}

window.addEventListener('scroll', function() {
    parallax('.moving-wrapper-page-2', window.scrollY, 0.2);
})