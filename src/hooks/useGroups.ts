import { useEffect, useState } from "react";
import axios from "axios";

import groupsAxios from "../axios/groupsAxios";

function useGroups() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const fetchGroups = async () => {
      try {
        const response = await groupsAxios.get("/", {
          cancelToken: source.token,
        });
        if (response.status >= 200 && response.status < 400) {
          setGroups(response.data.data);
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

    fetchGroups();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, []);

  return { groups, error, loading };
}

export default useGroups;
