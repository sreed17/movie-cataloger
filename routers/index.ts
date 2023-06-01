import { Express } from "express";
import { rh } from "../utils/request-handler";
import MovieRouter from "./movie/movie.controller";

const API_ROOT_PATH = "/api/v1";
const relPath = (p?: string) => {
  if (!p) return API_ROOT_PATH;
  return `${API_ROOT_PATH}/${p}`;
};

export default (app: Express) => {
  app.get(
    relPath(),
    rh(async function (req) {
      return { name: "movie-cataloger", version: "1.0" };
    })
  );

  app.use(relPath("movie"), MovieRouter);
};
