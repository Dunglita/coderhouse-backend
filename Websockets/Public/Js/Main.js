const socket = io.connect();

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");

document.querySelector("button").addEventListener("click", () => {
  socket.emit("newProduct", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });
});

socket.on("mensajes", (msjs) => {
  const mensajesHTML = msjs
    .map((msj) => `SocketId: ${msj.socketid} -> Mensaje: ${msj.mensaje}`)
    .join("<br>");
  document.querySelector("p").innerHTML = mensajesHTML;
});

socket.on("productList", (productList) => {
  console.table(productList);
  makeHtmlTable(productList).then((html) => {
    document.getElementById("table_container").innerHTML = html;
  });
});

async function makeHtmlTable(productList) {
  const respuesta = await fetch("views/table.hbs");
  const plantilla = await respuesta.text();
  const template = compile(plantilla);
  const html = template({ productList });
  return html;
}
