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
        <a class="chance-item" href="#/">
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
export { templateReviews, templateLastChance };
