import classNames from "classnames";
import { AutocompleteMultiProps } from "./types";
import { Box, IconButton, InputAdornment, ListItemText, Popover } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputText } from "../../InputText";
import { CheckBox } from "../../CheckBox";
import { Badge, type colorBadge } from "../../Badge";
import { MagnifierIcon, XThinIcon } from "@/icons";
import { CommonSize } from "@/types";
import { sortList } from "@/helpers";
import { useAutocompleteMultiStyles } from "./style";
import { t } from "i18next";
import { FieldWrapper } from "@/lib";
import { useBadgeCount } from "@/components/Badge/useBadgeCount";
import Preloader from '@/components/Preloader'
import { Chevron, ChevronDirection } from '@/index'

interface SelectItemProps {
  value: string | number;
  label: string;
  isSelected: boolean;
  onClick: (isSelected: boolean) => void;
  className?: string;
  disabled?: boolean;
  rowRef?: AutocompleteMultiProps["handleItemLoad"];
  withOptionsBadges?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
}

const SelectItem: FC<SelectItemProps> = ({
  isSelected,
  value,
  label,
  onClick,
  className,
  disabled,
  rowRef,
  withOptionsBadges,
  optionsToBadgeColors,
}) => {
  const autocompleteMultiStyles = useAutocompleteMultiStyles({})()

  const isSelectAll = value === "all";

  return (
    <Box
      ref={rowRef}
      className={classNames(autocompleteMultiStyles.listItem, autocompleteMultiStyles[className])}
      sx={{
        cursor: "pointer",
        opacity: disabled && !isSelected ? 0.5 : 1,
      }}
      onClick={() => onClick?.(isSelected)}
    >
      <CheckBox checked={isSelected} size={CommonSize.Small} />

      {withOptionsBadges && !isSelectAll ? (
        <>
          <Badge
            text={label}
            color={
              optionsToBadgeColors ? optionsToBadgeColors[value] : undefined
            }
            hasDot={withOptionsBadges}
          />
        </>
      ) : (
        <ListItemText
          primary={label}
          slotProps={{
            primary: {
              sx: {
                margin: 0,
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 400,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

SelectItem.displayName = "SelectItem";

interface OptionsListProps {
  optionsList: AutocompleteMultiProps["options"];
  onSelect: (newValue: AutocompleteMultiProps["value"]) => void;
  currentValue: AutocompleteMultiProps["value"];
  translatePath: AutocompleteMultiProps["translatePath"];
  isSearch?: boolean;
  rowRef?: AutocompleteMultiProps["handleItemLoad"];
  withOptionsBadges?: boolean;
  optionsToBadgeColors?: { [key: string]: colorBadge };
}

const OptionsList: FC<OptionsListProps> = ({
  optionsList,
  onSelect,
  currentValue,
  translatePath,
  rowRef,
  isSearch = false,
  withOptionsBadges,
  optionsToBadgeColors,
}) => {
  return (
    <>
      {optionsList.map((option) => {
        const isSelected = currentValue.some(
          (v) => String(v.value) === String(option.value),
        );
        return (
          <SelectItem
            rowRef={rowRef}
            key={String(option.value)}
            value={option.value}
            label={
              translatePath
                ? t(`${translatePath}${option.label}`)
                : option.label
            }
            isSelected={isSelected}
            disabled={isSelected && isSearch}
            onClick={() => {
              onSelect(
                isSelected
                  ? currentValue.filter(
                      (v) => String(v.value) !== String(option.value),
                    )
                  : [...currentValue, option],
              );
            }}
            withOptionsBadges={withOptionsBadges}
            optionsToBadgeColors={optionsToBadgeColors}
          />
        );
      })}
    </>
  );
};

OptionsList.displayName = "OptionsList";

export const AutocompleteMulti: FC<AutocompleteMultiProps> = ({
  options,
  value,
  error,
  isDisable,
  onChange,
  onClose,
  placeholder = "Выберите",
  handleInput,
  inputValue: inputValueProp = "",
  isLoading,
  translatePath,
  handleItemLoad,
  handleListLoad,
  label,
  hintText,
  className,
  showPickedOptions,
  dataTestId,
  fieldName,
  customOpener,
  overflowOptionsCount,
  withOptionsBadges,
  optionsToBadgeColors,
  hasSearch = true,
  withoutClearIcon = true,
  colors,
  isTable
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputValue, setInputValue] = useState(inputValueProp);
  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizeValue = useCallback(
    (
      val: AutocompleteMultiProps["value"],
      opts: AutocompleteMultiProps["options"],
    ): AutocompleteMultiProps["value"] => {
      if (!val || val.length === 0) return [];

      return val.map((item) => {
        const matchedOption = opts.find(
          (opt) => String(opt.value) === String(item.value),
        );

        return matchedOption || item;
      });
    },
    [],
  );

  const [selectValue, setSelectValue] = useState<
    AutocompleteMultiProps["value"]
  >(value ? normalizeValue(value, options) : []);
  const autocompleteMultiStyles = useAutocompleteMultiStyles({
    error,
    open,
    isDisable,
    overflowOptionsCount,
    value: !!inputValue,
    customOpener: !!customOpener,
    colors,
    isTable
  })();

  useEffect(() => {
    setSelectValue(value ? normalizeValue(value, options) : []);
  }, [value, options, normalizeValue]);

  useEffect(() => {
    setInputValue(inputValueProp);
  }, [inputValueProp]);

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      handleInput?.(val);
      setInputValue(val);
    },
    [handleInput],
  );

  const handleSelect = useCallback(
    (newSelectValue: AutocompleteMultiProps["value"]) => {
      setSelectValue(newSelectValue);
      onChange?.(newSelectValue);
      inputRef.current?.focus();
    },
    [onChange],
  );

  const handleOpen = useCallback(() => {
    if (isDisable || isLoading) {
      return;
    }
    setAnchorEl(containerRef.current);
    setOpen(true);
  }, [isDisable, isLoading]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setInputValue("");
    handleInput?.("");
    onClose?.();
  }, [onClose, handleInput]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === e.currentTarget ||
        (e.target as HTMLElement).closest(".autocomplete-input-area")
      ) {
        inputRef.current?.focus();
      }
      handleOpen();
    },
    [handleOpen],
  );

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleOpen();
    },
    [handleOpen],
  );

  const handleSelectAll = useCallback(() => {
    handleSelect(isAllSelected ? [] : options);
  }, [isAllSelected, options, handleSelect]);

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleSelect([]);
      setInputValue("");
      handleInput?.("");
    },
    [handleSelect, handleInput],
  );

  const createBadgeDeleteHandler = useCallback(
    (optionValue: string | number) => () => {
      const newValue = selectValue.filter(
        (item) => String(item.value) !== String(optionValue),
      );
      handleSelect(newValue);
    },
    [selectValue, handleSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === "Backspace" &&
        inputValue === "" &&
        selectValue.length > 0
      ) {
        const lastItem = selectValue[selectValue.length - 1];
        const newValue = selectValue.filter(
          (item) => String(item.value) !== String(lastItem.value),
        );
        handleSelect(newValue);
      }
      if (e.key === "Escape") {
        handleClose();
        inputRef.current?.blur();
      }
    },
    [inputValue, selectValue, handleSelect, handleClose],
  );

  const {
    visibleCount,
    hiddenCount,
    setBadgeRef,
    containerRef: badgesContainerRef,
    moreRef,
  } = useBadgeCount(selectValue.length);

  const visibleBadges = selectValue.slice(0, visibleCount);

  return (
    <>
      <FieldWrapper
        className={autocompleteMultiStyles[className]}
        label={label}
        hint={hintText}
        inputId={fieldName}
        isDisabled={isDisable}
        isInvalid={error}
      >
        {customOpener ? (
          <>
            {customOpener({
              isOpen: open,
              setAnchorRef: (node) => {
                containerRef.current = node;
              },
              onClick: handleOpen,
            })}
          </>
        ) : (
          <Box
            ref={containerRef}
            title={placeholder}
            onClick={handleContainerClick}
            className={classNames(autocompleteMultiStyles.root, {
              "Mui-disabled": isDisable,
              "Mui-error": error,
              "Mui-expanded": open,
            })}
            data-test-id={`autocomplete-multi:${dataTestId ?? fieldName}`}
          >
            <Box
              ref={badgesContainerRef}
              className={autocompleteMultiStyles.autocompleteInputArea}
            >
              {visibleBadges.map((option) => {
                return (
                  <Box key={String(option.value)} >
                  <Badge
                    text={translatePath ? t(`${translatePath}${option.label}`) : option.label}
                    onDelete={createBadgeDeleteHandler(option.value)}
                    className={autocompleteMultiStyles.placeholder}
                    color={
                      optionsToBadgeColors
                        ? optionsToBadgeColors[option.value]
                        : undefined
                    }
                    hiddenBadgeDeleteIcon={isDisable}
                    hasDot={withOptionsBadges}
                  />
                </Box>)
              })}

              {hiddenCount > 0 && (
                <Box>
                  <Badge
                    text={`+${hiddenCount}`}
                    className={autocompleteMultiStyles.placeholder}
                    hiddenBadgeDeleteIcon={isDisable}
                  />
                </Box>
              )}

              <Box
                className={autocompleteMultiStyles.badgeContainer}
              >
                <Box>
                  {selectValue.map((option, idx) => (
                    <Box
                      key={`measure-${String(option.value)}`}
                      ref={setBadgeRef(idx)}
                    >
                      <Badge
                        text={option.label}
                        className={autocompleteMultiStyles.placeholder}
                        color={
                          optionsToBadgeColors
                            ? optionsToBadgeColors[option.value]
                            : undefined
                        }
                      />
                    </Box>
                  ))}

                  <Box ref={moreRef}>
                    <Badge
                      text={"+99"}
                      className={autocompleteMultiStyles.placeholder}
                      hiddenBadgeDeleteIcon={isDisable}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                component="input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isDisable}
                aria-label={label || placeholder}
                aria-expanded={open}
                aria-haspopup="listbox"
                className={autocompleteMultiStyles.listBox}
              />
            </Box>
            <Box>
              {isLoading ? (
                <Preloader />
              ) : (
                <InputAdornment
                  position="end"
                  className={autocompleteMultiStyles.iconsContainer}
                  disablePointerEvents={isDisable}
                >
                  {selectValue.length > 0 && !withoutClearIcon && !isDisable && (
                    <IconButton onClick={handleClear} aria-label="Очистить все">
                      <XThinIcon />
                    </IconButton>
                  )}

                  <IconButton
                    aria-label={open ? "Закрыть список" : "Открыть список"}
                  >
                    <Chevron
                      size={16}
                      direction={open ? ChevronDirection.UP : ChevronDirection.DOWN}
                    />
                  </IconButton>
                </InputAdornment>
              )}
            </Box>
          </Box>
        )}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          marginThreshold={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: -4, horizontal: "left" }}
          disableEnforceFocus
          disableAutoFocus
          disableRestoreFocus
          slotProps={{
            paper: {
              sx: {
                minWidth: containerRef.current?.offsetWidth,
                maxWidth: Math.max(containerRef.current?.offsetWidth || 0, 550),
              },
              className: autocompleteMultiStyles.popover
            },
          }}
        >
          <Box className={customOpener && autocompleteMultiStyles.popoverContent}>
            {customOpener && hasSearch && (
              <Box className={autocompleteMultiStyles.searchWrapper}>
                <InputText
                  ref={inputRef}
                  placeholder={"Поиск..."}
                  iconStart={
                    <MagnifierIcon className={autocompleteMultiStyles.searchIcon} />
                  }
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Box>
            )}
            <Box
              className={autocompleteMultiStyles.optionsContainer}
              ref={handleListLoad}
              role="listbox"
              aria-label="Список опций"
            >
              <Box>
                <Box className={autocompleteMultiStyles.optionsList}>
                  <SelectItem
                    value={"all"}
                    label={t("Shared:selectMultiple")}
                    isSelected={isAllSelected}
                    onClick={handleSelectAll}
                  />
                  <OptionsList
                    isSearch={true}
                    rowRef={handleItemLoad}
                    optionsList={searchOptions}
                    onSelect={handleSelect}
                    translatePath={translatePath}
                    currentValue={selectValue}
                    withOptionsBadges={withOptionsBadges}
                    optionsToBadgeColors={optionsToBadgeColors}
                  />
                </Box>

                {showPickedOptions && (
                  <Box className={autocompleteMultiStyles.pickedOptionsWrapper}>
                    <Box
                      className={autocompleteMultiStyles.localOptions}
                    >
                      <OptionsList
                        optionsList={selectValue.sort((a, b) =>
                          a.label?.localeCompare(b.label),
                        )}
                        onSelect={handleSelect}
                        translatePath={translatePath}
                        currentValue={selectValue}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Popover>
      </FieldWrapper>
    </>
  );
};
