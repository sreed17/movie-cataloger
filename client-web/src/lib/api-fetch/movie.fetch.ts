import apiConfig from "./api-config";

const getApiUrl = (id?: string, p?: string) => {
  let c_url = `${apiConfig.baseUrl}/movie`;
  if (!id) return c_url;
  c_url += `/${id}`;
  if (!p) return c_url;
  c_url += `${p}`;
  return c_url;
};

export async function fetchAllMovies() {
  const dest = `${getApiUrl()}/search`;
  console.log(dest);
  const opt: RequestInit = {
    method: "post",
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export function getThumbnail(filename: string, imgElem: HTMLImageElement) {
  const dest = `http://localhost:4000/api/v1/movie/thumbnail/${filename}`;
  fetch(dest, { method: "get" })
    .then((res) => res.blob())
    .then((r_blob) => {
      const objURL = URL.createObjectURL(r_blob);
      imgElem.src = objURL;
    })
    .catch((err) => console.log(err));
}

export async function updateMovieInfo(id: string, updates: any) {
  const dest = `http://localhost:4000/api/v1/movie/cud/${id}`;
  const opts = {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updates),
  };
  const res = await fetch(dest, opts);
  const { status, payload } = await res.json();
  if (!status || !payload) throw new Error("No status or payload");
  if (status !== "success") throw new Error("The request was not successful");
  return payload;
}

export async function deleteMovie(
  id: string,
  fn_file: string,
  fn_thumb?: string
) {
  const opt = { method: "delete" };
  const dest_info = `http://localhost:4000/api/v1/movie/cud/${id}`;
  const dest_file = `http://localhost:4000/api/v1/movie/file/${fn_file}`;

  const infoDeleteRes = await fetch(dest_info, opt);
  const infoDeleteJson = await infoDeleteRes.json();
  const fileDeleteRes = await fetch(dest_file, opt);
  const fileDeleteJson = await fileDeleteRes.json();

  const ret_value = [infoDeleteJson, fileDeleteJson];

  if (fn_thumb) {
    const dest_thumb = `http://localhost:4000/api/v1/movie/thumbnail/${fn_thumb}`;
    const thumbDeleteRes = await fetch(dest_thumb, opt);
    const thumbDeleteJson = await thumbDeleteRes.json();
    ret_value.push(thumbDeleteJson);
  }
  return ret_value;
}

export function getVideoPlaybackURL(filename: string) {
  return `http://localhost:4000/api/v1/movie/file/${filename}`;
}

export function getVideoDownloadURL(filename: string) {
  return `http://localhost:4000/api/v1/movie/file/download/${filename}`;
}
