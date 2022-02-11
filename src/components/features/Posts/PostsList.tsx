import Card from "../../common/mui/Card";
import PostListItem from "./PostListItem";
import { Post } from "../../../types";

interface PostsListProps {
  posts: Post[];
  width: number;
}

function PostsList(props: PostsListProps): JSX.Element {
  const { posts, width } = props;
  const cardPosts = posts.map((post: Post): JSX.Element => {
    return (
      <Card
        role='article'
        key={post.id}
        sx={{
          background: (theme) => theme.primary.main,
          color: (theme) => theme.text.white,
          width: {
            xs: `calc(90% - ${width}px)`,
            md: `calc(60% - ${width}px)`,
          },
        }}>
        <PostListItem
          groupName={post.group.name}
          userName={post.user.userName}
          title={post.title}
          comments={post.comments}
        />
      </Card>
    );
  });

  return <>{cardPosts}</>;
}

export default PostsList;
