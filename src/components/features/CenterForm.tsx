import { ReactNode } from "react";
import Box from "../common/mui/Box";
import Stack from "../common/mui/Stack";
import Typography from "../common/mui/Typography";

interface CenterFormProps {
  children: ReactNode[] | ReactNode;
  headingText: string;
}

function CenterForm(props: CenterFormProps): JSX.Element {
  const { children, headingText } = props;
  return (
    <Box
      component='section'
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.7)",
          borderRadius: (theme) => theme.spacing(0.5),
          px: (theme) => theme.spacing(2),
          mx: (theme) => theme.spacing(2),
          width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
        }}>
        <Stack spacing={2} py={2}>
          <Typography
            variant='h2'
            textAlign='center'
            sx={{ fontSize: { xs: 28, sm: 36 } }}>
            {headingText}
          </Typography>
          {children}
        </Stack>
      </Box>
    </Box>
  );
}

export default CenterForm;
