import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Layout from "./components/layout";

const App: FunctionComponent<{}> = () => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/signup' element={<Signup />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
