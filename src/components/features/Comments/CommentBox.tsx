import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Button from "../../common/mui/Button";
import ErrorText from "../../common/ErrorText";

interface CommentValues {
  text: string;
}

function CommentBox(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentValues>();

  function onSubmit(data: CommentValues) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='text'
        rules={{ required: true }}
        control={control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            aria-label='comment'
            placeholder='Enter Comment'
            multiline
            fullWidth
            size='small'
            type='text'
            error={errors?.text !== undefined}
            helperText={
              errors?.text?.type === "required" && (
                <ErrorText text='Body is required' />
              )
            }
            rows={3}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  component='div'
                  sx={{
                    marginRight: (theme) => theme.spacing(-1),
                    marginBottom: (theme) => theme.spacing(-5),
                  }}>
                  <Button
                    variant='outlined'
                    type='submit'
                    sx={{
                      backgroundColor: (theme) => theme.primary.secondary,
                      color: (theme) => theme.text.white,
                      "&:hover": {
                        backgroundColor: (theme) => theme.primary.secondary,
                        color: (theme) => theme.text.white,
                        opacity: 0.95,
                      },
                    }}>
                    Comment
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        )}></Controller>
    </form>
  );
}

export default CommentBox;
