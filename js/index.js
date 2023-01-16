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
        loop: false,
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
// Шаблон для reviews блоков
const templateReviews = (key, data) => {
  return `<div class="swiper-slide review-item">
      <img class="avatar-img" src="${data[key]["image"]}" width="80" height="80" alt="reviewer photo">
      <p class="reviewer-name">${data[key]["name"]}</p>
      <p class="reviewer-status">${data[key]["status"]}</p>
      <p class=="review">${data[key]["review"]}</p>
      </div>`;
};

// Шаблон для LastChance блоков
const templateLastChance = (key, data) => {
  return `<div class="swiper-slide box-to-buy">
      <a class="chance-item" href="#">
      <p class="chance-item__name">${data[key]["name"]}</p>
      <div class="prices">
      <p class="new-item-price">${data[key]["cost"]}</p>
      <p class="old-item-price">${data[key]["oldCost"]}</p>
      </div>
      <img class="chance-img" src=${data[key]["image"]} width="204" height="300" alt="img chance">
      </a>
      </div>`;
};

//------------------------------------------------------------------------
// загружаем данные JSON
loadItems("js/json/reviews.json", ".reviews .swiper-wrapper", templateReviews);
loadItems("js/json/lastchance.json", ".chance-items", templateLastChance);
// Вставка HTML согласно шаблону 'template' с данными из json файла параметр 'sourceJSON' после HTML
//  элемента с селектором 'insSelector'
function loadItems(sourceJSON, insSelector, template) {
  fetch(sourceJSON)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      for (var key in data) {
        html += template(key, data);
      }
      document.querySelector(insSelector).insertAdjacentHTML("afterbegin", html);
    });
}
//------------------------------------------------------------------------
// Обработка наведения мыши для last-chance cards
// по умолчанию кнопка КУПИТЬ активна для первой карточки last-chance
const observedLastChance = document.querySelector(".chance-items");
const observerLastChance = new MutationObserver(function (mutations) {
  mainSlider(); // запускаем слайдеры после загргузки данных JSON
  // Добавляем к вновь созданному первому элементу класс
  mutations[0].addedNodes[0].firstElementChild.classList.add("showBuyButton");
});
observerLastChance.observe(observedLastChance, { childList: true });

let currentCard = null;
observedLastChance.onmouseover = function (event) {
  if (currentCard) return; // Исключает обработку при движении мыши внутри текущего элемента
  let targetCard = event.target.closest(".chance-item"); //Выбирает карточку под указателем мыши с классом `chance-item`
  if (!targetCard) return; // Исключает обработку если мышь не над карточкой (targetCard не выбрана)
  currentCard = targetCard; // Определяет выбранную карточку для обработки
  document.querySelector(".showBuyButton").classList.remove("showBuyButton"); // удаляем класс с предыдущей карточки
  currentCard.classList.add("showBuyButton"); // определяем класс для текущей карточки
};
observedLastChance.onmouseout = function (event) {
  if (!currentCard) return; // Исключает обработку при движении мыши внутри текущего элемента
  let relatedTarget = event.relatedTarget; // Исключаем обработку дочерних элементов карточки
  while (relatedTarget) {
    // Исключаем обработку дочерних элементов карточки
    if (relatedTarget == currentCard) return; // Исключаем обработку дочерних элементов карточки
    relatedTarget = relatedTarget.parentNode; // Исключаем обработку дочерних элементов карточки
  }
  currentCard = null; //Обрабатываем событие ухода мыши с карточки
};
//------------------------------------------------------------------------