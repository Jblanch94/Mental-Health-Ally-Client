import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";

interface CardProps extends MuiCardProps {}

function Card(props: CardProps): JSX.Element {
  const { children, ...rest } = props;

  return <MuiCard {...rest}>{children}</MuiCard>;
}
