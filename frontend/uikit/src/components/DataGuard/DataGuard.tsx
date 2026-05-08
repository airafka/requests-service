import { LinearProgress } from "@mui/material";
import { DataGuardProps } from "./types";

const DataGuard = <T,>({ whenExist, children }: DataGuardProps<T>) => {
  return whenExist ? children?.(whenExist) : <LinearProgress />;
};

export default DataGuard;

