import Button from "../common/mui/Button";
import CircularProgress from "../common/mui/CircularProgess";

interface ButtonLoadingStateProps {
  loading: boolean;
  text: string;
  type: "submit" | "button" | "reset" | undefined;
  color: string;
}

function ButtonLoadingState(props: ButtonLoadingStateProps): JSX.Element {
  const { loading, text, type, color } = props;
  return (
    <Button
      type={type}
      variant='contained'
      sx={{
        backgroundColor: (theme) => theme.primary.main,
        "&:hover": {
          backgroundColor: (theme) => theme.primary.secondary,
        },
      }}>
      {loading ? <CircularProgress sx={{ color: { color } }} /> : text}
    </Button>
  );
}

export default ButtonLoadingState;
