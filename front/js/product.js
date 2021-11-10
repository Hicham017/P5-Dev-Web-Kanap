const str = window.location.href;


let productId = str;
let url = new URL(str);
let id = url.searchParams.get("id");


//intégrer le produit dans le HTML via JS
fetch("http://localhost:3000/api/products/" + id)
.then((res) => res.json())
.then(product => {

      
    let color = document.getElementById("colors");
    let img = document.createElement("img");
    document.querySelector(".item__img").appendChild(img);
    img.src = product.imageUrl;
    img.alt= product.altTxt;
    document.querySelector("#colors").insertAdjacentHTML("beforeend", product.colors.map(color => ` <option id= "valueColor" value="${color}">${color}</option>`));
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
});


