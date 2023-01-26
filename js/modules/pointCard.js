function buyButtonsShow() {
  const lastChanceBlock = document.querySelector(".chance-items");
  //------Обработка наведения мыши на карточки LastChance-----------------------------------------------
  let breakpoint = window.matchMedia("(max-width: 767px)");
  function breakpointChecker() {
    if (breakpoint.matches) {
      //   Выполняется если ширина окна <= 767px
      showBuyButtonAll();
    } else {
      //   Выполняется если ширина окна > 767px
      hideBuyButtonAll();
      const firstCard = document.querySelector(".box-to-buy");
      showBuyButton(firstCard);
      lookBuyBtn768();
    }
  }
  breakpointChecker();
  breakpoint.addEventListener("change", () => {
    breakpointChecker();
  });

  function showBuyButtonAll() {
    const lastChanceCards = document.querySelectorAll(".box-to-buy");
    lastChanceCards.forEach((card) => showBuyButton(card));
  }
  function hideBuyButtonAll() {
    const lastChanceCards = document.querySelectorAll(".box-to-buy");
    lastChanceCards.forEach((card) => hideBuyButton(card));
  }
  function lookBuyBtn768() {
    let currentCard = null;
    lastChanceBlock.onmouseover = function (event) {
      if (currentCard) return; // Исключает обработку при движении мыши внутри текущего элемента
      let targetCard = event.target.closest(".box-to-buy"); //Выбирает карточку под указателем мыши с классом `box-to-buy`
      if (!targetCard) return; // Исключает обработку если мышь не над карточкой (targetCard не выбрана)
      currentCard = targetCard; // Определяет выбранную карточку для обработки
      const oldCard = document.querySelector(".show").closest(".box-to-buy");
      hideBuyButton(oldCard); // удаляем класс с предыдущей карточки
      showBuyButton(currentCard); // определяем класс для текущей карточки
    };
    lastChanceBlock.onmouseout = function (event) {
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
  function showBuyButton(card) {
    card.firstElementChild.classList.add("show");
    card.firstElementChild.classList.remove("hide");
    card.lastElementChild.classList.add("show");
    card.lastElementChild.classList.remove("hide");
  }

  function hideBuyButton(card) {
    card.firstElementChild.classList.add("hide");
    card.firstElementChild.classList.remove("show");
    card.lastElementChild.classList.add("hide");
    card.lastElementChild.classList.remove("show");
  }
}

export { buyButtonsShow };
