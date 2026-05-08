import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { DrawerTitle } from "../DrawerHeader";
import { PreloaderPage } from "@/components/Preloader";
import { InfoBlock } from "@/components/InfoBlock";
import { type DrawerInfoBodyProps } from "./types";

export const DrawerInfoBody = observer(
    ({ title, fields: fieldsProps, store, isLoading }: DrawerInfoBodyProps) => {
        const fields = fieldsProps.map((group) => ({
            ...group,
            fields: group.fields.map((field) => ({
                ...field,
                isUpdated:
                    field.value !==
                    (store.current as Record<string, unknown> | null | undefined)?.[
                        field.name
                    ],
            })),
        }));

        return (
            <Box>
                <DrawerTitle>{title}</DrawerTitle>
                <PreloaderPage isLoading={Boolean(store.state.isLoading || isLoading)}>
                    {fields.map((group) => (
                        <InfoBlock key={group.name} {...group} />
                    ))}
                </PreloaderPage>
            </Box>
        );
    }
);
