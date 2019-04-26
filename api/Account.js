import {httpApi} from "./HttpApi";

export const getAccount = async(username) => {
  return await httpApi.get(`/account/${username}`);
}
