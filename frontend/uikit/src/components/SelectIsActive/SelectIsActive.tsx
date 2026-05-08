import { Select } from "../DropDown/Select";
import { Genders } from "../../types";

export const OPTIONS_IS_ACTIVE = ["active", "disabled"];

export interface SelectIsActiveProps {
    getValue: (key: string) => boolean;
    setValue: (key: string, value: boolean) => void;
    name?: string;
    gender: Genders;
}

export const SelectIsActive = ({
    getValue,
    setValue,
    name = "active",
    gender,
}: SelectIsActiveProps) => {
    return (
        <Select
            options={OPTIONS_IS_ACTIVE}
            translatePath={`Shared:status.${gender}`}
            value={getValue(name) ? "active" : "disabled"}
            onChange={(newVal) => setValue(name, newVal === "active" ? true : false)}
        />
    );
};
