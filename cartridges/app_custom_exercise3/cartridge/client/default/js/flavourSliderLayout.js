var swiper = new Swiper(".mySwiper", {
    autoplay: true,
    allowTouchMove: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 500,
    pagination: {
      el: ".flavour-slide-colors-holder",
      clickable: true,
      //   renderBullet: function (index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + "</span>";
      //   },
    },
  });
  