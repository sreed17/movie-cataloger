import { Request, Response, NextFunction } from "express";

type InputFunc = (req: Request) => any;

export function rh(func: InputFunc) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const ret_value = func(req);
      const isPromise =
        typeof ret_value.then === "function" &&
        typeof ret_value.catch === "function";

      if (isPromise) {
        ret_value
          .then((payload: any) => {
            res.json({ status: "success", payload });
          })
          .catch((err: any) => next(err));
      } else {
        res.json({ status: "success", payload: ret_value });
      }
    } catch (err) {
      next(err);
    }
  };
}
