import { resolve } from "node:path";

export default {
  paths: {
    storage: resolve(process.cwd(), "./storage"),
  },
};
