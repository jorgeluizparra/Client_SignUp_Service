const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* Recommended for production */
// var corsOptions = {
//   origin: "http://localhost:8080"
// };
// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelizeConfig.sync();

require("./app/routes/client.routes")(app);

app.get("/", (req, res) => {
  res.json({ 
    status: 200,
    message: "Signup service is working..."
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/.`);
});

module.exports = app;