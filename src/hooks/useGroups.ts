import { useEffect, useState } from "react";
import axios from "axios";

import groupsAxios from "../axios/groupsAxios";

function useGroups() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      }
    };

    fetchGroups();

    return () => source.cancel();
  }, []);

  return { groups, error };
}

export default useGroups;
