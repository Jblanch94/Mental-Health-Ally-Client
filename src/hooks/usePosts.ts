import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import postsAxios from "../axios/postsAxios";
import postService from "../services/PostService";
import { Post } from "../types";

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchPosts = async () => {
      try {
        const response = await postsAxios.get("/?pageNumber=1&pageSize=5", {
          cancelToken: source.token,
        });
        if (response.status >= 200 && response.status < 400) {
          setPosts(response.data.data);
          setPageNumber(parseInt(response.data.pageNumber) + 1);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        } else {
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      source.cancel();
      isMounted = false;
    };
  }, []);

  const loadMorePosts = useCallback(async () => {
    try {
      setRefreshLoading(true);
      const { data, ...rest } = await postService.fetch(pageNumber, 5);
      setPosts((prevState) => [...prevState, ...data]);
      setPageNumber(parseInt(rest.pageNumber) + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshLoading(false);
    }
  }, [pageNumber]);

  return { posts, error, loading, loadMorePosts, refreshLoading };
}

export default usePosts;
