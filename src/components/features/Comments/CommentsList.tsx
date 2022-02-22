import List from "../../common/mui/List";
import CommentListItem from "./CommentListItem";
import { Comment } from "../../../types";

interface CommentsListProps {
  comments: Comment[];
}

function CommentsList(props: CommentsListProps): JSX.Element {
  const { comments } = props;
  return (
    <List>
      {comments.map((comment) => (
        <CommentListItem
          key={comment.id}
          createdAt={comment.createdAt}
          text={comment.text}
          username={comment.user.userName}
        />
      ))}
    </List>
  );
}

export default CommentsList;
