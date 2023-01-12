//--template for Design furniture. <Section 1>-------------------------------
let out = `<div class="swiper-slide">`;
out += `<div class="product product--slider">`;
out += `<div class="product__info">`;
out += `<h2>Дизайнерская мебель</h2>`;
out += `<h3>${data[key]["name"]}</h3>`;
out += `<p><span>${data[key]["oldPrice"]}</span>${data[key]["price"]}</p>`;
out += `<button class="product__button" type="button">Купить</button>`;
out += `</div>`;
out += `<div class="product__image">`;
out += `<img src=${data[key]["image"]} srcset="${data[key]["image2"]} 2x" width="532"
          height="751" alt="image ${data[key]}">`;
out += `</div>`;
out += `</div>`;
out += `</div>`;
export { out as templateDesign };
//------------------------------------------------------------------------
//--template for Last chance furniture. <Section 3>-----------------------
let html = `<div class="swiper-slide box-to-buy">`;
html += `<a class="chance-item" href="#">`;
html += `<p class="chance-item__name">${data[key]["name"]}</p>`;
html += `<div class="prices">`;
html += `<p class="new-item-price">${data[key]["cost"]}</p>`;
html += `<p class="old-item-price">${data[key]["oldCost"]}</p>`;
html += `</div>`;
html += `<img class="chance-img" src=${data[key]["image"]} width="204" alt="img chance">`;
html += "</a>";
html += "</div>";
export { html as templateLastChance };