import { useRef } from "react";
import { Drawer } from "@mui/material";

import Card from "../components/common/mui/Card";
import CardContent from "../components/common/mui/CardContent";
import Typography from "../components/common/mui/Typography";
import Stack from "../components/common/mui/Stack";
import List from "../components/common/mui/List";
import ListItem from "../components/common/mui/ListItem";
import ListItemText from "../components/common/mui/ListItemText";
import usePosts from "../hooks/usePosts";
import { Post } from "../types";
import useGroups from "../hooks/useGroups";
import useWindowResize from "../hooks/useWindowResize";

function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { posts, error: postsError } = usePosts();
  const { groups, error: groupsError } = useGroups();

  const drawerContainer = ref?.current?.children[0];
  const { width } = useWindowResize(drawerContainer);

  const cardPosts = posts.map((post: Post): JSX.Element => {
    return (
      <Card
        key={post.id}
        sx={{
          background: (theme) => theme.primary.main,
          color: (theme) => theme.text.white,
          width: {
            xs: `calc(100% - ${width}px)`,
            md: `calc(75% - ${width}px)`,
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
    );
  });
  return (
    <>
      <h1>All Posts</h1>
      <Stack mx={2} spacing={2} alignItems={{ md: "center" }}>
        {cardPosts}
      </Stack>

      <Drawer
        variant='permanent'
        anchor='right'
        ref={ref}
        sx={{
          width: { xs: "min-content", md: "fit-content" },
          flexShrink: 0,
          borderRadius: (theme) => theme.spacing(2),
          [`& .MuiDrawer-paper`]: {
            width: { xs: "min-content", md: "fit-content" },
            boxSizing: "border-box",
            px: (theme) => theme.spacing(2),
            height: "min-content",
            borderRadius: 1,
            top: "15%",
          },
        }}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Home;
