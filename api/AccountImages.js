import {httpApi} from "./HttpApi";

export const getAccountImages = async() => {
  return await httpApi.get('/account/me/images');
}
