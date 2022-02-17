class Usuarios {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`${this.nombre} ${this.apellido}`);
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(pet) {
    this.mascotas.push(pet);
    console.log(this.mascotas);
  }

  countMascotas() {
    console.log(this.mascotas.length);
    return this.mascotas.length;
  }

  addBook(titulo, autor) {
    this.libros.push({ titulo, autor });
    console.log(this.libros);
  }

  getBookNames() {
    let bookList = [];
    this.libros.forEach((libro) => {
      bookList.push(libro.titulo);
    });
    console.log(bookList);
    return bookList;
  }
}

const usuario = new Usuarios(
  "Daniel",
  "Garcia",
  [{ titulo: "El Psicoanalista", autor: "John Katzenbach" }],
  ["Noah", "Wala", "Layka"]
);

usuario.getFullName();
usuario.addMascota("Manu");
usuario.countMascotas();
usuario.addBook("Inferno", "Dan Brown");
usuario.getBookNames();
