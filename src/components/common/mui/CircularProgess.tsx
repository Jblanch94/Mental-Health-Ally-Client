import React from "react";
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";

interface CircularProgressProps extends MuiCircularProgressProps {}

function CircularProgress(props: CircularProgressProps): JSX.Element {
  return <MuiCircularProgress {...props} />;
}

export default CircularProgress;
