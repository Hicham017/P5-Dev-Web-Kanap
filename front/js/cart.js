/* <article class="cart__item" data-id="{product-ID}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>Nom du produit</h2>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> -->*/

let section = document.getElementById('cart__items');

let articles = JSON.parse(localStorage.getItem('panier'));
console.log(articles);



for (let id in articles) {
  for (let color in articles[id].colors) {

    section.innerHTML += 
    `
    <article class="cart__item" data-id="{product-ID}">
<div class="cart__item__img">
  <img src="${articles[id].imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${articles[id].name} ${color}</h2>
    <p>${articles[id].price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${articles[id].colors[color]}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
    `
}}

function displayTotal() {
  let priceTotal = 0; 
  let quantityTotal = 0; 
  let articles = JSON.parse(localStorage.getItem('panier'));

  for (let id in articles) {
    for (let color in articles[id].colors) {
        quantityTotal += articles[id].colors[color];
        priceTotal += articles[id].colors[color] * articles[id].price;
    }
}

let totalQ = document.getElementById('totalQuantity'); 
let totalP = document.getElementById('totalPrice');


totalQ.innerHTML = quantityTotal;
totalP.innerHTML = priceTotal;

};

displayTotal();



