const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8080;

app.use(express.static("public"));

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const server = app.listen(PORT, () => {
  console.log("servidor levantado en el puerto " + server.address().port);
});

server.on("error", (error) => console.log(`hubo un error ${error}`));

app.use("/", router);

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/subir", upload.single("fileUpload"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("please upload file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
