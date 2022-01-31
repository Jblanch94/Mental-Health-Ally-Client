import { useState } from "react";

interface ReturnType {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

function useBoolean(initialValue: boolean = false): ReturnType {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue(!value);
  }

  function setTrue() {
    setValue(true);
  }

  function setFalse() {
    setValue(false);
  }

  return { value, toggle, setTrue, setFalse };
}

export default useBoolean;
