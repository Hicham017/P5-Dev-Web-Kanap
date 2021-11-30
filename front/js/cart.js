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
    <article class="cart__item" data-id="${id}"data-color="${color}">
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


function takeInput() {
  let input = document.getElementsByClassName('itemQuantity');
  for (let i = 0; i < input.length; i++) {
  
    input[i].addEventListener('change', (e) => {

     
      let carte =  JSON.parse(
        localStorage.getItem('panier')); //panier recup depuis local storage

      let id = input[i].parentElement.parentElement.parentElement.parentElement.dataset.id; //recupère ce qu'il y a dans données
      let color = input[i].parentElement.parentElement.parentElement.parentElement.dataset.color;
      let quantity = input[i].value;

      carte[id].colors[color] = parseInt(quantity);  //on veut que quantity soit un nb entier 
      
      //[] permet de recup un element dans une liste 
      localStorage.setItem('panier', JSON.stringify(carte));    // met à j le local storage

      displayTotal();

    }  
    )}};

  takeInput();

//-------------------------------------------------------BOUTON SUPPRIMER------------------------------------------------------------------//

function btnDelete() {
  let buttons = document.getElementsByClassName('deleteItem');//recup tous les btn
  for (let i = 0; i < buttons.length; i++) {     
  
    buttons[i].addEventListener('click', (e) => {    

     
      let carte =  JSON.parse(
        localStorage.getItem('panier')); //panier recup depuis local storage

      let id = buttons[i].parentElement.parentElement.parentElement.parentElement.dataset.id; //recupère ce qu'il y a dans données
      let color = buttons[i].parentElement.parentElement.parentElement.parentElement.dataset.color;
      

      delete carte[id].colors[color];
      
      //[] permet de recup un element dans une liste 
      localStorage.setItem('panier', JSON.stringify(carte));    // met à j le local storage
      buttons[i].parentElement.parentElement.parentElement.parentElement.remove(),
      displayTotal();

    }  
    )}};

    btnDelete();



//-----------------------------------------PASSER LA COMMANDE-----------------------------------------------//

//recup tous les éléments du form 1 par 1 
//verif leur valeurs, renvoie true avec les regex, pour prenom, adresse ect ...
//getelebyid firstname.value
//city.value ect 

//recup regex sur intenet, regular expression 


function checkForm() {

  let takeFirstName = getElementById('firstName').value;
  let takeLastName = getElementById('lastName').value;
  let takeAddress = getElementById('address').value;
  let takeCity = getElementById('city').value;
  let takeEmail = getElementById('email').value;

}


//revoir les array et les i (sac), là je suis dans du js, là dans du HTML 

