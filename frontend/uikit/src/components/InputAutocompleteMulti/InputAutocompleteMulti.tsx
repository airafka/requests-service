import { FC, useCallback, useEffect, useMemo, useState, useRef, ChangeEvent } from "react";
import { t } from "i18next";
import { Box, ListItemText, Popover, useTheme } from "@mui/material";
import { InputText } from "../InputText";
import { CheckBox } from "../CheckBox";
import { CommonSize } from "../../types";
import { MagnifierIcon } from "../../icons";
import { sortList } from "./lib";
import type { AutocompleteMultiProps } from "./types";
import { useAutocompleteMultiStyles } from "./styles";

interface OptionProps {
    label: string;
    isSelected: boolean;
    onClick: (isSelected: boolean) => void;
    rowRef?: AutocompleteMultiProps["handleItemLoad"];
}

const Option: FC<OptionProps> = ({ isSelected, label, onClick, rowRef }) => {
    const theme = useTheme();
    const autocompleteMultiStyles = useAutocompleteMultiStyles();

    return (
        <Box
            ref={rowRef}
            className={autocompleteMultiStyles.option}
            onClick={() => onClick?.(isSelected)}>
            <CheckBox checked={isSelected} size={CommonSize.Small} />
            <ListItemText
                className={autocompleteMultiStyles.listItemText}
                primary={label}
                slotProps={{
                    primary: {
                        className: autocompleteMultiStyles.listItemTextProps,
                    },
                }}
            />
        </Box>
    );
};

interface OptionsListProps {
    optionsList: AutocompleteMultiProps["options"];
    onSelect: (newValue: AutocompleteMultiProps["value"]) => void;
    currentValue: AutocompleteMultiProps["value"];
    translatePath: AutocompleteMultiProps["translatePath"];
    rowRef?: AutocompleteMultiProps["handleItemLoad"];
}

const OptionsList: FC<OptionsListProps> = ({
    optionsList,
    onSelect,
    currentValue,
    translatePath,
    rowRef,
}) => {
    return (
        <>
            {optionsList.map((option) => {
                const isSelected = currentValue.some(
                    (v) => String(v.value) === String(option.value)
                );
                return (
                    <Option
                        rowRef={rowRef}
                        key={String(option.value)}
                        label={translatePath ? t(`${translatePath}${option.label}`) : option.label}
                        isSelected={isSelected}
                        onClick={() => {
                            onSelect(
                                isSelected
                                    ? currentValue.filter(
                                          (v) => String(v.value) !== String(option.value)
                                      )
                                    : [...currentValue, option]
                            );
                        }}
                    />
                );
            })}
        </>
    );
};

OptionsList.displayName = "OptionsList";

export const InputAutocompleteMulti: FC<AutocompleteMultiProps> = ({
    options,
    value,
    error,
    isDisable,
    onChange,
    onClose,
    placeholder = t("Shared:search"),
    handleInput,
    inputValue: inputValueProp = "",
    translatePath,
    handleItemLoad,
    handleListLoad,
    className,
    onSelectAll,
}) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = useState(inputValueProp);
    const normalizeValue = useCallback(
        (
            val: AutocompleteMultiProps["value"],
            opts: AutocompleteMultiProps["options"]
        ): AutocompleteMultiProps["value"] => {
            if (!val || val.length === 0) {
                return [];
            }

            return val.map((item) => {
                const matchedOption = opts.find((opt) => String(opt.value) === String(item.value));

                return matchedOption || item;
            });
        },
        []
    );

    const [selectValue, setSelectValue] = useState<AutocompleteMultiProps["value"]>(
        value ? normalizeValue(value, options) : []
    );
    const theme = useTheme();
    const autocompleteMultiStyles = useAutocompleteMultiStyles();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSelectValue(value ? normalizeValue(value, options) : []);
    }, [value, options, normalizeValue]);

    const searchOptions = useMemo(() => {
        const selectedOptionsValue = selectValue.map((s) => String(s.value));
        return sortList.searchOptions({
            options: options.map((o) => ({
                ...o,
                isSelected: selectedOptionsValue.includes(String(o.value)),
            })),
            label: "label",
            inputValue,
        });
    }, [selectValue, options, inputValue]);

    const isAllSelected = useMemo(() => {
        const selectValueStr = selectValue.map((v) => String(v.value));
        return options.every((o) => selectValueStr.includes(String(o.value)));
    }, [options, selectValue]);

    const handleInputLocal = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            handleInput?.(e.target.value);
            setInputValue(e.target.value);
        },
        [handleInput]
    );

    const handleSelect = useCallback(
        (newSelectValue: AutocompleteMultiProps["value"]) => {
            setSelectValue(newSelectValue);
            onChange?.(newSelectValue);
        },
        [onChange]
    );

    const handleToggle = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (isDisable) {
                return;
            }
            setAnchorEl(e.currentTarget);
            setOpen((prev) => !prev);
        },
        [isDisable]
    );

    const handleClose = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setOpen(false);
        onClose?.();
    }, [onClose]);

    const handleSelectAll = useCallback(() => {
        if (onSelectAll) {
            onSelectAll(isAllSelected);
            return;
        }

        handleSelect(isAllSelected ? [] : options);
    }, [onSelectAll, isAllSelected, options, handleSelect]);

    return (
        <>
            <Box className={className}>
                <InputText
                    ref={inputRef}
                    value={inputValue}
                    placeholder={placeholder}
                    iconStart={<MagnifierIcon className={autocompleteMultiStyles.icon} />}
                    error={error}
                    disabled={isDisable}
                    onFocus={handleToggle}
                    onChange={handleInputLocal}
                />

                <Popover
                    className={autocompleteMultiStyles.popover}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    marginThreshold={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: -6, horizontal: "left" }}
                    disableEnforceFocus
                    disableAutoFocus
                    disableRestoreFocus>
                    <Box
                        width={inputRef.current?.offsetWidth || "fit-content"}
                        className={autocompleteMultiStyles.popoverContent}
                        ref={handleListLoad}>
                        <Box className={autocompleteMultiStyles.optionsList}>
                            <Option
                                label={t("Shared:selectMultiple")}
                                isSelected={isAllSelected}
                                onClick={handleSelectAll}
                            />
                            <OptionsList
                                rowRef={handleItemLoad}
                                optionsList={searchOptions}
                                onSelect={handleSelect}
                                translatePath={translatePath}
                                currentValue={selectValue}
                            />
                        </Box>
                    </Box>
                </Popover>
            </Box>
        </>
    );
};
