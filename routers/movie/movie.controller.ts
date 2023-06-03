import { Router, Request, Response, NextFunction } from "express";
import { rh } from "../../utils/request-handler";
import multer from "multer";
import * as MovieService from "./movie.service";
import config from "../../config";
import { CustomError } from "../../utils/error-handler";
import path from "node:path";
import { t_Movie } from "../../models/movie-model";

const router = Router();

/** ----- Multer Configuring ----- */
const uploader_opts: multer.DiskStorageOptions = {
  destination: (req, file, cb) => {
    const { fieldname } = file;
    switch (fieldname) {
      case "movie":
        return cb(null, path.resolve(config.paths.storage, "./videos"));
      case "thumbnail":
        return cb(null, path.resolve(config.paths.storage, "./thumbnails"));
    }
    // error callback
    cb(
      new Error(
        "Invalid Fieldname, fieldname must be either `movie` or `thumbnail` "
      ),
      ""
    );
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    const ext = path.extname(originalname);
    const { _id: id } = req.body;
    // error callback
    if (!id || !ext) {
      return cb(
        new Error(
          "Invalid Fieldname, fieldname must be either `movie` or `thumbnail` "
        ),
        ""
      );
    }
    const filename = `${id}${ext}`;
    cb(null, filename);
  },
};

const uploader = multer({
  storage: multer.diskStorage(uploader_opts),
});

/** ----- METHOD HANDLERS ----- */

router.get(
  "/cud",
  rh((req: Request) => {
    return MovieService.generateID();
  })
);

router.post(
  "/cud",
  uploader.fields([
    { name: "movie", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  rh(async (req: Request) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (!req.files) throw new CustomError("files not uploaded", 500);
    const input: t_Movie = {
      ...req.body,
      thumbnail: files["thumbnail"][0].filename,
      filename: files["movie"][0].filename,
    };
    return MovieService.createMovie(input);
  })
);

router.post(
  "/search",
  rh(async (req: Request) => MovieService.findMovies(req.body))
);

router.delete(
  "/cud",
  rh(async (req: Request) => MovieService.deleteMovies(req.body))
);

router.get(
  "/search/:id",
  rh(async (req: Request) => MovieService.findMovieByID(req.params.id))
);

router.put(
  "/cud/:id",
  rh(async (req: Request) => MovieService.updateMovie(req.params.id, req.body))
);

router.delete(
  "/cud/:id",
  rh(async (req: Request) => MovieService.deleteMovie(req.params.id))
);

// Streaming the video file
router.get(
  "/file/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.params;
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
  }
);

router.get(
  "/thumbnail/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params;
      res.sendFile(
        path.resolve(config.paths.storage, `./thumbnails/${filename}`)
      );
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/thumbnail/:filename",
  rh(async (req: Request) => MovieService.deleteThumbnail(req.params.filename))
);

// Downloading the file
router.get(
  "/file/download/:filename",
  (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.params;
    try {
      const { fileStream, mime, totalSize } =
        MovieService.downloadVideo(filename);

      res.setHeader("content-type", mime);
      res.setHeader("content-disposition", `attachment; filename=${filename}`);
      res.setHeader("content-length", totalSize);

      fileStream.pipe(res);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/file/:filename",
  rh(async (req: Request) => MovieService.deleteMovieFile(req.params.filename))
);

/** ----- EXPORT ----- */
export default router;
