// "use strict";

function mainSlider() {
  let mySwiper = "";
  let myLastSwiper = "";
  let swiper = "";
  let breakpoint = window.matchMedia("(max-width: 767px)");
  console.log(breakpoint.matches);

  let breakpointChecker = function () {
    
    if (breakpoint.matches) {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      };
      if (myLastSwiper) {
        mySwiper.destroy(true, true);
      };
      if (swiper) {
        swiper.destroy(true, true);
      };

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

      document.querySelector(".chance-items").classList.remove("last-ch-flex");

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

      return;
    } else {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
      if (Boolean(myLastSwiper)) {
        myLastSwiper.destroy(true, true);
      }
      if (swiper) {
        swiper.destroy(true, true);
      };

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

    // swiper.update();
    // mySwiper.update();
    // myLastSwiper = "";
    // if (myLastSwiper) {
    //   myLastSwiper.update();
    // }
  };
  breakpointChecker();
  breakpoint.addEventListener("change", () => {
    breakpointChecker();
  });
}

mainSlider();
