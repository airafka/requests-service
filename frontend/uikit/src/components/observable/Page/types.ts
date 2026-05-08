import { ReactNode } from "react";

export interface IPageStore {
    pageTitle: string;
}

export interface PageProps {
    children?: ReactNode;
    filterList?: ReactNode;
    headerButtons?: ReactNode;
    footer?: ReactNode;
    noHeaderMargin?: boolean;
    noTitle?: boolean;
    store: IPageStore;
}
