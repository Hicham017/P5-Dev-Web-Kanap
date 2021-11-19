const str = window.location.href;

let productId = str;
let url = new URL(str);
let id = url.searchParams.get("id");

//intégrer le produit dans le HTML via JS
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then((product) => {
    //product...... dans le tab des types de données dans les spécifications
    let color = document.getElementById("colors");
    let img = document.createElement("img");
    document.querySelector(".item__img").appendChild(img);
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    document.querySelector("#colors").insertAdjacentHTML(
      "beforeend",
      product.colors.map(
        (color) =>
          ` <option id= "valueColor" value="${color}">${color}</option>`
      )
    );
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", (e) => {
      e.preventDefault();
      let quantity = parseInt(document.getElementById("quantity").value);
      let color = document.getElementById("colors").value;
      let panier = JSON.parse(localStorage.getItem("panier"));
  

      if (!panier) {
        panier = {};
      }

      if (!panier[product._id]) {
        let colors = {};
        colors[color] = quantity;

        panier[product._id] = {
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          colors: colors,
        };
      } else {
        if (panier[product._id].colors[color]) {
          panier[product._id].colors[color] += quantity;
        } else {
          panier[product._id].colors[color] = quantity;
        }
      }

      localStorage.setItem('panier', JSON.stringify(panier));
    });

  });

