import { Router } from "express";
import getNews from "#controllers/news.controller";

/*
Define a router to handle news related routes
*/
const newsRouter = Router();
newsRouter.get("/", getNews);

//Export the router to be used in the server application.
export default newsRouter;
