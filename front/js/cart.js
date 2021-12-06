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

let section = document.getElementById("cart__items");

let articles = JSON.parse(localStorage.getItem("panier"));
console.log(articles);

for (let id in articles) {
  for (let color in articles[id].colors) {
    section.innerHTML += `
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
    `;
  }
}

function displayTotal() {
  let priceTotal = 0;
  let quantityTotal = 0;
  let articles = JSON.parse(localStorage.getItem("panier"));

  for (let id in articles) {
    for (let color in articles[id].colors) {
      quantityTotal += articles[id].colors[color];
      priceTotal += articles[id].colors[color] * articles[id].price;
    }
  }

  let totalQ = document.getElementById("totalQuantity");
  let totalP = document.getElementById("totalPrice");

  totalQ.innerHTML = quantityTotal;
  totalP.innerHTML = priceTotal;
}

displayTotal();

function takeInput() {
  let input = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", (e) => {
      let carte = JSON.parse(localStorage.getItem("panier")); //panier recup depuis local storage

      let id =
        input[i].parentElement.parentElement.parentElement.parentElement.dataset
          .id; //recupère ce qu'il y a dans données
      let color =
        input[i].parentElement.parentElement.parentElement.parentElement.dataset
          .color;
      let quantity = input[i].value;

      carte[id].colors[color] = parseInt(quantity); //on veut que quantity soit un nb entier

      //[] permet de recup un element dans une liste
      localStorage.setItem("panier", JSON.stringify(carte)); // met à j le local storage

      displayTotal();
    });
  }
}

takeInput();

//-------------------------------------------------------BOUTON SUPPRIMER------------------------------------------------------------------//

function btnDelete() {
  let buttons = document.getElementsByClassName("deleteItem"); //recup tous les btn
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
      let carte = JSON.parse(localStorage.getItem("panier")); //panier recup depuis local storage

      let id =
        buttons[i].parentElement.parentElement.parentElement.parentElement
          .dataset.id; //recupère ce qu'il y a dans données
      let color =
        buttons[i].parentElement.parentElement.parentElement.parentElement
          .dataset.color;

      delete carte[id].colors[color];

      //[] permet de recup un element dans une liste
      localStorage.setItem("panier", JSON.stringify(carte)); // met à j le local storage
      buttons[
        i
      ].parentElement.parentElement.parentElement.parentElement.remove(),
        displayTotal();
    });
  }
}

btnDelete();

let order = document.getElementById('order');

order.addEventListener('click', (e) => {
  e.preventDefault();
  if (checkForm()) {   //va renvoyer true - false


    let FirstName = document.getElementById("firstName").value;
  
    let LastName = document.getElementById("lastName").value;
    
    let Address = document.getElementById("address").value;
  
    let City = document.getElementById("city").value;
   
    let Email = document.getElementById("email").value;

    let contact = {firstName: FirstName, lastName: LastName, address: Address, city: City, email: Email}

    let products = []
    let articles = JSON.parse(localStorage.getItem("panier"));
    
    for (let id in articles) {
      products.push(id)
    }

    fetch("http://localhost:3000/api/products/order", {
      method:"POST", 
      body:JSON.stringify({
        contact, products
      }),
      headers:{
        "Content-Type": "application/JSON"
      }

    }).then(response => response.json())
    .then(order => { 
      let orderId = order.orderId;
      window.location.href = 'confirmation.html?id=' + orderId;

    });

  }
});



//------------------------------------------------------   FORMULAIRES   ----------------------------------------------------------------//

//recup tous les éléments du form 1 par 1
//verif leur valeurs, renvoie true avec les regex, pour prenom, adresse ect ...
//getelebyid firstname.value
//city.value ect

//recup regex sur intenet, regular expression

function checkForm() {
  // récupération des ID
  // création des regex et des msg d'erreur

  let takeFirstName = document.getElementById("firstName");
  let regexName = /^[a-z ,.'-]+$/i;
  let errorFirstName = document.getElementById("firstNameErrorMsg"); //msg d'erreur

  let takeLastName = document.getElementById("lastName");
  let errorLastName = document.getElementById("lastNameErrorMsg");

  let takeAddress = document.getElementById("address");
  let regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
  let errorAddress = document.getElementById("addressErrorMsg");

  let takeCity = document.getElementById("city");
  let regexCity =
    /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  let errorCity = document.getElementById("cityErrorMsg");

  let takeEmail = document.getElementById("email");
  let regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let errorEmail = document.getElementById("emailErrorMsg");

  let check = true;

  // évènements en input afin d'indiquer un message d'erreur si un mauvais caractère est utilisé

    if (regexName.test(takeFirstName.value) == false) {
      errorFirstName.innerHTML = "Prénom est incorrect";
      check = false;
    } else {
      errorFirstName.innerHTML = "";
    }

 
    if (regexName.test(takeLastName.value) == false) {
      errorLastName.innerHTML = "Nom est incorrect";
      check = false;
    } else {
      errorLastName.innerHTML = "";
    };

 
    if (regexAddress.test(takeAddress.value) == false) {
      errorAddress.innerHTML = "Addresse est incorrect";
      check = false;
    } else {
      errorAddress.innerHTML = "";
    };

 
    if (regexCity.test(takeCity.value) == false) {
      errorCity.innerHTML = "Ville incorrect";
      check = false;
    } else {
      errorCity.innerHTML = "";
    }


    if (regexEmail.test(takeEmail.value) == false) {
      errorEmail.innerHTML = "Email incorrect";
      check = false;
    } else {
      errorEmail.innerHTML = "";
    }

    return check;
  }
