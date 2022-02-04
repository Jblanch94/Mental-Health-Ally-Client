import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

import CenterForm from "../components/features/CenterForm";
import Stack from "../components/common/mui/Stack";
import InputAdornment from "../components/common/mui/InputAdornment";
import IconButton from "../components/common/mui/IconButton";
import ButtonLoadingState from "../components/features/ButtonLoadingState";
import Link from "../components/common/Link";
import useBoolean from "../hooks/useBoolean";
import authAxios from "../axios/authAxios";

function Signup() {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    value: loading,
    setTrue: setLoadingTrue,
    setFalse: setLoadingFalse,
  } = useBoolean(false);

  const { value: showPassword, toggle: togglePasswordVisibility } =
    useBoolean(false);

  const accessToken = sessionStorage.getItem("accessToken");

  async function onSubmit(data: FieldValues) {
    try {
      setLoadingTrue();
      const formValues = {
        userName: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await authAxios.post("/Register", formValues);
      if (response.status >= 200 && response.status < 400) {
        setServerError(null);
        sessionStorage.setItem("accessToken", response.data.data);
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setServerError(err.response?.data.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoadingFalse();
    }
  }

  function generateEmailHelperText(type: string): string | null {
    if (type === "required") return "Email is required";
    if (type === "pattern") return "Invalid email";
    return null;
  }

  if (accessToken !== null) {
    return <Navigate to='/' replace />;
  }

  return (
    <CenterForm headingText='Sign Up with Mental Health Ally'>
      {serverError && (
        <span
          role='alert'
          style={{ color: "red", fontSize: "1.5rem", textAlign: "center" }}>
          {serverError}
        </span>
      )}
      <form
        name='signup form'
        aria-label='signup form'
        onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            id='username'
            variant='outlined'
            size='small'
            fullWidth
            label='Username'
            hiddenLabel
            aria-label='Username'
            type='text'
            {...register("username", { required: true })}
            error={errors?.username !== undefined}
            helperText={
              errors?.username?.type === "required" && "Username is required"
            }
          />
          <TextField
            id='email'
            variant='outlined'
            size='small'
            fullWidth
            label='Email'
            hiddenLabel
            aria-label='Email'
            type='email'
            {...register("email", {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            })}
            error={errors?.email !== undefined}
            helperText={generateEmailHelperText(errors?.email?.type)}
          />
          <TextField
            id='password'
            variant='outlined'
            size='small'
            fullWidth
            label='Password'
            hiddenLabel
            aria-label='Password'
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    aria-label='toggle password visibility'
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={errors?.password !== undefined}
            helperText={
              errors?.password?.type === "required" && "Password is required"
            }
          />
          <ButtonLoadingState
            text='Sign up'
            loading={loading}
            type='submit'
            color='#fff'
          />
        </Stack>
      </form>
      <span>
        Already have an account?{" "}
        <Link
          to='/auth/login'
          sx={{
            color: (theme) => theme.primary.main,
            "&:hover": {
              opacity: 0.6,
            },
          }}>
          Login
        </Link>
      </span>
    </CenterForm>
  );
}

export default Signup;
