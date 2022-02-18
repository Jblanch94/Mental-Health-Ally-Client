import { FieldValues } from "react-hook-form";

import postsAxios from "../axios/postsAxios";

class PostService {
  async create(formData: FieldValues) {
    const response = await postsAxios.post(
      `/Group/${formData.group}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data.data;
  }

  async fetch(pageNumber: number, pageSize: number) {
    const response = await postsAxios.get(
      `/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    return response.data;
  }
}

export default new PostService();
