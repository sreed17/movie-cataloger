import config from "../../config";
import { MovieModel, t_Movie } from "../../models/movie-model";
import { CustomError } from "../../utils/error-handler";
import { statSync, createReadStream, ReadStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { resolve as pathResolve } from "node:path";
import Mime from "mime-types";
import mongoose from "mongoose";

export function generateID() {
  return { id: new mongoose.Types.ObjectId() };
}

export async function createMovie(data: t_Movie) {
  const n_movie = new MovieModel(data);
  n_movie.save();
  return { id: n_movie._id, created: true };
}

export async function findMovies({
  params,
}: {
  params: Parameters<typeof MovieModel.find>;
}) {
  if (!params && !Array.isArray(params)) return MovieModel.find().exec();
  return MovieModel.find(...params).exec();
}

export async function findMovieByID(id: string) {
  return MovieModel.findById(id).exec();
}

export async function updateMovie(id: string, updates: Partial<t_Movie>) {
  return MovieModel.findByIdAndUpdate(id, updates, { new: true }).exec();
}

export async function deleteMovie(id: string) {
  return MovieModel.findByIdAndDelete(id).exec();
}

export async function deleteMovies({
  params,
}: {
  params: Parameters<typeof MovieModel.deleteMany>;
}) {
  return MovieModel.deleteMany(...params).exec();
}

export async function deleteMovieFile(filename?: string) {
  if (!filename) throw new CustomError("No filename in the request body", 400);
  const _filename = pathResolve(config.paths.storage, `./videos/${filename}`);
  await unlink(_filename);
  return { deleted: true };
}

export async function deleteThumbnail(filename?: string) {
  if (!filename) throw new CustomError("No filename in the request body", 400);
  const _filename = pathResolve(
    config.paths.storage,
    `./thumbnails/${filename}`
  );
  await unlink(_filename);
  return { deleted: true };
}

export async function getVideoChunk(
  filename: string,
  range: string,
  opts: { size?: number } = {}
) {
  const defaultOpts = { size: 10 ** 6 }; // default chink size 1MB
  const { size } = { ...defaultOpts, ...opts };

  const _filename = pathResolve(config.paths.storage, `videos/${filename}`);
  const { size: total_size } = statSync(_filename);

  const mime = Mime.lookup(_filename);
  if (!mime) throw new CustomError("file type is undefined", 500);

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + size, total_size - 1);

  const readStream = createReadStream(_filename, { start, end });

  return {
    start,
    end,
    totalSize: total_size,
    length: end - start + 1,
    mime,
    readStream,
  };
}

export function downloadVideo(filename: string) {
  const _filename = pathResolve(config.paths.storage, `./videos/${filename}`);
  const { size: total_size } = statSync(_filename);

  const mime = Mime.lookup(__filename);
  if (!mime) new CustomError("No mime on file", 400);

  const fileStream = createReadStream(_filename);

  return { mime, fileStream, totalSize: total_size } as {
    mime: string;
    fileStream: ReadStream;
    totalSize: number;
  };
}
