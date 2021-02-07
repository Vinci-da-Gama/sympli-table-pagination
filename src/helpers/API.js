import { ApiUrls } from "../constant";

const fetchGet = async (url = "") =>
  await (
    await fetch(
      url
        ? `${url.replace("http:", "https:")}`
        : `${ApiUrls.rootUrl}/${ApiUrls.segments.people}`
    )
  ).json();

export { fetchGet };
