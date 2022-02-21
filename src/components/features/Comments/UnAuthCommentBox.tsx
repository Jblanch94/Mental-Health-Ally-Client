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
        },

        "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
          top: 32,
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <ButtonLink to='/auth/login'>Login</ButtonLink>
              <ButtonLink to='/auth/signup'>Sign Up</ButtonLink>
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UnAuthCommentBox;
