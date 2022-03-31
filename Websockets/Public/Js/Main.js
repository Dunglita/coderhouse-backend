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

socket.on("productList", (productList) => {
  makeHtmlTable(productList).then((html) => {
    document.getElementById("table_container").innerHTML = html;
  });
});

async function makeHtmlTable(productos) {
  const respuesta = await fetch("views/table.hbs");
  const plantilla = await respuesta.text();
  const template = Handlebars.compile(plantilla);
  const html = template({ item: productos });
  return html;
}

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div><p class='mail'>${elem.mail}</p> <p class='date'>[${elem.date}]</p> <p class='message'>: ${elem.message}</p></div>`;
    })
    .join("</br>");
  document.getElementById("chat_container").innerHTML = html;
}

socket.on("messages", (data) => {
  render(data);
});

function addMessage(e) {
  const mensaje = {
    date: new Date(Date.now()),
    mail: document.getElementById("mail").value,
    message: document.getElementById("message").value,
  };
  socket.emit("new-message", mensaje);
  return false;
}
