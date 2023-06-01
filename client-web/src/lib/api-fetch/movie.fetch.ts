import apiConfig from "./api-config";

const getApiUrl = (id?: string, p?: string) => {
  let c_url = `${apiConfig.baseUrl}/movie`;
  if (!id) return c_url;
  c_url += `/${id}`;
  if (!p) return c_url;
  c_url += `${p}`;
  return c_url;
};

export async function fetchMovieById(id: string) {
  const dest = getApiUrl(id);
  const opt: RequestInit = { method: "get" };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function fetchAllMovies() {
  const dest = getApiUrl();
  console.log(dest);
  const opt: RequestInit = {
    method: "get",
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function addMovie(input: any) {
  const dest = getApiUrl();
  const opt: RequestInit = {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function removeMovie(id: string) {
  const dest = getApiUrl(id);
  const opt: RequestInit = {
    method: "delete",
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function removeMovies(input: any) {
  const dest = getApiUrl();
  const opt: RequestInit = {
    method: "delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function uploadMovieFile(
  id: string,
  formData: FormData,
  filename?: string
) {
  let dest = getApiUrl(id, `/file`);
  if (filename) dest += `?fln=${filename}`;
  const opt: RequestInit = {
    method: "post",
    headers: { "content-type": "multipart/form-data" },
    body: formData,
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export async function deleteMovieFile(id: string, filename: string) {
  const dest = getApiUrl(id, `/file`);
  const opt: RequestInit = {
    method: "delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ filename }),
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export function getPlaybackLink(id: string, ext: string) {
  return getApiUrl(id, `/file?ext=${ext}`);
}

export function getDownloadLink(id: string, ext: string) {
  return getApiUrl(id, `/file/download?ext=${ext}`);
}
