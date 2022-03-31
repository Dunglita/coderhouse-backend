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

const PORT = 8080;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

const server = httpServer.listen(PORT, () => {
  console.log(`Server listening on port:${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "Index.hbs",
    layoyutsDir: __dirname + "/Views",
  })
);

app.set("view engine", "hbs");

app.set("views", "./Public/Views");

const mensajes = [];

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  socket.emit("productList", await contenedor.getAll());

  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data });
    io.sockets.emit("mensajes", mensajes);
    console.log(mensajes);
  });
  socket.on("newProduct", async (data) => {
    const producto = {
      title: data.title,
      price: data.price,
      thumbnail: data.thumbnail,
    };
    await contenedor.create(producto);
    io.sockets.emit("productList", await contenedor.getAll());
  });
});
