let url = new URL(window.location.href); //je récupère le lien dans la barre d'adresse

let orderId = url.searchParams.get("id"); // requête GET avec les paramètres je récupère l'orderId dans l'url 

let confirmOrderId = document.getElementById('orderId');

confirmOrderId.innerHTML = orderId; // j'intègre l'orderId dans l'html


localStorage.clear();