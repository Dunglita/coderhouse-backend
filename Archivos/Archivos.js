const fs = require("fs");
const Contenedor = require("./Contenedor");

const contenedor = new Contenedor("./productos.txt");

save({
  title: "Yogurt",
  price: 55,
  thumbnail:
    "https://cdn.ladespensita.com.ar/wp-content/uploads/2020/08/1597416910938521eab81f73eca724b6249601ea78.jpg",
});
// Workking fine and smooth :)

contenedor.deleteById(3);
//Error si se ejecuta con productos.txt vacio

const specificProduct = contenedor.getById(2);
// console.log(specificProductos); Undefined sin resolver

const allProduct = contenedor.getAll();
// console.log(allproductos); Undefined sin resolver
