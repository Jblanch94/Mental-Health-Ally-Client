import { FunctionComponent, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Home from "./pages/Home";
import Layout from "./components/layout";
import RequireAuth from "./components/features/RequireAuth";
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Post = lazy(() => import("./pages/Post"));
const Groups = lazy(() => import("./pages/Groups"));
const Group = lazy(() => import("./pages/Group"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const CreateGroup = lazy(() => import("./pages/CreateGroup"));
const ServerError = lazy(() => import("./pages/500"));
const NotFound = lazy(() => import("./pages/404"));

const App: FunctionComponent<{}> = () => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='auth'>
            <Route
              path='login'
              element={
                <Suspense fallback={<CircularProgress />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='signup'
              element={
                <Suspense fallback={<CircularProgress />}>
                  <Signup />
                </Suspense>
              }
            />
          </Route>

          <Route path='posts'>
            <Route
              path='create'
              element={
                <Suspense fallback={<CircularProgress />}>
                  <RequireAuth>
                    <CreatePost />
                  </RequireAuth>
                </Suspense>
              }
            />
            <Route path=':id' element={<Post />} />
          </Route>
          <Route path='groups'>
            <Route
              path='create'
              element={
                <Suspense fallback={<CircularProgress />}>
                  <RequireAuth>
                    <CreateGroup />
                  </RequireAuth>
                </Suspense>
              }
            />
            <Route
              index
              element={
                <Suspense fallback={<CircularProgress />}>
                  <Groups />
                </Suspense>
              }
            />
            <Route
              path=':id'
              element={
                <Suspense fallback={<CircularProgress />}>
                  <Group />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route
          path='/500'
          element={
            <Suspense fallback={<CircularProgress />}>
              <ServerError />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<CircularProgress />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
