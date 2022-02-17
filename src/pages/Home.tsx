import { useRef } from "react";
import { Drawer, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Stack from "../components/common/mui/Stack";
import List from "../components/common/mui/List";
import Link from "../components/common/Link";
import usePosts from "../hooks/usePosts";
import useGroups from "../hooks/useGroups";
import useWindowResize from "../hooks/useWindowResize";
import PostsList from "../components/features/Posts/PostsList";
import GroupsList from "../components/features/Groups/GroupsList";

// TODO: IMPLEMENT AN INFINITE LOAD, BUT FIRST I NEED TO IMPLEMENT A CREATE POST PAGE
function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const drawerContainer = ref?.current?.children[0];
  const { posts, error: postsError, loading: postsLoading } = usePosts();
  const { groups, error: groupsError, loading: groupsLoading } = useGroups();
  const { width } = useWindowResize(drawerContainer);
  const navigate = useNavigate();

  if (postsError || groupsError) {
    navigate("/500");
  }

  const postsSkeletonArray = Array(4).fill("");
  const groupsSkeletonArray = Array(5).fill("");
  const postsSkeleton = postsSkeletonArray.map((_, index) => {
    return (
      <Skeleton
        data-testid='post-skeleton'
        key={index}
        variant='rectangular'
        sx={{
          width: {
            xs: `calc(90% - ${width}px)`,
            md: `calc(60% - ${width}px)`,
          },
          height: 110,
        }}
      />
    );
  });

  const groupsSkeleton = groupsSkeletonArray.map((_, index) => {
    return <Skeleton data-testid='group-skeleton' variant='text' key={index} />;
  });

  return (
    <>
      <h1>All Posts</h1>
      <Stack mx={2} spacing={2} alignItems={{ md: "center" }}>
        {postsLoading ? (
          postsSkeleton
        ) : (
          <PostsList posts={posts} width={width} />
        )}
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
          <List>
            {groupsLoading ? groupsSkeleton : <GroupsList groups={groups} />}
          </List>
          <Link
            to='/groups'
            sx={{
              "&:hover": { color: (theme) => theme.text.primary },
              color: (theme) => theme.text.white,
            }}>
            View All Groups
          </Link>
          <Link
            to='/groups/create'
            sx={{
              "&:hover": { color: (theme) => theme.text.primary },
              color: (theme) => theme.text.white,
              mt: (theme) => theme.spacing(2),
            }}>
            Create Group
          </Link>
        </Drawer>
      </aside>
    </>
  );
}

export default Home;
