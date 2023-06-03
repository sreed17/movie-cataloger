import apiConfig from "./api-config";

const getApiUrl = () => {
  const c_url = `${apiConfig.baseUrl}/movie`;
  return c_url;
};

export function createMovieEntryFromForm(trg: HTMLFormElement) {
  const fd_movieInfo = new FormData(trg);

  const dest = `${getApiUrl()}/cud`;
  // getting id
  fetch(dest, { method: "get" })
    .then((res) => res.json())
    .then((resJson) => {
      const {
        payload: { id },
      } = resJson;
      if (!id) throw new Error("No id");
      const formData = new FormData();
      formData.append("_id", id);
      for (const [key, val] of fd_movieInfo.entries()) {
        formData.append(key, val);
      }
      fetch(dest, { method: "post", body: formData })
        .then((res) => res.json())
        .then((resJson) => {
          console.log(resJson);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export async function fetchAllMovies() {
  const dest = `${getApiUrl()}/search`;
  const opt: RequestInit = {
    method: "post",
  };
  const res = await fetch(dest, opt);
  return res.json();
}

export function getThumbnail(filename: string, imgElem: HTMLImageElement) {
  const dest = `${getApiUrl()}/thumbnail/${filename}`;
  fetch(dest, { method: "get" })
    .then((res) => res.blob())
    .then((r_blob) => {
      const objURL = URL.createObjectURL(r_blob);
      imgElem.src = objURL;
    })
    .catch((err) => console.log(err));
}

export async function updateMovieInfo(id: string, updates: any) {
  const dest = `${getApiUrl()}/cud/${id}`;
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
  const dest_info = `${getApiUrl()}/cud/${id}`;
  const dest_file = `${getApiUrl()}/file/${fn_file}`;

  const infoDeleteRes = await fetch(dest_info, opt);
  const infoDeleteJson = await infoDeleteRes.json();
  const fileDeleteRes = await fetch(dest_file, opt);
  const fileDeleteJson = await fileDeleteRes.json();

  const ret_value = [infoDeleteJson, fileDeleteJson];

  if (fn_thumb) {
    const dest_thumb = `${getApiUrl()}/thumbnail/${fn_thumb}`;
    const thumbDeleteRes = await fetch(dest_thumb, opt);
    const thumbDeleteJson = await thumbDeleteRes.json();
    ret_value.push(thumbDeleteJson);
  }
  return ret_value;
}

export function getVideoPlaybackURL(filename: string) {
  return `${getApiUrl()}/file/${filename}`;
}

export function getVideoDownloadURL(filename: string) {
  return `${getApiUrl()}/file/download/${filename}`;
}
