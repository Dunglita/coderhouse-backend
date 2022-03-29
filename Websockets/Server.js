const express = require("express");
const bodyParser = require("body-parser");
const Contenedor = require("./Contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const contenedor = new Contenedor("./productos.txt");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

httpServer.listen(port, () => console.log("SERVER ON"));

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

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.emit("mi mensaje", "Este es mi mensaje desde el servidor");

  socket.on("notificacion", (data) => {
    console.log(data);
  });

  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data });
    io.sockets.emit("mensajes", mensajes);
  });
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
