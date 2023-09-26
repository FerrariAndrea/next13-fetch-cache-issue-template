const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { port } = require("./config");
const { generateJson } = require("./generator");
const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route("/test_req").post((req, res) => {
  try {
    const id = req.body.id;
    const size = req.body.size;
    const json = generateJson(id, size);
    const kbite_size = Buffer.byteLength(JSON.stringify(json)) / 1024;
    console.log(
      "Served test ID " + id + ". Size[" + size + "] KB[" + kbite_size + "];"
    );
    res.status(200).json(json);
  } catch (err) {
    console.log("General Error:", err);
    res.status(500).json({});
  }
});

app
  .use(cors())
  .use(cookieParser())
  .use("/", router)
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    return next();
  })
  .listen(port, () => {
    console.log("App listening on port " + port);
  });
