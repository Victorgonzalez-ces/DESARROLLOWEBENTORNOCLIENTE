let url = "https://dummyjson.com/products";
let contadorCarrito = 0;
const lista = document.querySelector("#lista-productos");
const precio = document.querySelector("#precio");
const categoria = document.querySelector("#categoria");
const marca = document.querySelector("#marca");
const btnfiltros = document.querySelector("#btnfiltros");
const cuentaCarrito = document.querySelector("#cuentaCarrito");
const btnCarrito = document.querySelector("#btnCarrito");


async function resolverPromesa(url) {
    let datos = await fetch(url);
    let datosJson = await datos.json();
    return datosJson;
}


function mostrarProductos(categoria , marca , precio){
    lista.innerHTML = "";
    resolverPromesa(url).then((res)=>{
        res.products.forEach(element => {
            imagenesProducto = [];
            element.images.forEach(imagen =>{
                imagenesProducto.push(imagen);
            });

            const cumplePrecio =
                isNaN(precio) || element.price <= precio;

            const cumpleCategoria =
                !categoria || element.category == categoria;

            const cumpleMarca =
                !marca || element.brand.toLowerCase().includes(marca);
            
            if (cumplePrecio && cumpleCategoria && cumpleMarca){
                lista.innerHTML += `<div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="${imagenesProducto[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.description}</p>
                        <p class="card-text">Categoria: ${element.category}</p>
                        <p class="card-text">${element.price}€</p>
                        <a href="#" class="btn btn-primary btn-comprar">comprar</a>
                    </div>
                </div>
                </div>`
            }
        });
    }).catch((err)=>{
        console.log(err);
            
    });
}

function agregarAlCarrito(){
    contadorCarrito++;
    cuentaCarrito.textContent = contadorCarrito;
}

btnfiltros.addEventListener("click", () => {
    const valorPrecio = parseFloat(precio.value);
    const valorCategoria = categoria.value;
    const valorMarca = marca.value.toLowerCase();
    mostrarProductos(valorCategoria, valorMarca, valorPrecio);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    agregarAlCarrito();
  }
});

btnCarrito.addEventListener("click", ()=> {

    Swal.fire({
        title: "🛒 Carrito",
        text: `¿Quieres finalizar la compra? Tienes ${contadorCarrito} productos en el carrito`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#6c757d"
    }).then((result)=>{

        if (result.isConfirmed){
            Swal.fire("✅ Compra realizada", "", "success");
            cuentaCarrito.textContent = 0;
        }

    })
})