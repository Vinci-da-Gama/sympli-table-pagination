const rootUrl = "https://swapi.dev/api";

const fetchGet = async (url = "") =>
  await (
    await fetch(url ? `${url.replace("http:", "https:")}` : `${rootUrl}/people`)
  ).json();

export { fetchGet };
