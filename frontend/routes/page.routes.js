import { Router } from "express";
import controller from "#controllers/page.controller";

const pageRouter = new Router();

pageRouter.get("/", controller.fetchData);
pageRouter.get("/search", controller.fetchNewData);

export default pageRouter;
