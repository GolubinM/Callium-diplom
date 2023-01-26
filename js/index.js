import { mainSlider } from "./modules/swipers.js";
import { templateReviews, templateLastChance } from "./modules/templates.js";
import { buyButtonsShow, showBuyButton, hideBuyButton } from "./modules/pointCard.js";
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
// массив со всеми карточками LastChance в переменную LastChanceArray для возможности дальнейшего отбора
let LastChanceArray = loadItems("js/json/lastchance.json", ".chance-items", templateLastChance);
// Вставка HTML согласно шаблону 'template' с данными из json файла параметр 'sourceJSON' после HTML
//  элемента с селектором 'insSelector'
// Данные в переменную
function loadItems(sourceJSON, insSelector, template) {
  let dataArray = [];
  fetch(sourceJSON)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let key in data) {
        dataArray.push(data[key]);
      }
      htmlCardsBulder(data, insSelector, template);
    });
  return dataArray;
}

// процедура формирования и замены html-----------------------------------
function htmlCardsBulder(data, insSelector, template) {
  let html = "";
  for (let key in data) {
    html += template(key, data);
  }
  document.querySelector(insSelector).innerHTML = html;
}

//-обработка отбора товаров по категориям, секция Last Chance-------------
document.querySelectorAll(".last_chance_a").forEach((element) => {
  element.addEventListener("click", (e) => {
    let category = e.target.dataset.filter; // получение категории отбора
    let selectedItems = filter(category, LastChanceArray); //вызов процедуры фильтрации
    htmlCardsBulder(selectedItems, ".chance-items", templateLastChance); //вызов процедуры формирования html
  });
});
//------------------------------------------------------------------------
// фильтрация карточек по категории товара (HTML атрибут data-filter=".."")
function filter(category, items) {
  const selectedItems =
    category === "all"
      ? items
      : items.filter((item) => {
          return item.category === category;
        });
  return selectedItems; //возвращает массив отобранных элементов(карточек товара)
}
//-----наведение мыши на карточку last chance, отоброжение кнопки купить--------------------------------------------
// Обработка наведения мыши для last-chance cards
// по умолчанию кнопка КУПИТЬ активна для первой карточки last-chance

const observedLastChance = document.querySelector(".chance-items");
const observerLastChance = new MutationObserver(function (mutations) {
  mainSlider(); // запускаем слайдеры после загргузки данных JSON
  // Добавляем к вновь созданному первому элементу класс

  // const firstCard = mutations[0].addedNodes[0];
  // console.log(firstCard);
  // showBuyButton(firstCard);
  
  buyButtonsShow();

  // const firstCardUp = mutations[0].addedNodes[0].firstElementChild
  // const firstCardBtm = mutations[0].addedNodes[0].lastElementChild

  // console.log(firstCardUp);
  // console.log(firstCardBtm);
  // Отобразили кнопку КУПИТЬ при загрузке первой карточки

  // firstCardUp.classList.add("show");
  // firstCardBtm.classList.add("show");
  // firstCardUp.classList.remove("hide");
  // firstCardBtm.classList.remove("hide");

  // console.log(document.querySelectorAll(".chance-item.showBuyButton"));
});

observerLastChance.observe(observedLastChance, { childList: true });

// ==================УБРАТЬ!!!!!!!!!!
function changeBuyButton() {
  if (window.innerWidth <= 767) {
    showBuyButtonAll();
  } else {
    showBuyButtonOneCard();
  }
}

if (window.innerWidth > 767) {
  let currentCard = null;
  observedLastChance.onmouseover = function (event) {
    if (currentCard) return; // Исключает обработку при движении мыши внутри текущего элемента
    let targetCard = event.target.closest(".box-to-buy"); //Выбирает карточку под указателем мыши с классом `box-to-buy`
    if (!targetCard) return; // Исключает обработку если мышь не над карточкой (targetCard не выбрана)
    currentCard = targetCard; // Определяет выбранную карточку для обработки
    const oldCard = document.querySelector(".show").closest(".box-to-buy");
    hideBuyButton(oldCard); // удаляем класс с предыдущей карточки
    showBuyButton(currentCard); // определяем класс для текущей карточки
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
}

//----Скрытие/отображение разделов доставка, гарантия, оплата, контакты-----------------------------------------
let openedSelector = false;
let openedElement = null;
let currentY;
const scrollControl = function () {
  // При скролле на 400 точек выше открытого элемента(Доставка, Гарантии, Контакты, Оплата) - элементы скрываются.
  if (currentY - scrollY > 400) {
    closeElement();
    removeEventListener("scroll", scrollControl);
  }
};

document.querySelector(`.footer_menu`).addEventListener("click", (e) => {
  let targetId = e.target.id;
  let toogledSelector;
  if (targetId === "deliveryBtn") {
    toogledSelector = `.product-delivery`;
  } else if (targetId === "warrantyBtn") {
    toogledSelector = `.product-warranty`;
  } else if (targetId === "payBtn") {
    // toogledSelector = `.product-warranty`;
  } else if (targetId === "contactsBtn") {
    // toogledSelector = `.product-warranty`;
  }
  // Вариант 1. Не один элемент не открыт -> (открыть элемент, обновить переменную высоты), повесить обработчик scroll
  if (!openedSelector) {
    openElement(toogledSelector);
    addEventListener("scroll", scrollControl);
  }
  // Вариант 2. Открыт не тот элемент что выбран -> закрыть открытый элемент, (открыть новый, обновить переменную высоты)
  else if (openedSelector !== toogledSelector) {
    closeElement();
    openElement(toogledSelector);
  }
  // Вариант 3. Открыт то же элемент что выбран -> (закрыть открытый элемент, обновить переменную высоты), удалить обработчик scroll
  else if (openedSelector === toogledSelector) {
    closeElement(toogledSelector);
    removeEventListener("scroll", scrollControl);
  }
});

function openElement(selector) {
  openedSelector = selector;
  openedElement = document.querySelector(selector);
  openedElement.classList.remove("hide");
  openedElement.scrollIntoView({ block: "start", behavior: "smooth" });
  currentY = scrollY;
}
function closeElement() {
  openedElement.classList.add("hide");
  openedSelector = false;
  currentY = 0;
}
//------------------------------------------------------------------------
// Вставака количества позиций товаров в корзине (cart.length)
let cart = [];
cart = [{ 310003: 3 }, { 310003: 3 }, { 310003: 3 }, { 310003: 3 }];
// console.log(cart);
let cartCuontity = `<div class="itemsInCart">${cart.length}</div>`;
if (cart.length) {
  document.querySelector(".user-nav__item--cart a").insertAdjacentHTML("afterbegin", cartCuontity);
}
//------------------------------------------------------------------------
// Добавление товаров в корзину (cart.length)
// поиск кнопки купить
// console.log(document.querySelectorAll(".chance-item.showBuyButton"));
