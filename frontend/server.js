import express from "express";
import { SERVER_PORT } from "#config/app.config";
import pageRouter from "#routes/page.routes";

const app = express();
const PORT = SERVER_PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", pageRouter);

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});
