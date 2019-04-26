import AsyncStorage from '@react-native-community/async-storage';

export const getStorage = async () => {
  return await AsyncStorage.getAllKeys();
}

export const store = async(key, item) => {
  return await AsyncStorage.setItem(key, item);
}

export const deleteItem = async(key) => {
  return await AsyncStorage.removeItem(key);
}

export const get = async(key) => {
  return await AsyncStorage.getItem(key);
}

export const update = async(key, item) => {
  return await AsyncStorage.mergeItem(key, item);
}
