import getStock from "#controllers/stocks.controller";
import { Router } from "express";

/*
Define a router to handle stock related routes
*/
const stocksRouter = Router();
stocksRouter.post("/", getStock);

//Export the route to be used in the server application.
export default stocksRouter;
