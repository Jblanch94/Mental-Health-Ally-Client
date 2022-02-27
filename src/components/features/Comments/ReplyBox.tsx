import TextField from "@mui/material/TextField";

function ReplyBox() {
  return (
    <TextField
      label='Reply'
      hiddenLabel
      aria-label='reply'
      placeholder='What are your thoughts?'
    />
  );
}

export default ReplyBox;
