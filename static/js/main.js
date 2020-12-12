// const paralax = document.querySelector('.crystal-1');

// window.addEventListener('scroll', function() {
//     let offset = window.pageYOffset;
//     paralax.style. = offset * 1.1 + 'px';
// });

const controller = new ScrollMagic.Controller();

let scene1 = new ScrollMagic.Scene({triggerElement: "#trigger-1", duration: 60})
    .setPin("#pin-1")
    .addTo(controller);


