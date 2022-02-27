import { Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Button from "../../common/mui/Button";
import ErrorText from "../../common/ErrorText";
import commentService from "../../../services/CommentService";
import { PostAction, PostActionType } from "../../../pages/Post";

export interface CommentValues {
  text: string;
}

interface CommentBoxProps {
  dispatch: Dispatch<PostAction>;
}

function CommentBox(props: CommentBoxProps): JSX.Element {
  const { dispatch } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentValues>();
  const { id } = useParams();

  async function onSubmit(data: CommentValues) {
    try {
      const response = await commentService.create(data, id, null);
      reset({ text: "" });
      dispatch({ type: PostActionType.ADD_COMMENT, payload: response });
    } catch (err) {
      console.error(err);
    }
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
