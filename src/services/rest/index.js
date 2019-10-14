import axios from "axios";
import tokenProvider from "axios-token-interceptor";
import Constants from "@constants";
import Session from "@session";

export default class RestClient {
  /**
   *  @param {boolean} secured - If the request needs security token.
   */
  constructor(secured) {
    /**
     *  Configure instance values
     */

    this.protocol = Constants.API_PROTOCOL;
    this.domain = Constants.API_DOMAIN;
    this.port = Constants.API_PORT;

    /**
     *  Create the axios instance
     */

    this.instance = axios.create({
      baseURL: `${this.protocol}://${this.domain}:${this.port}`,
      timeout: 60000
    });

    /* ---------------
            INTERCEPTORS
            ------------ */

    if (secured) {
      /**
       *  Use request interceptor to add credentials
       *  to the request.
       */

      this.instance.interceptors.request.use(
        tokenProvider({
          getToken: async () => {
            const token = await Session.getToken();

            if (token) {
              return token;
            }
          }
        })
      );

      /**
       *  Credentials may be out of date, add response
       *  interceptor to perform refresh token flow and
       *  repeat the last request
       */

      this.instance.interceptors.response.use(null, error => {
        const { response } = error;

        if (
          response &&
          response.status === 401 &&
          response.config &&
          !response.config.isRetryRequest
        ) {
          return new Promise(async (resolve, reject) => {
            error.config.isRetryRequest = true;

            // Update Token
            if (error.config && error.config.headers) {
              const token = await Session.refreshToken();

              if (token) {
                resolve(this.instance(error.config));
              } else {
                reject();
              }
            }
          });
        }

        if (
          response &&
          response.status === 401 &&
          response.config &&
          response.config.isRetryRequest
        ) {
          return Promise.reject(
            "There was a problem when trying to refresh the token"
          );
        }

        return Promise.reject(error);
      });
    }
  }

  getInstance() {
    return this.instance;
  }
}
