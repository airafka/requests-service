export interface DialogAction {
    label: string;
    onClick: () => void;
    type?: "submit" | "reset" | "button";
    form?: string;
    loading?: boolean;
    disabled?: boolean;
}
