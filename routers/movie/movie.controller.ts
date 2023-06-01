import { Router, Request, Response, NextFunction } from "express";
import { rh } from "../../utils/request-handler";
import multer from "multer";
import * as MovieService from "./movie.service";
import config from "../../config";
import { CustomError } from "../../utils/error-handler";

const router = Router();

router.post(
  "/",
  rh(async (req: Request) => MovieService.createMovie(req.body))
);

//TODO: (fix: TypeError GET/HEAD requests can't have a body)
router.get(
  "/",
  rh(async (req: Request) => MovieService.findMovies(req.body))
);

router.delete(
  "/",
  rh(async (req: Request) => MovieService.deleteMovies(req.body))
);

router.get(
  "/:id",
  rh(async (req: Request) => MovieService.findMovieByID(req.params.id))
);

router.put(
  "/:id",
  rh(async (req: Request) => MovieService.updateMovie(req.params.id, req.body))
);

router.delete(
  "/:id",
  rh(async (req: Request) => MovieService.deleteMovie(req.params.id))
);

// video uploading
const vStorage_opts: multer.DiskStorageOptions = {
  destination: (req, file, cb) => {
    cb(null, config.paths.storage);
  },
  filename: (req, file, cb) => {
    const { id } = req.params;

    console.log(req.query.fln);

    if (!id) return cb(new Error("No id in request"), "");

    if (req.query.fln && typeof req.query.fln === "string") {
      return cb(null, req.query.fln);
    }
    const ext = file.originalname.split(".").slice(-1)[0];
    return cb(null, `${id}.${ext}`);
  },
};

const videoUploader = multer({
  storage: multer.diskStorage(vStorage_opts),
});

router.post(
  "/:id/file",
  videoUploader.single("movie"),
  rh(async (req: Request) => {
    if (!req.file) throw new CustomError("file not created", 500);
    return { uploaded: true, filename: req.file?.filename };
  })
);

router.get("/:id/file", (req: Request, res: Response, next: NextFunction) => {
  const { ext, fln } = req.query;
  const { id } = req.params;
  const filename = `${id}.${ext}`;
  const range = req.headers.range;
  if (!range)
    return next(new CustomError(`No range header in the request`, 400));

  MovieService.getVideoChunk(filename, range)
    .then(({ start, end, totalSize, length, readStream, mime }) => {
      try {
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${totalSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": length,
          "Content-Type": mime,
        };
        res.writeHead(206, headers);
        readStream.pipe(res);
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
});

router.get(
  "/:id/file/download",
  (req: Request, res: Response, next: NextFunction) => {
    const { ext, fln } = req.query;
    const { id } = req.params;
    const filename = `${id}.${ext}`;
    try {
      const { fileStream, mime, totalSize } =
        MovieService.downloadVideo(filename);

      res.setHeader("content-type", mime);
      res.setHeader(
        "content-disposition",
        `attachment; filename=${fln ?? id}.mp4`
      );
      res.setHeader("content-length", totalSize);

      fileStream.pipe(res);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id/file",
  rh(async (req: Request) => MovieService.deleteMovieFile(req.body.filename))
);

/** ----- EXPORT ----- */
export default router;
