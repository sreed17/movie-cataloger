import express from "express";
import { createServer as createHttpServer } from "http";
import dotenv from "dotenv";
import { initDBConnection } from "./models/init-db";
import routers from "./routers";
import { customErrorHandler } from "./utils/error-handler";
import cors from "cors";
dotenv.config();

const app = express();

initDBConnection();

/** ----- MIDDLEWARES ----- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// api endpoints
routers(app);

// global error handlers
app.use(customErrorHandler);

/** ----- START SERVER ----- */
const server = createHttpServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Movie Cataloger cgi running at port ${PORT}`);
});
