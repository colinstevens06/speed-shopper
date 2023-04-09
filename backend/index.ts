import express from "express";
import { useApiRoutes } from "./routes/use-api-routes";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 3000;

// Hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

useApiRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
