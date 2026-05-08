import { IPageStore } from "../Page";

export interface ErrorPageProps {
  code?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  action?: React.ReactNode;
  store: IPageStore;
}
