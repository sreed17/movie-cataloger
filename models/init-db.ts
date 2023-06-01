import { connect } from "mongoose";

export const initDBConnection = async () => {
  const dbURI = process.env.DATABASE;
  if (!dbURI) throw new Error("no DATABASE environment variable found");
  await connect(dbURI);
};
