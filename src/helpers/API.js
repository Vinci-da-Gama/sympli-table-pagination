const rootUrl = "https://swapi.dev/api";

const fetchGet = async (url = "") =>
  await (await fetch(url ? `${url}` : `${rootUrl}/people`)).json();

export { fetchGet };
