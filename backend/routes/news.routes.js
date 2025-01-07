import { Router } from "express";
import getNews from "#controllers/news.controller";

const newsRouter = Router();
newsRouter.get("/", getNews);

export default newsRouter;
