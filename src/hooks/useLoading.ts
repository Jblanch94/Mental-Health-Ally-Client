import useBoolean from "./useBoolean";

function useLoading(fn: () => Promise<any>) {
  const { value: loading, setFalse } = useBoolean(true);

  const execute = async () => {
    try {
      const data = await fn();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setFalse();
    }
  };

  return { execute, loading };
}

export default useLoading;
