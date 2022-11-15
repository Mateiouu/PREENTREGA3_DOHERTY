//capturas DOM
let divproductos = document.getElementById("productos")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let  botonmayor = document.getElementById("mayora")
let botonmenor = document.getElementById("menora")
let finalizarcompra = document.getElementById('botonFinalizarCompra')
let btnbuscar = document.getElementById('btnBuscar')
let btnguardarzapa = document.getElementById("guardarzapaBtn")
class Zapatilla{
    constructor(id, marca, modelo, color, genero, precio, imagen){
        this.id = id,
        this.marca= marca,
        this.modelo = modelo,
        this.genero = genero,
        this.color = color,
        this.precio = precio
        this.imagen = imagen

    }
    

}


catalogo = []
const zapas1 = new Zapatilla(1, "Nike", "Vaporfly", "Verdes", "Hombre", 65000, "vaporfly.jpeg")

const zapas2 = new Zapatilla(2, "Adidas", "Adizero", "Blancas", "Mujer", 62000, "adizero.jpeg")

const zapas3 = new Zapatilla(3, "New Balance", "Echo", "Negras", "Hombre", 35000, "nb echo.jpg")

const zapas4 = new Zapatilla(4, "Saucony", "Endorphine", "Rojas", "Hombre", 75000,'saucony.jpeg')

const zapas5 = new Zapatilla(5, "Asics", "FlyPro", "Blancas", "Mujer", 45000,"asics.webp")

const zapas6 = new Zapatilla(6, "Puma", "Velocity", "Negras", "Hombre", 44000, "velocity.jpeg")

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    //Entra por primera -- setear el array el original
    
    catalogo.push(zapas1,zapas2,zapas3,zapas4,zapas5,zapas6)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}
let zapasencarrito = JSON.parse(localStorage.getItem("carrito")) || []

function agregarproductos(){
    console.log("hola")
    let inputmarca = document.getElementById("marcaInput")  
    let inputmodelo = document.getElementById("modeloInput")
    let inputcolor = document.getElementById("colorInput")
    let inputgenero = document.getElementById("generoInput")
    let inputprecio = document.getElementById("precioInput")
    
    
    let zapacreada = new Zapatilla(catalogo.length+1, inputmarca.value, inputmodelo.value,inputcolor.value, inputgenero.value, parseInt(inputprecio.value), "nike.jpg")
    //Objeto creado lo pusheo al array
    catalogo.push(zapacreada)
    //TAMBIÉN MODIFICAMOS ARRAY DEL STORAGE:
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
    mostrarcatalogo()
    
    inputmarca.value = ""
    inputmodelo.value = ""
    inputcolor.value =""
    inputgenero.value = ""
    inputprecio.value = ""
}
function mostrarcatalogo(){
    divproductos.innerHTML = ""
    for(let zapa of catalogo ){
        let nuevazapa = document.createElement("div")
        nuevazapa.classList.add("col-12", "col-md-6", "col-lg-4", "my-1", )
        nuevazapa.innerHTML = `<div id="${zapa.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="./entrega/images/${zapa.imagen}" alt="${zapa.modelo} de ${zapa.marca}">
        <div class="card-body">
            <h4 class="card-title">${zapa.marca} ${zapa.modelo}</h4>
            <p class = "marca">Marca: ${zapa.marca}</p>
            <p class="${zapa.precio <= 50000 ? "oferta" : "precionormal"}">Precio: ${zapa.precio}</p>
        <button id="agregarBtn${zapa.id}" class="btn btn-outline-success">Agregar al carrito</button>
        
        </div>
</div>`

        divproductos.appendChild(nuevazapa)
        let agregar = document.getElementById(`agregarBtn${zapa.id}`)
        agregar.addEventListener("click" ,() =>{
            carrito_add(zapa)
        })
    }
}


function menoramayor(){
    let catalogomenoramayor = catalogo.sort((a,b) => parseFloat(a.precio) - parseFloat(b.precio))
    divproductos.innerHTML = ""
    for(let zapa of catalogomenoramayor ){
        let nuevazapa = document.createElement("div")
        nuevazapa.classList.add("col-12", "col-md-6", "col-lg-4", "my-1", )
        nuevazapa.innerHTML = `<div id="${zapa.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="./entrega/images/${zapa.imagen}" alt="${zapa.modelo} de ${zapa.marca}">
        <div class="card-body">
            <h4 class="card-title">${zapa.marca} ${zapa.modelo}</h4>
            <p class = "marca">Marca: ${zapa.marca}</p>
            <p class="${zapa.precio <= 50000 ? "oferta" : "precionormal"}">Precio: ${zapa.precio}</p>
        <button id="agregarBtn${zapa.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
</div>`
        
        divproductos.appendChild(nuevazapa)
        let agregar = document.getElementById(`agregarBtn${zapa.id}`)
        agregar.addEventListener("click" ,() =>{
            carrito_add(zapa)
        })
    }

}
function mayoramenor(){
    let catalogomayoramenor = catalogo.sort((a,b) => parseFloat(b.precio) - parseFloat(a.precio))
    divproductos.innerHTML = ""
    for(let zapa of catalogomayoramenor ){
        let nuevazapa = document.createElement("div")
        nuevazapa.classList.add("col-12", "col-md-6", "col-lg-4", "my-1", )
        nuevazapa.innerHTML = `<div id="${zapa.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="./entrega/images/${zapa.imagen}" alt="${zapa.modelo} de ${zapa.marca}">
        <div class="card-body">
            <h4 class="card-title">${zapa.marca} ${zapa.modelo}</h4>
            <p class = "marca">Marca: ${zapa.marca}</p>
            <p class="${zapa.precio <= 50000 ? "oferta" : "precionormal"}">Precio: ${zapa.precio}</p>
        <button id="agregarBtn${zapa.id}" class="btn btn-outline-success">Agregar al carrito</button>
        
        </div>
</div>`

        divproductos.appendChild(nuevazapa)
        let agregar = document.getElementById(`agregarBtn${zapa.id}`)
        agregar.addEventListener("click" ,() =>{
            carrito_add(zapa)
        })
    }
}
mostrarcatalogo()

function carrito_add(zapa){
    zapasencarrito.push(zapa)
    localStorage.setItem("carrito", JSON.stringify(zapasencarrito))
    console.log(zapasencarrito)
}
let total = 0
function totalprecio(array){
    for(let zapa of array){
        total += zapa.precio
    }
    return total
}
function vercarrito(){
    modalBodyCarrito.innerHTML = ""
    zapasencarrito.forEach((producto)=>{
        console.log(producto)
    modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${producto.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="./entrega/images/${producto.imagen}" alt="${producto.modelo}">
            <div class="card-body">
                    <h4 class="card-title">${producto.marca}</h4>
                
                    <p class="card-text">$${producto.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${producto.id}"><i class="fas fa-trash-alt"></i></button>
                    
            </div>    
        </div>
`
    })
    console.log(zapasencarrito)
    modalBodyCarrito.innerHTML +=  ` TOTAL : <h1>$${totalprecio(zapasencarrito)}</h1>`
    zapasencarrito.forEach((producto, indice)=>{
        //capturo elemento del DOM sin guardarlo en variable
        document.getElementById(`botonEliminar${producto.id}`).addEventListener("click",()=>{
           
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${producto.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           zapasencarrito.splice(indice, 1) 
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(zapasencarrito))
           //vuelvo a calcular el total
           
        })
        if(zapasencarrito.length == 0){
            total = 0
            modalBodyCarrito.innerHTML += `<p> No hay prodcutos en el carrito</p>`

        }
    })}
   

function busqueda(){
        let busqueda = document.getElementById("buscador")
        console.log(busqueda)
        let marca = catalogo.find(
            (zapa)=> zapa.marca.toLowerCase() == busqueda.toLowerCase()
            )
            alert(marca)
      
        
       
        
        let nuevazapa = document.createElement("div")
                nuevazapa.classList.add("col-12", "col-md-6", "col-lg-4", "my-1", )
                nuevazapa.innerHTML = `<div id="${marca.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="./entrega/images/${marca.imagen}" alt="${marca.modelo} de ${marca.marca}">
        <div class="card-body">
            <h4 class="card-title">${marca.marca} ${marca.modelo}</h4>
            <p class = "marca">Marca: ${marca.marca}</p>
            <p class="${marca.precio <= 50000 ? "oferta" : "precionormal"}">Precio: ${marca.precio}</p>
        <button id="agregarBtn${marca.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
</div>`
        
divproductos.appendChild(nuevazapa)
let agregar = document.getElementById(`agregarBtn${zapa.id}`)
agregar.addEventListener("click" ,() =>{
    carrito_add(zapa)
})
        }

            
       
    

botonCarrito.addEventListener("click", ()=>{
    vercarrito()
})

botonmayor.addEventListener("click",()=>{
    mayoramenor()
} 
)

botonmenor.addEventListener("click",()=>{
    menoramayor()
} 
)

btnguardarzapa.addEventListener("click",()=>{
    agregarproductos()
})
finalizarcompra.addEventListener("click",()=>{
    zapasencarrito.splice(0, zapasencarrito.length) 
    localStorage.setItem('carrito', JSON.stringify(zapasencarrito))
    Swal.fire({
        title: 'Gracias por su Compra!',
        text: 'Vuelva pronto',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
})