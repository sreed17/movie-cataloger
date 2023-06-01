import { Schema, InferSchemaType, model } from "mongoose";

const MovieSchema = new Schema(
  {
    title: { type: String, require: [true, "Title of the movie is required"] },
  },
  { timestamps: true }
);

export type t_Movie = InferSchemaType<typeof MovieSchema>;

export const MovieModel = model("movie", MovieSchema);

export default MovieModel;
