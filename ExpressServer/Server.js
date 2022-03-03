const express = require("express");
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("./productos.txt");

const app = express();

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.get("/productos", async (req, res) => {
  res.type("json");
  res.send(JSON.stringify(await contenedor.getAll(), null, 2));
});

app.get("/productoRandom", async (req, res) => {
  let products = await contenedor.getAll();
  let indice = Math.floor(Math.random() * products.length);
  res.type("json");
  res.send(JSON.stringify(products[indice], null, 2));
});
