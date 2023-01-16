import { mainSlider } from "./modules/swipers.js";
import { templateReviews, templateLastChance } from "./modules/templates.js";
//------------------------------------------------------------------------
//Закрыает бургер-меню
let checkBurgerMenu = document.getElementById("check");
document.querySelectorAll(".menu__item").forEach((element) => {
  element.addEventListener("click", () => {
    checkBurgerMenu.checked = false;
  });
});
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
