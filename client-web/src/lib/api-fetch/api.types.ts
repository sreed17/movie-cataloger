export type MovieItem = {
  _id: string;
  title: string;
  language: string;
  year: number;
  status: "new" | "watching" | "watched";
  rating: number;
  thumbnail?: string;
  filename: string;
};
