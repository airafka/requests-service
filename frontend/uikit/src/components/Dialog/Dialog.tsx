import {
    Box,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
} from "@mui/material";
import { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { FC, ReactElement } from "react";
import { BaseButton } from "../Button";
import { CloseButton } from "../CloseButton";
import { useStyles } from "./styles";
import { DialogAction } from "./types";

export interface CustomDialogProps {
    open: boolean;
    title?: ReactElement | string;
    onClose?: () => void;
    contentText?: string;
    content?: ReactElement;
    dialogActions?: DialogAction[];
    dialogButtons?: JSX.Element[];
    settings?: Partial<MuiDialogProps>;
    selectValues?: string[];
    selectLabel?: string;
    width?: number;
    height?: number;
}

export const Dialog: FC<CustomDialogProps> = (props) => {
    const {
        open,
        title,
        contentText,
        content,
        dialogActions = [],
        dialogButtons = [],
        settings,
        onClose,
        width,
        height,
    } = props;
    const defaultSetting: Partial<MuiDialogProps> = { fullWidth: true, ...settings };
    const theme = useTheme();
    const classes = useStyles({ theme, width, height });

    const renderActions = (action: DialogAction) => {
        return (
            <BaseButton key={action.label} onClick={action.onClick}>
                {action.label}
            </BaseButton>
        );
    };

    return (
        <MuiDialog
            {...defaultSetting}
            open={open}
            data-key-id="dialog"
            className={classes.modalWindow}>
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <Box>
                        {title && (
                            <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
                        )}
                    </Box>
                    {onClose && <CloseButton onClick={onClose} top={16} right={16} />}
                </Box>

                {contentText && (
                    <DialogContentText className={classes.textContent}>
                        {contentText}
                    </DialogContentText>
                )}

                {content && <DialogContent>{content}</DialogContent>}

                {dialogActions && dialogActions.length > 0 && (
                    <DialogActions className={classes.dialogButtons}>
                        {[...dialogActions].reverse().map(renderActions)}
                    </DialogActions>
                )}
                {dialogButtons && dialogButtons.length > 0 && (
                    <DialogActions>{dialogButtons}</DialogActions>
                )}
            </Box>
        </MuiDialog>
    );
};
