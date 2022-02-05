import { FieldValues } from "react-hook-form";
import { AxiosRequestHeaders, AxiosResponse } from "axios";

import authAxios from "../axios/authAxios";

class AuthenticationService {
  async login(
    path: string,
    formValues: FieldValues,
    configuration: AxiosRequestHeaders,
    handler: (response: AxiosResponse<any, any>) => void
  ) {
    const response = await authAxios.post(path, formValues, configuration);

    handler(response);
  }

  async signup(
    path: string,
    formValues: FieldValues,
    configuration: AxiosRequestHeaders,
    handler: (response: AxiosResponse<any, any>) => void
  ) {
    const response = await authAxios.post(path, formValues, configuration);

    handler(response);
  }
}

export default new AuthenticationService();
