import {httpApi} from "./HttpApi";

export const getFavorites = async() => {
  return await httpApi.get('/account/me/favorites');
}

export const setFavorite = async(imageHash) => {
  return await httpApi.post(`/image/${imageHash}/favorite`, null);
}
