function mainSlider() {
  let mySwiper = "";
  let myLastSwiper = "";
  let swiper = "";
  let breakpoint = window.matchMedia("(max-width: 767px)");

  let breakpointChecker = function () {
    if (breakpoint.matches) {
      destroySwiper(mySwiper);
      mySwiper = new Swiper(".main-screen__slider", {
        spaceBetween: 10,
        pagination: {
          el: ".main-screen__slider-pagination",
          type: "fraction",
        },

        scrollbar: {
          el: ".main-screen__slider-scrollbar",
        },
      });

      const chanceItms = document.querySelector(".chance-items").classList;
      destroySwiper(myLastSwiper);
      myLastSwiper = new Swiper(".last_chance-swiper", {
        spaceBetween: 50,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        centeredSlides: true,

        pagination: {
          el: ".last__slider-pagination",
          type: "fraction",
        },

        scrollbar: {
          el: ".last__slider-scrollbar",
        },
      });
    } else {
      destroySwiper(mySwiper);
      mySwiper = new Swiper(".main-screen__slider", {
        pagination: {
          el: ".main-screen__slider-pagination",
          type: "bullets",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
          },
        },
      });
      destroySwiper(swiper);
      swiper = new Swiper(".swiper-review", {
        loop: true,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        spaceBetween: 200,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });

      document.querySelector(".chance-items").classList.add("last-ch-flex");
    }
  };
  breakpointChecker();
  breakpoint.addEventListener("change", () => {
    breakpointChecker();
  });
}
function destroySwiper(swiper) {
  if (swiper) {
    swiper.destroy(true, true);
  }
}

mainSlider();
