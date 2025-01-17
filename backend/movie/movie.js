import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    releaseYear: {
      type: Number,
      required: [true, "Release year is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Movie = model("Movie", movieSchema);
