export interface BreadCrumbItem {
  path: string;
  label?: string;
}

export interface IBreadCrumbsStore {
  breadCrumbs: BreadCrumbItem[];
}

export interface BreadCrumbsProps {
  store: IBreadCrumbsStore;
}
