//--------------------------------------------
//              Page index
//--------------------------------------------


fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then(function (datas){

  let section = document.getElementById('items');

    console.log(datas);
    datas.forEach(product => {


        section.innerHTML += `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a> 
        `

    });

});





