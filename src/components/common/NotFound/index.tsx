import Box from "../mui/Box";
import Typography from "../mui/Typography";
import NotFoundImage from "../../../assets/images/not_found.svg";

function NotFound() {
  return (
    <Box
      sx={{ display: "flex", marginTop: (theme) => theme.spacing(8) }}
      flexDirection='column'
      alignItems='center'>
      <img
        src={NotFoundImage}
        alt='NotFound'
        loading='lazy'
        width={182}
        height={182}
      />
      <Typography variant='h3'>Not Found</Typography>
    </Box>
  );
}

export default NotFound;
