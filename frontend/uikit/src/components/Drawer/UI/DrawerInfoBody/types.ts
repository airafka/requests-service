import { InfoFieldGroup } from "@/components/InfoBlock/types";

export interface IDrawerInfoBodyStore {
  current?: object | null;
  state: {
    isLoading: boolean;
  };
}

export interface DrawerInfoBodyProps {
  title: string;
  fields: InfoFieldGroup[];
  store: IDrawerInfoBodyStore;
  isLoading?: boolean;
}
