import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import ButtonLink from "../../common/ButtonLink";
import Stack from "../../common/mui/Stack";

function UnAuthCommentBox() {
  return (
    <TextField
      label='Login or Sign Up to leave a comment'
      hiddenLabel
      sx={{
        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
          textAlign: "center",
          fontSize: 2,
        },

        "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
          top: 28,
          bottom: 0,
        },
      }}
      size='medium'
      aria-label='comment'
      multiline
      rows={4}
      margin='dense'
      name='comment'
      disabled
      InputProps={{
        inputProps: {
          style: { textAlign: "justify" },
        },
        endAdornment: (
          <InputAdornment position='end'>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <ButtonLink
                to='/auth/login'
                sx={{
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}>
                Login
              </ButtonLink>
              <ButtonLink
                to='/auth/signup'
                sx={{
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}>
                Sign Up
              </ButtonLink>
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UnAuthCommentBox;
