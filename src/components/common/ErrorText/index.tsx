interface ErrorTextProps {
  text: string;
}

function ErrorText(props: ErrorTextProps): JSX.Element {
  const { text } = props;

  return (
    <span role='alert' style={{ color: "red" }}>
      {text}
    </span>
  );
}

export default ErrorText;
