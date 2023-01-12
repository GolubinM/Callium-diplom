//------Обработка слайдеров-----------------------------------------------------
function mainSlider() {
  let mySwiper = "";
  let myLastSwiper = "";
  let swiperReview = "";
  let breakpoint = window.matchMedia("(max-width: 767px)");

  let breakpointChecker = function () {
    if (breakpoint.matches) {
      destroySwiper(swiperReview);
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
      destroySwiper(myLastSwiper);
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
      destroySwiper(swiperReview);
      swiperReview = new Swiper(".swiper-review", {
        loop: true,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        spaceBetween: 200,
        pagination: {
          el: ".review-swiper-pagination",
          clickable: true,
        },

        scrollbar: {
          el: ".review-swiper-scrollbar",
        },
      });

      document.querySelector(".chance-items").classList.add("last-ch-flex");
    }
  };
  // Начальная инициализация слайдеров
  breakpointChecker();

  // Прослушка изменения ширины экрана через переменную breakpoint
  breakpoint.addEventListener("change", () => {
    breakpointChecker();
  });
}
// Удаление слайдеров
function destroySwiper(swiperTo) {
  if (swiperTo) {
    swiperTo.destroy(true, true);
  }
}
//------------------------------------------------------------------------
//Закрыает бургер-меню
let checkBurgerMenu = document.getElementById("check");
document.querySelectorAll(".menu__item").forEach((element) => {
  element.addEventListener("click", () => {
    checkBurgerMenu.checked = false;
  });
});
//------------------------------------------------------------------------
// загружаем данные JSON и запускаем слайдер
$("document").ready(function () {
  loadDesignFurnitures();
  loadReviews();
  loadLastChance();
  mainSlider();
});
// загружаем данные JSON для Design furniture--------------------------------
function loadDesignFurnitures() {
  $.getJSON("js/json/designFurnitures.json", function (data) {
    let html = "";
    for (var key in data) {
      html += `<div class="swiper-slide">`;
      html += `<div class="product product--slider">`;
      html += `<div class="product__info">`;
      html += `<h2>Дизайнерская мебель</h2>`;
      html += `<h3>${data[key]["name"]}</h3>`;
      html += `<p><span>${data[key]["oldPrice"]}</span>${data[key]["price"]}</p>`;
      html += `<button class="product__button" type="button">Купить</button>`;
      html += `</div>`;
      html += `<div class="product__image">`;
      html += `<img src=${data[key]["image"]} srcset="${data[key]["image2"]} 2x" width="532"
          height="751" alt="image ${data[key]}">`;
      html += `</div>`;
      html += `</div>`;
      html += `</div>`;
    }
    $(".swiper.main-screen__slider .swiper-wrapper").html(html);
  });
}
// загружаем данные JSON для reviews--------------------------------

function loadReviews() {
  $.getJSON("js/json/reviews.json", function (data) {
    let html = "";
    for (var key in data) {
      html += `<div class="review-item swiper-slide">`;
      html += `<img class="avatar-img" src="${data[key]["image"]}" alt="reviewer photo"></img>`;
      html += `<p class="reviewer-name">${data[key]["name"]}</p>`;
      html += `<p class="reviewer-status">${data[key]["status"]}</p>`;
      html += `<p class=${data[key]["review"]}></p>`;
      html += "</div>";
    }
    $(".reviews .swiper-wrapper").html(html);
  });
}
// загружаем данные JSON для Last Cance furniture--------------------------------

function loadLastChance() {
  $.getJSON("js/json/lastchance.json", function (data) {
    let html = "";
    for (var key in data) {
      html += `<div class="swiper-slide box-to-buy">`;
      html += `<a class="chance-item" href="#">`;
      html += `<p class="chance-item__name">${data[key]["name"]}</p>`;
      html += `<div class="prices">`;
      html += `<p class="new-item-price">${data[key]["cost"]}</p>`;
      html += `<p class="old-item-price">${data[key]["oldCost"]}</p>`;
      html += `</div>`;
      html += `<img class="chance-img" src=${data[key]["image"]} width="204" alt="img chance">`;
      html += "</a>";
      html += "</div>";
    }
    $(".chance-items").html(html);
  });
}
//------------------------------------------------------------------------
// Обработка hover для last-chance card
// по умолчанию кнопка КУПИТЬ активна для первой карточки last-chance
// если в течении 1500мс карточка не выбрана кнопка КУПИТЬ возвращается на первую карточку

let isShowBuyButtonSet = false;

// Добавляем к вновь созданному динамическому элементу класс
$("body").bind("DOMNodeInserted", function () {
  $(this).find("a.chance-item:first").addClass("showBuyButton");
  isShowBuyButtonSet = true;
});

// По наведению мыши удаляем класс с первой карточки,  добавляем к карточке на которую навели мышь
$(document).on("mouseover", "a.chance-item", function () {
  $("a.chance-item:first").removeClass("showBuyButton");
  $(this).addClass("showBuyButton");
  isShowBuyButtonSet = true;
});
$(document).on("mouseout", "a.chance-item", function () {
  $(this).removeClass("showBuyButton");
  isShowBuyButtonSet = false;
  // если в течении 1500мс карточка не выбрана кнопка КУПИТЬ возвращается на первую карточку
  setTimeout(() => {
    if (!isShowBuyButtonSet) $("a.chance-item:first").addClass("showBuyButton");
  }, 1500);
});
//------------------------------------------------------------------------
