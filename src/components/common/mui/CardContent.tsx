import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from "@mui/material";

interface CardContentProps extends MuiCardContentProps {}

function CardContent(props: CardContentProps): JSX.Element {
  const { children, ...rest } = props;
  return <MuiCardContent {...rest}>{children}</MuiCardContent>;
}

export default CardContent;
