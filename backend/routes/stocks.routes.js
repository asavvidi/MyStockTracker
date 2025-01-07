import getStock from "#controllers/stocks.controller";
import { Router } from "express";

const stocksRouter = Router();

stocksRouter.post("/", getStock);

export default stocksRouter;
