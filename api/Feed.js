import {httpApi} from "./HttpApi";

export const getImageFromString = async(searchedText, page, period) => {
  return await httpApi.get(`/gallery/search/time/${period}/${page}?q=${searchedText}`);
}

export const getFeed = async(period, page) => {
  return await httpApi.get(`/gallery/top/top/${period}/${page}?showViral=true&mature=true&album_previews=true'`);
}
