import Card from "../components/common/mui/Card";
import CardContent from "../components/common/mui/CardContent";
import Typography from "../components/common/mui/Typography";
import Stack from "../components/common/mui/Stack";
import usePosts from "../hooks/usePosts";

interface Post {
  id: string;
  body: string;
  createdAt: string;
  title: string;
  updatedAt: string;
}

function Home() {
  const { posts, error } = usePosts();
  console.log("posts", posts);
  console.log("error", error);

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
            g/group - posted by username
          </Typography>
          <Typography variant='h3' fontSize={16} gutterBottom>
            {post.title}
          </Typography>
          <Typography fontSize={14}>256 comments</Typography>
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
