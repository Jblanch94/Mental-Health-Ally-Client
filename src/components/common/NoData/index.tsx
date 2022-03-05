import Box from "../mui/Box";
import Typography from "../mui/Typography";
import NoDataImage from "../../../assets/images/no_data.svg";

function NoData(): JSX.Element {
  return (
    <Box
      alignItems='center'
      flexDirection='column'
      sx={{ display: "flex", marginTop: (theme) => theme.spacing(2) }}>
      <img
        src={NoDataImage}
        alt='No Data'
        loading='lazy'
        width={164}
        height={164}
        style={{ objectFit: "contain" }}
      />
      <Typography
        variant='h3'
        sx={{ marginTop: (theme) => theme.spacing(1.5) }}>
        No Data
      </Typography>
    </Box>
  );
}

export default NoData;
