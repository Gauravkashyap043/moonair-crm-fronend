import axios from "axios";
import { environment } from "../constants/environment";
import { Helper } from "./Helper";
export class Api {
  static async callApi(apiParams) {
    let url = apiParams.url;
    if (!apiParams.ignoreBaseUrl) {
      url = environment.baseUrl + url;
    }

    console.log(
      "----------------------------------------------API URL CONSOLE------------------------------------------------",
      url
    );

    console.log(
      "----------------------------------------------API PARAMS CONSOLE------------------------------------------------",
      apiParams
    );

    let axiosInstance = null;

    const configuration = {
      headers: {
        authorization: await Helper.getUserToken(),
      },
    };

    switch (apiParams.requestMethod) {
      case "get":
        axiosInstance = axios.get(url, configuration);
        break;

      case "post":
        axiosInstance = axios.post(url, apiParams.input, configuration);
        break;

      case "put":
        axiosInstance = axios.put(url, apiParams.input, configuration);
        break;

      case "delete":
        axiosInstance = axios.delete(url, configuration, apiParams.input);
        break;

      default:
        axiosInstance = axios.get(url, apiParams.input, configuration);
        break;
    }

    axiosInstance
      .then((response) => {
        console.log(
          "-----------------------------------------------API RESPONSE--------------------------------------------------------------",
          response
        );

        if (apiParams.response && response && response.data) {
          apiParams.response(response.data);
          Api.handleAfterResponse(apiParams, response.data);
        }
      })
      .catch((error) => {
        console.log(
          "-------------------------------------------API ERROR ---------------------------------------------------------------------------",
          error
        );
        if (
          apiParams.errorFunction &&
          error &&
          error.response &&
          error.response.data
        ) {
          apiParams.errorFunction(error.response.data);
          Api.handleError(apiParams, error.response);
        }
      })
      .then(() => {
        if (apiParams.endFunction) {
          apiParams.endFunction();
        }
      });
  }

  static handleAfterResponse(apiParams, response) {
    if (apiParams.hideResponseMsg) {
      return;
    }
    if (response) {
      if (response["message"]) {
        Api.showSuccessMessage(response["message"]);
      }
    }
  }

  static handleError(apiParams, error) {
    if (error) {
      if (error.status === 401) {
        Api.logOut();
        Api.showErrorMessage("Session expired kindly login again.");
        return;
      }
      Api.showErrorMessage(
        error["data"]["message"] ? error["data"]["message"] : error["error"]
      );
      Api.stopLoader();
    }
  }

  static logOut() {
    // Helper.removeLoginData();
  }
}
