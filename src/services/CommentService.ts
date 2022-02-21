import { CommentValues } from "../components/features/Comments/CommentBox";
import commentAxios from "../axios/commentAxios";

class CommentService {
  async create(
    formData: CommentValues,
    postId: string | undefined,
    commentId: number | null
  ) {
    const url =
      commentId === null
        ? `/Post/${postId}/Comment`
        : `/Post/${postId}/Comment/${commentId}`;
    const response = await commentAxios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  }
}

export default new CommentService();
