import CardContent from "../../common/mui/CardContent";
import Typography from "../../common/mui/Typography";
import { Comment } from "../../../types";

interface PostListItemProps {
  groupName: string;
  userName: string;
  title: string;
  comments: Comment[];
}

function PostListItem(props: PostListItemProps): JSX.Element {
  const { groupName, userName, title, comments } = props;
  return (
    <CardContent>
      <Typography fontSize={14} gutterBottom>
        {`g/${groupName} - posted by ${userName}`}
      </Typography>
      <Typography variant='h3' fontSize={16} gutterBottom>
        {title}
      </Typography>
      <Typography fontSize={14}>{`${comments.length} ${
        comments.length === 1 ? "comment" : "comments"
      }`}</Typography>
    </CardContent>
  );
}

export default PostListItem;
