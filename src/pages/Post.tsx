import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { Skeleton } from "@mui/material";

import postsAxios from "../axios/postsAxios";
import { Post as PostType, Comment } from "../types";
import Box from "../components/common/mui/Box";
import Stack from "../components/common/mui/Stack";
import Typography from "../components/common/mui/Typography";
import CommentBox from "../components/features/Comments/CommentBox";
import CommentsList from "../components/features/Comments/CommentsList";
import { useAuth } from "../contexts/auth-context";
import UnAuthCommentBox from "../components/features/Comments/UnAuthCommentBox";
import commentAxios from "../axios/commentAxios";

export interface CommentValues {
  text: string;
}

export enum PostActionType {
  UPDATE_LOADING = "UPDATE_LOADING",
  FETCH_POSTS = "FETCH_POSTS",
  FETCH_COMMENTS = "FETCH_COMMENTS",
  ADD_COMMENT = "ADD_COMMENT",
  ERROR = "ERROR",
}

export interface PostAction {
  type: PostActionType;
  payload?: any;
}

interface State {
  isLoading: boolean;
  isError: boolean;
  data: {
    post: null | PostType;
    comments: Comment[];
  };
}

const initialState: State = {
  isLoading: false,
  isError: false,
  data: {
    post: null,
    comments: [],
  },
};

function reducer(state: State, action: PostAction): State {
  switch (action.type) {
    case PostActionType.UPDATE_LOADING:
      return { ...state, isError: false, isLoading: action.payload };
    case PostActionType.FETCH_POSTS:
      return {
        ...state,
        isError: false,
        data: { ...state.data, post: action.payload },
      };
    case PostActionType.FETCH_COMMENTS:
      return {
        ...state,
        isError: false,
        data: { ...state.data, comments: action.payload },
      };
    case PostActionType.ADD_COMMENT:
      return {
        ...state,
        isError: false,
        data: {
          ...state.data,
          comments: [...state.data.comments, action.payload],
        },
      };
    case PostActionType.ERROR:
      return { ...state, isError: true, data: { post: null, comments: [] } };
    default:
      return state;
  }
}

function Post() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const postSource = axios.CancelToken.source();
    const commentsSource = axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await postsAxios.get(`/${id}`, {
          cancelToken: postSource.token,
        });
        dispatch({
          type: PostActionType.FETCH_POSTS,
          payload: response.data.data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await commentAxios.get(`/Post/${id}`, {
          cancelToken: commentsSource.token,
        });

        dispatch({
          type: PostActionType.FETCH_COMMENTS,
          payload: response.data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPostAndComments = async () => {
      try {
        dispatch({ type: PostActionType.UPDATE_LOADING, payload: true });
        await Promise.all([fetchPost(), fetchComments()]);
      } catch (err) {
        dispatch({ type: PostActionType.ERROR });
        console.error(err);
      } finally {
        dispatch({ type: PostActionType.UPDATE_LOADING, payload: false });
      }
    };

    fetchPostAndComments();

    return () => {
      postSource.cancel();
      commentsSource.cancel();
    };
  }, [id]);

  console.log(state.isLoading);

  return (
    <Stack
      spacing={2}
      mt={10}
      sx={{
        mx: (theme) => theme.spacing(2),
      }}>
      {state.isLoading ? (
        <Skeleton variant='rectangular' height={240} />
      ) : (
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
            <span style={{ fontWeight: "bold" }}>
              {`g/${state.data.post?.group.name}`}
            </span>
            - {`${state.data.post?.user.userName}`}
          </Typography>
          <Typography variant='h1' fontSize={20}>
            {state.data.post?.title}
          </Typography>
          <Box
            sx={{
              background: "#fefefe",
              color: "#333",
              px: (theme) => theme.spacing(1),
              py: (theme) => theme.spacing(1.2),
            }}>
            <MDEditor.Markdown
              source={
                state.data.post && state.data.post.body
                  ? state.data.post.body
                  : ""
              }
              data-testid='md'
            />
          </Box>
          <Typography variant='body1'>
            {state.data.comments?.length}{" "}
            {state.data.comments?.length === 1 ? "comment" : "comments"}
          </Typography>
        </Stack>
      )}

      {/* Comment Box */}
      {state.isLoading ? (
        <Skeleton variant='rectangular' height={120} />
      ) : auth?.authenticated ? (
        <CommentBox dispatch={dispatch} />
      ) : (
        <UnAuthCommentBox />
      )}

      {/* List of all comments */}
      {state.isLoading ? (
        <>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </>
      ) : (
        <CommentsList comments={state.data.comments} />
      )}
    </Stack>
  );
}

export default Post;
