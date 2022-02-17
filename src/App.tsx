import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import CreateGroup from "./pages/CreateGroup";
import Layout from "./components/layout";
import RequireAuth from "./components/features/RequireAuth";
import ServerError from "./pages/500";
import NotFound from "./pages/404";

const App: FunctionComponent<{}> = () => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>

          <Route path='posts'>
            <Route
              path='create'
              element={
                <RequireAuth>
                  <CreatePost />
                </RequireAuth>
              }
            />
          </Route>
          <Route path='groups'>
            <Route
              path='create'
              element={
                <RequireAuth>
                  <CreateGroup />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
        <Route path='/500' element={<ServerError />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
