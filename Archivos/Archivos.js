const Contenedor = require("./Contenedor");

const contenedor = new Contenedor("./productos.txt");

contenedor.fileExists();

contenedor.save({
  title: "Yogurt",
  price: 55,
  thumbnail:
    "https://cdn.ladespensita.com.ar/wp-content/uploads/2020/08/1597416910938521eab81f73eca724b6249601ea78.jpg",
});

contenedor.getAll();

contenedor.getById(2);

contenedor.deleteById(3);

//contenedor.deleteAll();
