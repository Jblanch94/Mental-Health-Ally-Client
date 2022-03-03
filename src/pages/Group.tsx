import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from "uuid";

import Box from "../components/common/mui/Box";
import Stack from "../components/common/mui/Stack";
import PostsList from "../components/features/Posts/PostsList";
import groupsAxios from "../axios/groupsAxios";
import { Group, Post } from "../types";
import Typography from "../components/common/mui/Typography";

enum ActionType {
  FETCH_POSTS_WITH_GROUP = "FETCH_POSTS_WITH_GROUP",
  ERROR = "ERROR",
  UPDATE_LOADING = "UPDATE_LOADING",
}

interface Action {
  type: ActionType;
  payload?: any;
}

interface State {
  isLoading: boolean;
  data: {
    group: Group;
    posts: Post[];
  };
  isError: boolean;
}

const initialState: State = {
  isLoading: false,
  data: { group: { id: "", name: "" }, posts: [] },
  isError: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.FETCH_POSTS_WITH_GROUP:
      return {
        ...state,
        isError: false,
        data: {
          ...state.data,
          group: { id: action.payload.id, name: action.payload.name },
          posts: action.payload.posts,
        },
      };
    case ActionType.UPDATE_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

function GroupPage() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const postSkeletons = new Array(5).fill(0).map((el) => {
    return <Skeleton variant='rectangular' height={120} key={uuidv4()} />;
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchPostsWithGroup = async () => {
      try {
        dispatch({ type: ActionType.UPDATE_LOADING, payload: true });
        const response = await groupsAxios.get(`/Post/${id}`, {
          cancelToken: source.token,
        });
        dispatch({
          type: ActionType.FETCH_POSTS_WITH_GROUP,
          payload: response.data.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: ActionType.UPDATE_LOADING, payload: false });
      }
    };

    fetchPostsWithGroup();

    return () => source.cancel();
  }, [id]);

  return (
    <Box mt={10} px={2}>
      <Typography variant='h2' textAlign='center'>
        {state.data.group.name}
      </Typography>
      <Stack spacing={2} mt={2}>
        {state.isLoading ? (
          postSkeletons
        ) : (
          <PostsList
            posts={state.data.posts}
            groupName={state.data.group.name}
          />
        )}
      </Stack>
    </Box>
  );
}

export default GroupPage;
