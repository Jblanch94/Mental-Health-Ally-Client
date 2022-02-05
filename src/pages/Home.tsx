import Card from "../components/common/mui/Card";
import CardContent from "../components/common/mui/CardContent";
import Typography from "../components/common/mui/Typography";
import Stack from "../components/common/mui/Stack";
import usePosts from "../hooks/usePosts";
import { Post } from "../types";
import useGroups from "../hooks/useGroups";

function Home() {
  const { posts, error: postsError } = usePosts();
  const { groups, error: groupsError } = useGroups();
  console.log(groups);
  console.log(groupsError);

  const cardPosts = posts.map((post: Post): JSX.Element => {
    return (
      <Card
        key={post.id}
        sx={{
          background: (theme) => theme.primary.main,
          color: (theme) => theme.text.white,
        }}>
        <CardContent>
          <Typography fontSize={14} gutterBottom>
            {`g/${post.group.name} - posted by ${post.user.userName}`}
          </Typography>
          <Typography variant='h3' fontSize={16} gutterBottom>
            {post.title}
          </Typography>
          <Typography fontSize={14}>{`${post.comments.length} ${
            post.comments.length === 1 ? "comment" : "comments"
          }`}</Typography>
        </CardContent>
      </Card>
    );
  });
  return (
    <>
      <h1>All Posts</h1>
      <Stack mx={2} spacing={2} alignItems={{ md: "center" }}>
        {cardPosts}
      </Stack>
    </>
  );
}

export default Home;
