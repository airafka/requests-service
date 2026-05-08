import { ReactNode } from "react";

export interface InfoFieldItem {
  name: string;
  value?: number | string | ReactNode | null;
  label?: string;
  isUpdated?: boolean;
  tooltypeLabel?: string;
}

export interface InfoFieldGroup {
  name?: string;
  fields: InfoFieldItem[];
}

export interface IInfoBlock extends InfoFieldGroup {}
