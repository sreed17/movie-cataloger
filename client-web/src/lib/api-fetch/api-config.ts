//const hostname = window.location.origin.split(":").slice(0, -1).join(":");
//const port = 4000;
const apiRoot = "http://localhost:4000/api/v1";
//const baseUrl = `${hostname}:${port}/${apiRoot}`;
const baseUrl = `${apiRoot}`;

export default {
  baseUrl,
};
