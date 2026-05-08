import { t } from "i18next";
import { FC, useCallback } from "react";
import { BlockerFunction, useBlocker } from "react-router-dom";
import { Dialog } from "../Dialog";
import { DialogAction } from "../Dialog/types";

interface RouterPromptProps {
    when: boolean;
    message?: string;
}

export const RouterPrompt: FC<RouterPromptProps> = ({
    when,
    message = t("cancelAction", { ns: "Dialog" }),
}) => {
    const shouldBlock = useCallback<BlockerFunction>(
        ({ currentLocation, nextLocation }) =>
            when &&
            (currentLocation.pathname !== nextLocation.pathname ||
                currentLocation.search !== nextLocation.search),
        [when]
    );

    const blocker = useBlocker(shouldBlock);

    const dialogActions: DialogAction[] = [
        {
            label: t("Action:yes"),
            onClick: () => blocker.proceed?.(),
        },
        {
            label: t("Action:no"),
            onClick: () => blocker.reset?.(),
        },
    ];

    return (
        <Dialog
            title={message || ""}
            open={blocker.state === "blocked"}
            dialogActions={dialogActions}
        />
    );
};
