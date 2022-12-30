const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'horisontal',
    loop: true,
    autoHeight: true,
    slidesPerGroup:1,
    spaceBetween:200,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });