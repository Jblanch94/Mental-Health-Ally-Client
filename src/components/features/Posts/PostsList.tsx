import Card from "../../common/mui/Card";
import Link from "../../common/Link";
import NoData from "../../common/NoData";
import PostListItem from "./PostListItem";
import { Post } from "../../../types";

interface PostsListProps {
  posts: Post[];
  width?: number;
  groupName?: string;
}

function PostsList(props: PostsListProps): JSX.Element {
  const { posts, width, groupName } = props;

  if (posts.length === 0) {
    return <NoData />;
  }

  const cardPosts = posts.map((post: Post): JSX.Element => {
    return (
      <Card
        role='article'
        key={post.id}
        sx={{
          backgroundColor: (theme) => theme.primary.main,
          width:
            width === undefined
              ? "auto"
              : {
                  xs: `calc(90% - ${width}px)`,
                  md: `calc(60% - ${width}px)`,
                },
        }}>
        <Link
          to={`/posts/${post.id}`}
          sx={{ color: (theme) => theme.text.white }}>
          <PostListItem
            groupName={groupName === undefined ? post.group.name : groupName}
            userName={post.user.userName}
            title={post.title}
            comments={post.comments}
          />
        </Link>
      </Card>
    );
  });

  return <>{cardPosts}</>;
}

export default PostsList;
