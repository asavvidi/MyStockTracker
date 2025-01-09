/*
Defines routes to handle frontend page requests:
1. GET '/' for rendering the initial page with the default data.
2. POST '/search' for rendering the inital page with the updated data.
*/

import { Router } from "express";
import controller from "#controllers/page.controller";

const pageRouter = new Router();

pageRouter.get("/", controller.fetchData);
pageRouter.post("/search", controller.fetchNewData);

export default pageRouter;
