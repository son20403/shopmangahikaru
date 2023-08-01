import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import db from "./config/db";
import methodOverride from "method-override";
import session from "express-session";
import cors from "cors";
const cookieParser = require("cookie-parser");
require("dotenv").config();

let app = express();

app.use(cors());
//connect DB
db.connect();
app.use(cookieParser());
//đọc parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);

//router
router.route(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
