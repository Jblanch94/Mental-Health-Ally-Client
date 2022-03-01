import { Fragment, useEffect, useReducer } from "react";
import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import GroupList from "../components/features/Group/GroupList";
import Typography from "../components/common/mui/Typography";
import Box from "../components/common/mui/Box";
import groupsAxios from "../axios/groupsAxios";
import { Group } from "../types";

interface State {
  isLoading: boolean;
  groups: Group[];
  isError: boolean;
}

enum ActionType {
  FETCH_GROUPS = "FETCH_GROUPS",
  UPDATE_LOADING = "UPDATE_LOADING",
  ERROR = "ERROR",
}

interface Action {
  type: ActionType;
  payload?: any;
}

const initialState: State = {
  isLoading: false,
  groups: [],
  isError: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.UPDATE_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionType.FETCH_GROUPS:
      return { ...state, isError: false, groups: action.payload };
    case ActionType.ERROR:
      return { ...state, isError: true, groups: [] };
    default:
      return state;
  }
}

function Groups() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const groupLinkSkeletons = new Array(10).fill(0).map((el) => {
    return <Skeleton width='100%' height={40} variant='text' key={uuidv4()} />;
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchGroups = async () => {
      try {
        dispatch({ type: ActionType.UPDATE_LOADING, payload: true });
        const response = await groupsAxios.get("/", {
          cancelToken: source.token,
        });
        dispatch({
          type: ActionType.FETCH_GROUPS,
          payload: response.data.data,
        });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: ActionType.UPDATE_LOADING, payload: false });
      }
    };

    fetchGroups();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <Box mt={10} px={2}>
        <Typography variant='h2' textAlign='center'>
          All Groups
        </Typography>
        {state.isLoading ? (
          groupLinkSkeletons
        ) : (
          <GroupList groups={state.groups} />
        )}
      </Box>
    </>
  );
}

export default Groups;
