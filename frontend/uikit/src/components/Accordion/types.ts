import { SxProps, Theme } from "@mui/material";

export interface AccordionProps {
    sx?: SxProps<Theme>;
    title: string;
    children: React.ReactNode;
}
