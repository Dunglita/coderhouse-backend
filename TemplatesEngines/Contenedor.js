const fs = require("fs");

class Contenedor {
  //Constructor
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.path));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      let products = JSON.parse(await fs.promises.readFile(this.path));
      let product = products.find((item) => item.id === id);
      if (product !== undefined) {
        return product;
      }
      return { error: "Producto no encontrado" };
    } catch (error) {
      console.log(error);
    }
  }

  async create(product) {
    let productList = JSON.parse(await fs.promises.readFile(this.path));
    product["id"] = productList.length + 1;
    productList.push(product);
    try {
      fs.promises.writeFile(this.path, JSON.stringify(productList));
      return productList[productList.length - 1];
    } catch (error) {
      console.log(error);
    }
  }

  async update(product) {
    let productList = JSON.parse(await fs.promises.readFile(this.path));
    let producto;
    let range = 0;
    productList.forEach((item) => {
      if (item.id === product.id) {
        producto = item;
      }
      if (item.id >= range) {
        range = item.id;
      }
    });
    if (range > product.id) {
      let index;
      index = productList.indexOf(producto);
      productList[index] = product;
      try {
        fs.promises.writeFile(this.path, JSON.stringify(productList));
        return productList[index];
      } catch (error) {
        console.log(error);
      }
    }
    return { error: "Producto no encontrado" };
  }

  async deleteById(id) {
    try {
      let products = JSON.parse(await fs.promises.readFile(this.path));
      let filteredProducts = products.filter((product) => product.id != id);
      if (products != filteredProducts) {
        fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
        return { Mensaje: "Producto eliminado" };
      }
      return { error: "Producto no encontrado" };
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Contenedor;
