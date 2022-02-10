import { useRef } from "react";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/mui/Card";
import CardContent from "../components/common/mui/CardContent";
import Typography from "../components/common/mui/Typography";
import Stack from "../components/common/mui/Stack";
import List from "../components/common/mui/List";
import ListItem from "../components/common/mui/ListItem";
import ListItemText from "../components/common/mui/ListItemText";
import Link from "../components/common/Link";
import usePosts from "../hooks/usePosts";
import { Post, Group } from "../types";
import useGroups from "../hooks/useGroups";
import useWindowResize from "../hooks/useWindowResize";

function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const drawerContainer = ref?.current?.children[0];
  const { posts, error: postsError } = usePosts();
  const { groups, error: groupsError } = useGroups();
  const { width } = useWindowResize(drawerContainer);
  const navigate = useNavigate();

  if (postsError || groupsError) {
    navigate("/500");
  }

  const cardPosts = posts.map((post: Post): JSX.Element => {
    return (
      <article id='card' key={post.id}>
        <Card
          sx={{
            background: (theme) => theme.primary.main,
            color: (theme) => theme.text.white,
            width: {
              xs: `calc(90% - ${width}px)`,
              md: `calc(60% - ${width}px)`,
            },
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
      </article>
    );
  });

  const groupsList = groups.map((group: Group) => {
    return (
      <ListItem key={group.id}>
        <Link
          to={`/groups/${group.id}`}
          sx={{
            "&:hover": { color: (theme) => theme.text.primary },
            color: (theme) => theme.text.white,
          }}>
          <ListItemText primary={group.name} />
        </Link>
      </ListItem>
    );
  });

  return (
    <>
      <h1>All Posts</h1>
      <Stack mx={2} spacing={2} alignItems={{ md: "center" }}>
        {cardPosts}
      </Stack>

      <aside>
        <Drawer
          variant='permanent'
          anchor='right'
          ref={ref}
          sx={{
            width: { xs: "min-content", md: "fit-content" },
            flexShrink: 0,
            borderRadius: (theme) => theme.spacing(2),
            [`& .MuiDrawer-paper`]: {
              width: { xs: "fit-content", md: "fit-content" },
              boxSizing: "border-box",
              px: (theme) => theme.spacing(2),
              height: "min-content",
              borderTopLeftRadius: (theme) => theme.spacing(0.5),
              borderBottomLeftRadius: (theme) => theme.spacing(0.5),
              top: "15%",
              pb: (theme) => theme.spacing(2),
              backgroundColor: (theme) => theme.primary.main,
              color: (theme) => theme.text.white,
            },
          }}>
          <List>{groupsList}</List>
          <Link
            to='/groups'
            sx={{
              "&:hover": { color: (theme) => theme.text.primary },
              color: (theme) => theme.text.white,
            }}>
            View All Groups
          </Link>
        </Drawer>
      </aside>
    </>
  );
}

export default Home;
