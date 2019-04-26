import RNFetchBlob from 'rn-fetch-blob'
import {get} from "../manager/StorageManager";
import {StorageManagerConstant} from '../constant/StorageManagerConstant'

export const uploadMyPicture = async(data) => {
  return RNFetchBlob.fetch('POST', 'https://api.imgur.com/3/image', {
    'Authorization': 'Bearer ' + await get(StorageManagerConstant.ACCESS_TOKEN),
    'Content-Type' : 'multipart/form-data',
  }, [
    { name : 'image', fileName: 'image.png', type:'image/png', data: data},
  ]);
}
