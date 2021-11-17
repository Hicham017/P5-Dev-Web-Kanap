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

let articles = JSON.parse(localStorage.getItem('article'));
console.log(articles);


for (let article of articles) {
    section.innerHTML += 
    `
    <article class="cart__item" data-id="{product-ID}">
<div class="cart__item__img">
  <img src="${article.imageItem}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${article.nameItem}</h2>
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
</article>
    `
}

addCart.addEventListener('click', e => {
  e.preventDefault()
  let quantity = document.getElementById('quantity').value
  let color = document.getElementById('colors').value
  let panier = JSON.parse(localStorage.getItem('panier'))

  if(!panier){
    panier = {}
  }


if(!panier[product._id]){
  let colors = {}
  colors[color] = quantity

    panier[product._id] = {
      name: product.name,
      price: product.price,
      colors: colors
    }
}else {
  if(panier[product_id].colors[color]) {
    panier[product_id].colors[color] += quantity
  } else {
    panier[product_id].colors[color] = quantity 
  }
}

localStorage.setItem('panier', JSON.stringify(panier))
});

