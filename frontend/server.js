/*
This file set up the backend server for the application
*/

import express from "express";
import { SERVER_PORT } from "#config/app.config";
import pageRouter from "#routes/page.routes";

//Initialize the Express application
const app = express();
const PORT = SERVER_PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//All requests to '/' or related paths will be handled by the 'pageRouter'
app.use("/", pageRouter);

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
});
