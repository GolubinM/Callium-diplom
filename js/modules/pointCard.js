function buyButtonsShow() {
  //------Обработка слайдеров-----------------------------------------------------
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

export { buyButtonsShow, showBuyButton, hideBuyButton };
