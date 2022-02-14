import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

import CenterForm from "../components/features/CenterForm";
import Stack from "../components/common/mui/Stack";
import MenuItem from "../components/common/mui/MenuItem";
import InputLabel from "../components/common/mui/InputLabel";
import Select from "../components/common/mui/Select";
import ButtonLoadingState from "../components/features/ButtonLoadingState";
import { SelectChangeEvent } from "@mui/material";
import { Group } from "../types";
import useGroups from "../hooks/useGroups";
import { useAuth } from "../contexts/auth-context";
import postService from "../services/PostService";

// TODO: NEED TO REFACTOR, I ALSO WANT TO MAKE A REUSABLE REQUIRE AUTH COMPONENT TO WRAP COMPONENTS THAT NEED AUTH
//TODO: STILL NEED TO DO TESTING
function CreatePost() {
  const [body, setBody] = useState<string | undefined>("");
  const [groupId, setGroupId] = useState<unknown>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { groups } = useGroups();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data: FieldValues) {
    try {
      setLoading(true);
      const formData = { ...data, body, groupId };
      await postService.create(formData);
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

  function handleChange(event: SelectChangeEvent<unknown>) {
    setGroupId(event.target.value);
  }

  const selectGroups = groups.map((group: Group) => {
    return (
      <MenuItem key={group.id} value={group.id} data-testid='menu-option'>
        {group.name}
      </MenuItem>
    );
  });

  // check authentication status on render and if user is not authenticated then re-direct
  useEffect(() => {
    if (!auth?.authenticated) {
      navigate("/", { replace: true });
    }
  }, [auth?.authenticated, navigate]);

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
          <FormControl
            error={errors?.group !== undefined}
            data-testid='form-control'>
            <InputLabel id='group' htmlFor='group'>
              Group
            </InputLabel>
            <Select
              id='group'
              labelId='group'
              label='Group'
              value={groupId}
              {...register("group", { required: true })}
              onChange={handleChange}>
              {selectGroups}
            </Select>
            <FormHelperText>
              {errors?.group?.type === "required" && (
                <span role='alert'>Group is required</span>
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
