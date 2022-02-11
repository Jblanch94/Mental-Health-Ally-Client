import postsAxios from "../axios/postsAxios";

class PostService {
  async fetchPosts() {
    const response = await postsAxios.get("/");
    if (response.status >= 400) {
      throw new Error("Error");
    }

    return response.data.data;
  }
}

export default new PostService();
