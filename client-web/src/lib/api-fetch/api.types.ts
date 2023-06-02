export type MovieItem = {
  title: string;
  language: string;
  year: number;
  status: "new" | "watching" | "watched";
  rating: number;
  ext: string;
};
