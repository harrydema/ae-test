import RestClient from "@rest";
import Constants from "@constants";

function getApiToken() {
  return new RestClient(false).getInstance().post("/auth", {
    apiKey: Constants.API_KEY
  });
}

export { getApiToken };
