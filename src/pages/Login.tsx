import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Typography from "../components/common/mui/Typography";
import Box from "../components/common/mui/Box";
import Stack from "../components/common/mui/Stack";
import IconButton from "../components/common/mui/IconButton";
import Button from "../components/common/mui/Button";
import InputAdornment from "../components/common/mui/InputAdornment";
import CircularProgress from "../components/common/mui/CircularProgess";
import useBoolean from "../hooks/useBoolean";
import authenticationService from "../services/AuthenticationService";

function Login(): JSX.Element {
  const { toggle: showPasswordToggle, value: showPassword } = useBoolean(false);
  const {
    value: loading,
    setTrue: setLoadingTrue,
    setFalse: setLoadingFalse,
  } = useBoolean(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  async function onSubmitForm(values: FieldValues) {
    try {
      setLoadingTrue();
      const formValues = {
        userName: values.username,
        password: values.password,
      };
      await authenticationService.login(
        "/Login",
        formValues,
        {},
        (response: AxiosResponse<any, any>) => {
          if (response.status >= 200 && response.status < 400) {
            setServerError(null);
            sessionStorage.setItem("accessToken", response.data.data);
            navigate("/", { replace: true });
          }
        }
      );
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      const err = error as AxiosError;
      if (err.response) {
        setServerError("Invalid Credentials!");
      } else {
        console.error(error);
      }
    } finally {
      setLoadingFalse();
    }
  }

  useEffect(() => {
    if (accessToken != null) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

  return (
    <Box
      id='login-form'
      component='section'
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.7)",
          borderRadius: (theme) => theme.spacing(0.5),
          px: (theme) => theme.spacing(2),
          mx: (theme) => theme.spacing(2),
          width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
        }}>
        <Stack spacing={2} py={2}>
          <Typography
            variant='h2'
            textAlign='center'
            sx={{ fontSize: { xs: 28, sm: 36 } }}>
            Login with Mental Health Ally
          </Typography>
          {serverError && (
            <span
              style={{ textAlign: "center", color: "red", fontSize: "24px" }}>
              {serverError}
            </span>
          )}

          <form
            onSubmit={handleSubmit(onSubmitForm)}
            name='login form'
            aria-label='login form'>
            <Stack spacing={2}>
              <TextField
                id='Username'
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
                  errors?.username?.type === "required" &&
                  "Username is required"
                }
              />

              <TextField
                id='Password'
                variant='outlined'
                size='small'
                fullWidth
                label='Password'
                hiddenLabel
                aria-label='Password'
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={showPasswordToggle}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("password", { required: true })}
                error={errors?.password !== undefined}
                helperText={
                  errors?.password?.type === "required" &&
                  "Password is required"
                }
              />

              <Button
                variant='contained'
                type='submit'
                sx={{
                  backgroundColor: (theme) => theme.primary.main,
                  "&:hover": {
                    backgroundColor: (theme) => theme.primary.secondary,
                  },
                }}>
                {loading ? (
                  <CircularProgress
                    sx={{ color: (theme) => theme.text.white }}
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
