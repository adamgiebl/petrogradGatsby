import { API } from "../utils/constants";

export const fetchJson = (url) => fetch(url).then((res) => res.json());

export const getImageSrc = (imgName, size) => {
  return `${API.IMAGE_BASE}/${size[0]}/${imgName}${size[1]}.jpg`;
};
