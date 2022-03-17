const fs = require("fs");
const express = require("express");
const Router = express;
const Contenedor = require("../Contenedor");
const contenedor = new Contenedor("./productos.txt");

var bodyParser = require("body-parser");

const app = express();
const router = Router();

const port = 8080;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// defino el motor de plantilla
app.engine("ntl", function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content
      .toString()
      .replace("#title#", "" + options.title + "")
      .replace("#message#", "" + options.message + "");
    return callback(null, rendered);
  });
});
app.set("views", "./views"); // especifica el directorio de vistas
app.set("view engine", "ntl"); // registra el motor de plantillas

router.use(express.json()); //Se podria ahorrar usando body-parser

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

server.on("error", (err) => "There was an error starting the server" + { err });

app.use("/api/productos", router);

app.use(express.static("public"));
app.use("static", express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname, "/index.html");
});

router.get("/", async (req, res) => {
  res.type("json");
  res.send(JSON.stringify(await contenedor.getAll(), null, 2));
});

router.get("/:id", async (req, res) => {
  let product = await contenedor.getById(parseInt(req.query.id));
  res.type("json");
  res.send(JSON.stringify(product, null, 2));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const producto = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  let product = await contenedor.create(producto);
  res.type("json");
  res.send(JSON.stringify(product, null, 2));
});
