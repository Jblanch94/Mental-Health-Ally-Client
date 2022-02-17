import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import CenterForm from "../components/features/CenterForm";
import Stack from "../components/common/mui/Stack";
import ButtonLoadingState from "../components/features/ButtonLoadingState";
import ErrorText from "../components/common/ErrorText";
import groupService from "../services/GroupService";
import axios from "axios";

export interface GroupValues {
  name: string;
}

function CreateGroup(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupValues>();
  const navigate = useNavigate();

  async function onSubmit(data: GroupValues) {
    try {
      setLoading(true);
      await groupService.createGroup(data);
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setServerError(err.response?.data.message);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <CenterForm headingText='Create Group'>
      {serverError && <span role='alert'>{serverError}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            data-testid='name'
            id='name'
            variant='outlined'
            size='small'
            fullWidth
            label='Name'
            hiddenLabel
            aria-label='name'
            type='text'
            {...register("name", { required: true })}
            error={errors?.name !== undefined}
            helperText={
              errors?.name?.type === "required" && (
                <ErrorText text='Name is required' />
              )
            }
          />
          <ButtonLoadingState
            loading={loading}
            text='Create Group'
            type='submit'
            color='#fff'
          />
        </Stack>
      </form>
    </CenterForm>
  );
}

export default CreateGroup;
