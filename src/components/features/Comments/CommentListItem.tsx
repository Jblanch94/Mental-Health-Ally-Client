import Typography from "@mui/material/Typography";
import ListItem from "../../common/mui/ListItem";
import ListItemText from "../../common/mui/ListItemText";

import dateFormatter from "../../../utils/date-formatter";

interface CommentListItemProps {
  text: string;
  createdAt: string;
  username: string;
}

// TODO: STILL NEED NESTING COMMENTS AND FUNCTIONALITY TO REPLY TO COMMENTS
function CommentListItem(props: CommentListItemProps): JSX.Element {
  const { text, createdAt, username } = props;

  const createdAtDate = new Date(createdAt);
  const currentDate = dateFormatter.getCurrentTime();
  const timeSinceCreated = dateFormatter.getTimeDifferenceBetweenTwoDates(
    currentDate,
    createdAtDate
  );
  const formattedTimeSinceCreated =
    dateFormatter.formatDateIntoStringDifferenceBetweenTwoDates(
      timeSinceCreated
    );

  return (
    <ListItem alignItems='flex-start' divider>
      <ListItemText
        primary={
          <>
            {username}
            <Typography
              variant='body2'
              color='GrayText'
              component='span'
              sx={{ display: "inline" }}>
              {" "}
              - {formattedTimeSinceCreated}
            </Typography>
            <div>{text}</div>
          </>
        }
      />
    </ListItem>
  );
}

export default CommentListItem;
