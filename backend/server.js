/*
This file set up the backend server for the application
*/

import express from "express";
import { PORT } from "#config/app.config";
import cors from "cors";

//Import the routes to handle stock and news routes
import newsRouter from "#routes/news.routes";
import stocksRouter from "#routes/stocks.routes";

//Initialize the Express application
const app = express();

//Set the cors() middleware to allow the server to handle requests from different origins.(frontend-backend communication).
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Route handlers:
'/news' : All the requests to this path are handled by the 'newsRouter'
'/stocks': All the requests to this path are handled by the 'stocksRouter'
*/
app.use("/news", newsRouter);
app.use("/stocks", stocksRouter);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
