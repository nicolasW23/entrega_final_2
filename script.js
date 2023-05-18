    let carritoDOM= document.getElementById("carrito")
    let carrito= JSON.parse(localStorage.getItem("carrito")) || []
    let obj
    //por defecto fetch hace peticiones tipo GET
    fetch("datos.json")

    //json placeholder-response
        .then((respuesta) => respuesta.json())
        .then((bandas) =>{
            renderizarTarjetas(bandas)
            let buscar= document.getElementById("buscar")


            buscar.addEventListener("click", () => 
            filtrar(bandas))
            console.log(bandas)
            let buscador= document.getElementById("buscador")
                
            buscador.addEventListener("keypress", (e) => {
                console.log(buscador)
                if(e.key == "18"){
                    filtrar(bandas)
                }
            })
            //almacena los datos del json
            obj = bandas
        })


let buscar= document.getElementById("buscar")
buscar.addEventListener("click", () => 
filtrar(obj))
//filtrar(bandas))

function filtrar(bandas){
    let arrayFiltrado= bandas.filter(({nombre}) =>
    nombre.includes(buscador.value.toUpperCase()))
    console.log(buscador.value)
   
    renderizarTarjetas(arrayFiltrado)
}
    
function renderizarTarjetas(arrayDeBandas){
    let contenedor= document.getElementById("wrapper")
    contenedor.innerHTML = ""
    arrayDeBandas.forEach(({ nombre, disco,genero, cantidad,precio, img, id }) => {
        
        let tarjeta= document.createElement("div")
        tarjeta.className="tarjeta"
        
        tarjeta.innerHTML =`
            <div class="card text-bg-dark mb-4 mt-4 text-center" style="width: 15rem">
                <div class="imagen card-img-top img-fluid" style="background-image: url(${img})"></div>
                    <div class="card-body">    
                        <h4 class="card-title">${nombre}</h4>
                        <p>${disco}</p>
                        <p>${genero}</p>
                        <p>$${precio}</p>
                        <p>Quedan <span id=span${id}>${cantidad}</span> unidades</p>
                        <button id=${id} class= "agregarAlCarrito btn btn-primary">Agregar al carrito</button>
                    </div>
            </div>
            `
        contenedor.appendChild(tarjeta)
        let boton= document.getElementById(id)
        boton.addEventListener("click", (e) =>{
            agregarProductoAlCarrito(e, arrayDeBandas)
        })
    }) 
}

function renderizarCarrito(arrayDeBandas){
    carritoDOM.innerHTML= ""
    arrayDeBandas.forEach(({ nombre, img, precio, unidades, subtotal}) => 
    {
        
        carritoDOM.innerHTML += 
            `
            <div class="card text-bg-dark mb-4 mt-4 col
            text-center" style="width: 15rem">
            <div class="imagen card-img-top img-fluid" style="background-image: url(${img})"></div>
                <p>${nombre}</p>
                <p>Precio:${precio}</p>
                <p>Unidades:${unidades}</p>
                <p>total:${subtotal}</p>
            </div>
            `   
            })
        carritoDOM.innerHTML += `<div class="col m-4 text-center"><button class="btn btn-primary  mg-5" type="button" id="comprar">Finalizar compra</button></div></div>`
        
        let botonComprar= document.getElementById("comprar")
        botonComprar.addEventListener("click", finalizarCompra)

}

function agregarProductoAlCarrito(e, productos){

        let posicionProd= productos.findIndex(producto => producto.id == e.target.id)
        let productoBuscado= productos.find(producto => producto.id === Number(e.target.id))

    if(productos[posicionProd].cantidad > 0){
         lanzarAlerta("Producto agregado", "producto agregado correctamente", "success")
        //
         let elementoSpan= document.getElementById("span" + e.target.id)
         productos[posicionProd].cantidad--
         elementoSpan.innerHTML= productos[posicionProd].cantidad

            if(carrito.some(({id}) => id === productoBuscado.id)){
                let pos= carrito.findIndex(({id}) => id == productoBuscado.id)
                carrito[pos].cantidad++
                carrito[pos].subtotal= carrito[pos].precio * carrito[pos].cantidad
            }
            else{
                carrito.push({
                    id: productoBuscado.id,
                    nombre: productoBuscado.nombre,
                    img: productoBuscado.img,
                    precio: productoBuscado.precio,
                    unidades:productoBuscado.unidades,
                    subtotal: productoBuscado.precio
                })
            }
        localStorage.setItem("carritoDOM", JSON.stringify(carrito))
        renderizarCarrito(carrito)
        }
    else{
        lanzarAlerta("Sin Stock", `Producto ${productoBuscado.nombre} sin stock`, "error")
    }
}

let botonCarrito= document.getElementById("sidebar")
botonCarrito.addEventListener("click", mostrarCarrito)


function mostrarCarrito(){
    let contenedorProductos= document.getElementById("contenedorProductos")
    if(contenedorProductos != null){
        renderizarCarrito(carrito)
    }
    else{
        let aviso
        aviso.className="aviso"
        
        aviso.innerHTML =`
            <div class="card text-bg-dark mb-4 mt-4 text-center" style="width: 15rem">
                <p>Carrito vacio</p>
            </div>
            `
    }
}

function finalizarCompra(){
    lanzarAlerta("Gracias por su compra")
    localStorage.removeItem("carrito")
    carrito= []
    renderizarCarrito(carrito)
}


function lanzarAlerta(title, text, icon){
    swal.fire({
        title,
        text,
        icon
    })
}

//Registrarse
let login= document.getElementById("login")
let botonRegistrarse=document.getElementById("btRegistrarse")

botonRegistrarse.addEventListener("click", () => {
        swal.fire({
            html: `
                <h2>Registrarse</h2>
                <input id="usuario" placeholder="usuario">
                <input id="contrasenia" placeholder="Contraseña">
                <button id="registrarse">Registrarse</button>
                `,
            showConfirmButton:false,
        })

        let usuario= document.getElementById("usuario")
        let contrasenia= document.getElementById("contrasenia")
        let registrarse= document.getElementById("registrarse")
    
        registrarse.addEventListener("click", () => {
        // console.log(usuario.value)
        // console.log(contrasenia.value)
        let infoUsuario = { usuario: usuario.value, contrasenia: contrasenia.value}
        localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario))
        swal.fire({
            title: 'Usuario registrado',
            icon: 'success',
            confirmButtonText: 'ok'
        })
        })
})

//Iniciar Sesion
let botonIniciarSesion=document.getElementById("btIniciarSesion")

botonIniciarSesion.addEventListener("click", () => {
        swal.fire({
            html:`<h2>INICIAR SESION</h2>
                <input id="usuarioIS" placeholder="usuario">
                <input id="contraseniaIS" placeholder="Contraseña">
                <button id="iniciarSesion">INICIAR SESION</button>`,
                showConfirmButton:false,
        })
        
        let usuarioIS= document.getElementById("usuarioIS")
        let contraseniaIs= document.getElementById("contraseniaIS")
        let iniciarSesion= document.getElementById("iniciarSesion")
    
    iniciarSesion.addEventListener("click", () => {
        let infoUsuario= JSON.parse(localStorage.getItem("infoUsuario"));
            if((infoUsuario.usuario == usuarioIS.value)&&(infoUsuario.contrasenia == contraseniaIs.value)){
                swal.fire({
                    title: 'Bienvenido',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                login.classList.add("ocultar");
                pantallaCompleta.classList.remove("ocultar");
            }
            else{
                swal.fire({
                    title: 'Erorr!',
                    text: 'Datos incorrectos, vuelva a intentarlo',
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            }
        })
})

// Filtrado
let inputRadio = document.getElementsByClassName("input")

for(const input of inputRadio){
    input.addEventListener("click", filtrarPorCategoria)
}

function filtrarPorCategoria(e){
    let filtros= []
    for(const input of inputRadio){
        if(input.checked){
            filtros.push(input.id)
        }
    }  
    let arrayFiltrado= obj.filter(ob => filtros.includes(ob.genero))
    renderizarTarjetas(arrayFiltrado.length > 0 ? arrayFiltrado : obj) 
    
}
