import { useState, useEffect } from "react";

function useWindowResize(ref: Element | undefined) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateSizeConstraints = () => {
      setWidth(ref?.clientWidth ?? 0);
      setHeight(ref?.clientHeight ?? 0);
    };

    updateSizeConstraints();
    window.addEventListener("resize", updateSizeConstraints);
    return () => window.removeEventListener("resize", updateSizeConstraints);
  }, [ref?.clientWidth, ref?.clientHeight]);

  return { height, width };
}

export default useWindowResize;
