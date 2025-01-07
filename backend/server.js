import express from "express";
import { PORT } from "#config/app.config";
import cors from "cors";
import newsRouter from "#routes/news.routes";
import stocksRouter from "#routes/stocks.routes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/news", newsRouter);
app.use("/stocks", stocksRouter);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
