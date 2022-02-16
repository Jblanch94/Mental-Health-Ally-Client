import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";

import CenterForm from "../components/features/CenterForm";
import Stack from "../components/common/mui/Stack";
import MenuItem from "../components/common/mui/MenuItem";
import InputLabel from "../components/common/mui/InputLabel";
import Select from "../components/common/mui/Select";
import ButtonLoadingState from "../components/features/ButtonLoadingState";
import { Group } from "../types";
import useGroups from "../hooks/useGroups";
import postService from "../services/PostService";

// TODO: NEED TO REFACTOR, I ALSO WANT TO MAKE A REUSABLE REQUIRE AUTH COMPONENT TO WRAP COMPONENTS THAT NEED AUTH
function CreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { groups } = useGroups();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data: FieldValues) {
    try {
      setLoading(true);
      await postService.create(data);
      setError(null);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  const selectGroups = groups.map((group: Group) => {
    return (
      <MenuItem key={group.id} value={group.id} data-testid='menu-option'>
        {group.name}
      </MenuItem>
    );
  });

  return (
    <CenterForm headingText='Create Post'>
      {error && <span role='alert'>{error}</span>}
      <form name='create-post' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            data-testid='title'
            id='title'
            variant='outlined'
            size='small'
            fullWidth
            label='Title'
            hiddenLabel
            aria-label='Title'
            type='text'
            {...register("title", { required: true })}
            error={errors?.title !== undefined}
            helperText={
              errors?.title?.type === "required" && (
                <span role='alert'>Title is required</span>
              )
            }
          />
          <FormControl error={errors?.body !== undefined}>
            <Controller
              control={control}
              name='body'
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <MDEditor
                  value={value}
                  ref={ref}
                  visiableDragbar={false}
                  preview='edit'
                  onChange={onChange}
                  onBlur={onBlur}
                  maxHeight={200}
                  id='body'
                  data-testid='body'
                  style={{
                    border:
                      errors?.body !== undefined ? "1px solid red" : "inheirt",
                  }}
                />
              )}
            />
            <FormHelperText>
              {errors?.body?.type === "required" && (
                <span role='alert' style={{ color: "red" }}>
                  Body is required
                </span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={errors?.group !== undefined}
            data-testid='form-control'>
            <InputLabel id='group' htmlFor='group'>
              Group
            </InputLabel>
            <Controller
              control={control}
              name='group'
              rules={{ required: true }}
              defaultValue=''
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  id='group'
                  labelId='group'
                  label='Group'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  inputRef={ref}>
                  {selectGroups}
                </Select>
              )}
            />

            <FormHelperText>
              {errors?.group?.type === "required" && (
                <span role='alert' style={{ color: "red" }}>
                  Group is required
                </span>
              )}
            </FormHelperText>
          </FormControl>
          <ButtonLoadingState
            text='Create Post'
            type='submit'
            color='#fff'
            loading={loading}
          />
        </Stack>
      </form>
    </CenterForm>
  );
}

export default CreatePost;
