import { FieldValues } from "react-hook-form";

import postsAxios from "../axios/postsAxios";

class PostService {
  async create(formData: FieldValues) {
    const response = await postsAxios.post(
      `/Group/${formData.groupId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );

    return response.data.data;
  }
}

export default new PostService();
