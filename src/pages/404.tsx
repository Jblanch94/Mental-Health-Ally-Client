import Box from "../components/common/mui/Box";
import PageNotFoundImage from "../assets/images/page_not_found.svg";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        px: (theme) => theme.spacing(1.2),
      }}
      justifyContent='center'
      alignItems='center'>
      <img
        alt='404 - Not Found'
        src={PageNotFoundImage}
        loading='lazy'
        width={220}
        height={220}
      />
    </Box>
  );
}

export default NotFound;
