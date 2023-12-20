const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const glob = require("glob");
const path = require("path");

const connectToDatabase = require("./lib/db");
const checkToken = require("./middleware/checktoken");
const { ErrorHandler, Error404Handler } = require("./middleware/errorhandler");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
//accept images form browser
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use(cors());
app.use(compression());

//middleware
app.use(checkToken);
// ERROR HANDLER MIDDLEWARE (Last middleware to use)

const routes = glob.sync(__dirname + "/router/admin/*.js");
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// console.log({ routes });
routes.forEach((item) => {
  require(item).default(app);
});
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//404 error
app.all("*", Error404Handler);
//end

app.use(ErrorHandler);

module.exports = app;
