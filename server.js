const dotenv = require("dotenv");
const connectToDatabase = require("./lib/db");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.get("/", (req, res) => res.send("Hello World"));
  app.listen(port, () => console.log(`Server running on ${process.env.PORT}`));
});
