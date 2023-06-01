type Options = { defaultRequest?: boolean; defaultResponse?: boolean };

const defaultOptions: Options = {
  defaultRequest: true,
  defaultResponse: true,
};

export async function secureFetch(
  input: Parameters<typeof fetch>[0],
  init: Parameters<typeof fetch>[1],
  opts: Options = {}
) {
  const { defaultRequest, defaultResponse } = { ...defaultOptions, ...opts };

  if (!("user" in localStorage))
    throw new Error("No authentication token found");
  const strUserLocalData = localStorage.getItem("user");
  if (strUserLocalData != null) {
    const userLocalData = JSON.parse(strUserLocalData);
    if (!userLocalData.token)
      throw new Error("no token in local storage user entry");

    const defaultHeader = {
      Authorization: `Bearer ${userLocalData.token}`,
      ...(defaultRequest ? { "Content-Type": "application/json" } : {}),
    };

    if (!init) init = {};
    init.headers = { ...defaultHeader, ...init.headers };
    const res = await fetch(input, init);
    if (defaultResponse) return res.json();
    return res;
  } else throw new Error("invalid user local storage entry");
}

type CallbackType = (err: null | any, payload: any) => void;

export function verifyResponse(resJSON: any, cb: CallbackType) {
  try {
    const { status, payload } = resJSON;
    if (!status) return cb(new Error("Status prop not found in req"), payload);
    return cb(null, payload);
  } catch (err) {
    cb(err, false);
  }
}
