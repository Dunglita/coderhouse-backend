const express = require("express");
const bodyParser = require("body-parser");
const Contenedor = require("./Contenedor");
const handlebars = require("express-handlebars");
const contenedor = new Contenedor("./productos.txt");
const app = express();

const port = 8080;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

server.on("error", (err) => "There was an error starting the server" + { err });

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoyutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "hbs");

app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/productos", async (req, res) => {
  const producto = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  let product = await contenedor.create(producto);
  res.render("form");
});

app.get("/productos", async (req, res) => {
  let products = await contenedor.getAll();
  console.log(products);
  res.render("table", { item: products });
});
