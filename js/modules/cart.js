export let cart = {
  contains: [],
  contains_Sum: [],
  //   cartCuontity: "",
  add: function add(item) {
    this.contains.push(item);
    this.contains_Sum = this.contains.reduce((totally, item1) => {
      totally[item1] = (totally[item1] || 0) + 1;
      return totally;
    }, {});
    // Если корзина пуста - добавляем <div class="itemsInCart">, если раздел есть меняем текст в корзине 
    if (document.querySelector(".itemsInCart")) {
      document.querySelector(".itemsInCart").textContent = this.contains.length;
    } else {
      document
        .querySelector(".user-nav__item--cart a")
        .insertAdjacentHTML("afterbegin", `<div class="itemsInCart">${this.contains.length}</div>`);
    }
  },
};
