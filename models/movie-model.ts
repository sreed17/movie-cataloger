import { Schema, InferSchemaType, model } from "mongoose";

const MovieSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, require: [true, "Title of the movie is required"] },
    language: { type: String, require: true },
    year: { type: String, require: true },
    status: {
      type: String,
      enum: ["new", "watching", "watched"],
      default: "new",
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    thumbnail: String,
    filename: { type: String, require: true },
  },
  { _id: false, timestamps: true }
);

export type t_Movie = InferSchemaType<typeof MovieSchema>;

export const MovieModel = model("movie", MovieSchema);

export default MovieModel;
