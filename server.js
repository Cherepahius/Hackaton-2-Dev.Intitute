const express = require("express");
const cors = require("cors");
const { router } = require("./routers/routers.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log(`run on ${process.env.PORT || 3000}`);
});


app.use("/", router);