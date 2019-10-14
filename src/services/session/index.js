import { AsyncStorage } from "react-native";
import { getApiToken } from "@rest/resources/AuthResource";
import Constants from "@constants";

export default class Session {
  /**
   *  @function getToken
   *
   *  Get the stored session
   *  token.
   */
  static getToken = () => {
    return AsyncStorage.getItem(Constants.TOKEN_STORAGE_KEY);
  };

  /**
   *  @function setToken
   *
   *  Save the session token.
   */
  static setToken = token => {
    return AsyncStorage.setItem(Constants.TOKEN_STORAGE_KEY, token);
  };

  /**
   *  @function refreshToken
   *
   *  Refresh the session token.
   */
  static refreshToken = async () => {
    const response = await getApiToken();
    await AsyncStorage.setItem(
      Constants.TOKEN_STORAGE_KEY,
      response.data.token
    );
    return response.data.token;
  };
}
