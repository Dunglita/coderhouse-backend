const fs = require("fs");

class Contenedor {
  //Constructor
  constructor(path) {
    this.path = path;
  }

  async save(product) {
    fs.readFile(this.path, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        if (data.length > 0) {
          let parsedData = JSON.parse(data);
          let key = 1;
          parsedData.forEach((item) => {
            if (item.id > key) {
              key = item.id;
            }
          });
          product["id"] = key + 1;
          fs.writeFileSync(this.path, JSON.stringify([...parsedData, product]));
          console.log("Verificamos el reterno" + " " + product.id);
          return product.id;
        } else {
          product["id"] = 1;
          fs.writeFileSync(this.path, JSON.stringify([product]));
          console.log("Verificamos el reterno " + " " + product.id);
          return product.id;
        }
      }
    });
  }

  getById(id) {
    fs.readFile(this.path, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let parsedData = JSON.parse(data);
        let item = parsedData.find((item) => item.id === id);
        if (!item) {
          console.log("No object with specified id");
          return null;
        } else {
          console.log(item);
          return item;
        }
      }
    });
  }

  getAll() {
    fs.readFile(this.path, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let parsedData = JSON.parse(data);
        let producList = [];
        parsedData.forEach((item) => {
          producList.push(item);
        });
        console.log(producList);
        return producList;
      }
    });
  }

  deleteById(id) {
    fs.readFile(this.path, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let parsedData = JSON.parse(data);
        let item = parsedData.find((item) => item.id === id);
        if (!item) {
          console.log("No object with specified id");
        } else {
          let index = parsedData.indexOf(item);
          parsedData.splice(index, 1);
          fs.writeFileSync(this.path, JSON.stringify(parsedData));
        }
      }
    });
  }

  deleteAll() {
    fs.readFile(this.path, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let parsedData = JSON.parse(data);
        parsedData.length = 0;
        fs.writeFileSync(this.path, JSON.stringify(parsedData));
      }
    });
  }
}
module.exports = Contenedor;
