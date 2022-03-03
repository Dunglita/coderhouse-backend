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
}
module.exports = Contenedor;
