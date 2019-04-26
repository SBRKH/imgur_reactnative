import {get} from "../manager/StorageManager";
import {StorageManagerConstant} from '../constant/StorageManagerConstant'

class HttpApi {
  static API_URL = "https://api.imgur.com/3";
  static METHOD_GET = 'GET';
  static METHOD_POST = 'POST';
  static METHOD_PUT = 'PUT';
  static METHOD_DELETE = 'DELETE';

  async send(api, method = HttpApi.METHOD_GET, body = null) {
    const init = {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + await get(StorageManagerConstant.ACCESS_TOKEN)
      })
    };

    if (body != null) {
      if (body instanceof Object)
        init.body = JSON.stringify(body);
      else
        init.body = body;
    }
    const url = HttpApi.API_URL + `${api}`;
    return fetch(url, init)
      .then((response) => response.json())
      .catch((error) => console.error("error: " + error));
  }

  get(api) {
    return this.send(api, HttpApi.METHOD_GET);
  }

  post(api, body) {
    return this.send(api, HttpApi.METHOD_POST, body);
  }

  put(api, body) {
    return this.send(api, HttpApi.METHOD_PUT, body);
  }

  delete(api, body) {
    return this.send(api, HttpApi.METHOD_DELETE, body);
  }
}

export const httpApi = new HttpApi();
