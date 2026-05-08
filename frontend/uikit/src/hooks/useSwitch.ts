import { useState } from "react";

export const useSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn((prevIsOn) => !prevIsOn);
  const on = () => setIsOn(true);
  const off = () => setIsOn(false);

  return { isOn, toggle, on, off };
};
