//--------------------------------------------
//              Page index
//--------------------------------------------


fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then(function (datas){
    datas.forEach(product => {
        let items =document.getElementById('items');
            a = document.createElement('a');
            article = document.createElement('article');
            article.classList.add("productCard");
            img = document.createElement('img');
            img.classList.add("productImage");
            h3 = document.createElement('h3');
            h3.classList.add('productName');
            p = document.createElement('p');
            p.classList.add('productDescritpion');

        items.appendChild(a);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
        
    });

});