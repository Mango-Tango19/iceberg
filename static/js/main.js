const slides = document.querySelectorAll('.slide'),
sliderWrapper = document.querySelector('.slider-wrapper'),
 sliderInner = document.querySelector('.slider-inner'),
 slideWidth = window.getComputedStyle(sliderWrapper).width,
 scaleWidth = window.getComputedStyle(document.querySelector('.solid')).width,
 indicator = document.querySelector('.scale-indicator'),
 crystall =  indicator.querySelector('img'),
 scale = document.querySelector('.solid'),
 page3width = window.getComputedStyle(document.querySelector('.page-3')).width;
 let slideOffset = 0,
 indicatorOffset = 0;

document.addEventListener('keydown', slideActive);

crystall.onmousedown = function(e) {
    e.preventDefault();
    let shiftX = e.clientX - crystall.getBoundingClientRect().left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
        let leftEdge =  scale.getBoundingClientRect().left;
        let newLeft = e.clientX - shiftX -  leftEdge;
        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge = scale.offsetWidth - crystall.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        indicator.style.left = newLeft + 'px';
      }

      function onMouseUp(e) {
          debugger
          slideNumber = 0;
          let shiftX = e.clientX - crystall.getBoundingClientRect().left;
          let leftEdge = scale.getBoundingClientRect().left;
          let newLeft = e.clientX - shiftX - leftEdge;
          if (newLeft <= scale.offsetWidth / 4) {
              newLeft = 0;
              slideNumber = 1;
              showSlide(slideNumber);
          }  else if (newLeft >= ((scale.offsetWidth / 4) * 3)) {
            newLeft = scale.offsetWidth - crystall.offsetWidth;
            slideNumber = 3;
            showSlide(slideNumber);
          }
          else if ((scale.offsetWidth / 4) < newLeft || newLeft < ((scale.offsetWidth / 4) * 3)) {
              newLeft = scale.offsetWidth / 2;
              slideNumber = 2;
              showSlide( slideNumber);
          }


              indicator.style.left = newLeft + 'px';
              document.removeEventListener('mouseup', onMouseUp);
              document.removeEventListener('mousemove', onMouseMove);
          

        }

       function showSlide(slideNumber) {
           switch (slideNumber) {
               case 1:
                   sliderInner.style.transform = 'translateX(0px)';
                   break
               case 2:
                   slideOffset = +slideWidth.slice(0, slideWidth.length - 2);
                   sliderInner.style.transform = `translateX(-${slideOffset}px)`;
                   break;
               case 3:
                   slideOffset = +slideWidth.slice(0, slideWidth.length - 2) * 2;
                   sliderInner.style.transform = `translateX(-${slideOffset}px)`;


           }
       };
};

crystall.ondragstart = function() {
    return false;
  };



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
        indicatorOffset += (+scaleWidth.slice(0, scaleWidth.length-2))/2;
    }
    sliderInner.style.transform = `translateX(-${slideOffset}px)`;
    indicator.style.transform = `translateX(${indicatorOffset}px)`;//NaN
    
}

function slidePrev() {
    if (slideOffset === 0) {
        slideOffset = +slideWidth.slice(0, slideWidth.length-2) * (slides.length - 1);
        indicatorOffset = +scaleWidth.slice(0, scaleWidth.length-2);
    } else {
        slideOffset -= +slideWidth.slice(0, slideWidth.length-2);
        indicatorOffset -= (+scaleWidth.slice(0, scaleWidth.length-2))/2;
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