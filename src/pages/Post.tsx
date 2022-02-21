import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

import postsAxios from "../axios/postsAxios";
import { Post as PostType } from "../types";
import Box from "../components/common/mui/Box";
import Stack from "../components/common/mui/Stack";
import Typography from "../components/common/mui/Typography";
import CommentBox from "../components/features/Comments/CommentBox";
import { useAuth } from "../contexts/auth-context";
import UnAuthCommentBox from "../components/features/Comments/UnAuthCommentBox";
import commentAxios from "../axios/commentAxios";

export interface CommentValues {
  text: string;
}

function Post() {
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await postsAxios.get(`/${id}`, {
          cancelToken: source.token,
        });
        setPost(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await commentAxios.get(`/Post/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    Promise.all([fetchPost(), fetchComments()]);

    return () => source.cancel();
  }, [id]);

  return (
    <Stack
      spacing={2}
      mt={10}
      sx={{
        mx: (theme) => theme.spacing(2),
      }}>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: (theme) => theme.primary.main,
          color: (theme) => theme.text.white,
          px: (theme) => theme.spacing(1.5),
          py: (theme) => theme.spacing(2),
          borderRadius: 2,
        }}>
        <Typography variant='subtitle1'>
          <span
            style={{
              fontWeight: "bold",
            }}>{`g/${post?.group.name}`}</span>{" "}
          - {`${post?.user.userName}`}
        </Typography>
        <Typography variant='h1' fontSize={20}>
          {post?.title}
        </Typography>
        <Box
          sx={{
            background: "#fefefe",
            color: "#333",
            px: (theme) => theme.spacing(1),
            py: (theme) => theme.spacing(1.2),
          }}>
          <MDEditor.Markdown source={post?.body} />
        </Box>
        <Typography variant='body1'>
          {post?.comments.length}{" "}
          {post?.comments.length === 1 ? "comment" : "comments"}
        </Typography>
      </Stack>

      {/* Comment Box */}
      {auth?.authenticated ? <CommentBox /> : <UnAuthCommentBox />}

      {/* List of all comments */}
    </Stack>
  );
}

export default Post;
