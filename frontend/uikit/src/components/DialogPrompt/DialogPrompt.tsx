import { t } from "i18next";
import { Trans } from "react-i18next";
import {
    ForwardedRef,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import { Dialog } from "../Dialog";
import { DialogAction } from "../Dialog/types";
import type { ReactElement } from "react";

interface DialogPromptProps {
    onProceed: () => void;
    onReset?: () => void;
    title?: string | ReactElement;
    actions?:
        | DialogAction[]
        | ((ctx: {
              close: () => void;
              onProceed: () => void;
              onReset?: () => void;
          }) => DialogAction[]);
    settings?: Partial<MuiDialogProps>;
    width?: number;
    height?: number;
}

export type ShowPromptHandle = {
    show: (action?: string) => void;
};

const DialogPromptComponent = (
    { onProceed, onReset, actions, settings, width, height, title }: DialogPromptProps,
    ref: ForwardedRef<ShowPromptHandle>
) => {
    const [promptProps, setPromptProps] = useState<{
        action?: string;
        isOpen: boolean;
    }>({ isOpen: false });

    const close = useCallback(() => setPromptProps({ isOpen: false }), []);

    const defaultActions: DialogAction[] = useMemo(
        () => [
            {
                label: t("Action:yes"),
                onClick: () => {
                    onProceed();
                    close();
                },
            },
            {
                label: t("Action:no"),
                onClick: () => {
                    onReset?.();
                    close();
                },
            },
        ],
        [onProceed, onReset, close]
    );

    const dialogActions: DialogAction[] = useMemo(() => {
        if (!actions) {
            return defaultActions;
        }

        if (typeof actions === "function") {
            return actions({ close, onProceed, onReset });
        }

        return actions.map((a) => ({
            ...a,
            onClick: () => {
                a.onClick?.();
                close();
            },
        }));
    }, [actions, defaultActions, close, onProceed, onReset]);

    useImperativeHandle(
        ref,
        () => ({ show: (action?: string) => setPromptProps({ isOpen: true, action }) }),
        []
    );

    return (
        <Dialog
            title={
                title ? (
                    title
                ) : promptProps.action ? (
                    <Trans
                        i18nKey={promptProps.action}
                        ns="Dialog"
                        components={[<br key="br" />]}
                    />
                ) : (
                    ""
                )
            }
            open={promptProps.isOpen}
            dialogActions={dialogActions}
            onClose={() => {
                onReset?.();
                close();
            }}
            settings={settings}
            width={width}
            height={height}
        />
    );
};

export const DialogPrompt = forwardRef(DialogPromptComponent);
