import { useEffect, useState } from "react";
import axios from "axios";

import postsAxios from "../axios/postsAxios";

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchPosts = async () => {
      try {
        const response = await postsAxios.get("/", {
          cancelToken: source.token,
        });
        if (response.status >= 200 && response.status < 400) {
          setPosts(response.data.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        } else {
          console.error(err);
        }
      }
    };

    fetchPosts();

    return () => source.cancel();
  }, []);

  return { posts, error };
}

export default usePosts;
