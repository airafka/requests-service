import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, InputAdornment, Menu, MenuItem, Select as MuiSelect } from "@mui/material";
import classNames from "classnames";
import { Badge } from "../../Badge";
import { useBadgeCount } from "../../Badge/useBadgeCount";
import { CheckBox } from "../../CheckBox";
import { CommonSize } from "@/types";
import { useSwitch } from "@/hooks";
import { getTranslatedValueForSelect } from "./utils";
import { useSelectClasses } from "./styles";
import { SelectMultiProps, SelectOptionsPrimitives, ValueOption } from "./types";
import { t } from "i18next";
import { XThinIcon } from "@/icons";
import { FieldWrapper } from "@/lib";
import { Chevron, ChevronDirection } from '@/index'

export const SelectMulti = forwardRef<HTMLInputElement, SelectMultiProps>(
  (
    {
      error,
      isDisable,
      translatePath,
      translate: translateExternal,
      value,
      onChange,
      options: optionsInitial = [],
      fieldName,
      dataTestId,
      placeholder,
      isFilter,
      label,
      hintText,
      className,
      withOptionsBadges = false,
      withoutClearIcon = true,
      optionsToBadgeColors,
      customOpener,
      colors,
      isTable
    },
    ref,
  ) => {
    const { isOn: isOpen, on: open, off: close } = useSwitch();
    const [selectedOption, setSelectedOption] =
      useState<SelectOptionsPrimitives>(value || []);

    const {
      visibleCount,
      hiddenCount,
      setBadgeRef,
      containerRef: badgesContainerRef,
      moreRef,
    } = useBadgeCount(selectedOption.length);

    const dropdownClasses = useSelectClasses({
      open: isOpen,
      error,
      isDisable,
      value: !!value,
      customOpener: !!customOpener,
      colors,
      isTable
    })()

    const customOpenerRef = useRef<HTMLElement>(null);

    const handleValueSelect = (newValueArray: SelectOptionsPrimitives) => {
      setSelectedOption(newValueArray);
      onChange && onChange(newValueArray);
    };

    const handleBadgeDelete = (valueToRemove: string | number) => {
      handleValueSelect(
        selectedOption.filter((v) => String(v) !== String(valueToRemove)),
      );
    };

    const translate = useCallback(
      (val: string) =>
        translateExternal
          ? translateExternal(val)
          : getTranslatedValueForSelect(val, translatePath),
      [translateExternal, translatePath],
    );

    const options = useMemo(() => {
      return optionsInitial.reduce<ValueOption[]>((acc, option) => {
        if (typeof option === "string" || typeof option === "number") {
          return [...acc, { value: option, label: translate(String(option)) }];
        }
        if (typeof option === "boolean") {
          return [...acc, { value: String(option), label: String(option) }];
        }
        return [
          ...acc,
          {
            value: option.value,
            label: translate(option.label),
          },
        ];
      }, [] as ValueOption[]);
    }, [optionsInitial, translate]);

    const isAllSelected = useMemo(
      () => options.length > 0 && selectedOption?.length === options.length,
      [options, selectedOption],
    );

    const optionsList = useMemo(
      () => (
        <>
          <MenuItem
            value="all"
            className={dropdownClasses.li}
            onClick={() =>
              handleValueSelect(
                selectedOption.length === options.length
                  ? []
                  : options.map((item) => String(item.value)),
              )
            }
          >
            <CheckBox checked={isAllSelected} size={CommonSize.Small} />
            {t("Shared:selectMultiple")}
          </MenuItem>

          {options.map((item) => {
            const isSelected = selectedOption.includes(String(item.value));

            return (
              <MenuItem
                key={String(item.value)}
                className={dropdownClasses.li}
                value={String(item.value)}
                onClick={() => {
                  handleValueSelect(
                    isSelected
                      ? selectedOption.filter(
                          (v) => String(v) !== String(item.value),
                        )
                      : [...selectedOption, String(item.value)],
                  );
                }}
              >
                <CheckBox checked={isSelected} size={CommonSize.Small} />

                {withOptionsBadges ? (
                  <>
                    <Badge
                      customClassName={dropdownClasses.optionBadge}
                      text={item.label}
                      color={
                        optionsToBadgeColors && typeof item.value === "string"
                          ? optionsToBadgeColors[item.value]
                          : undefined
                      }
                      hasDot={withOptionsBadges}
                    />
                  </>
                ) : (
                  item.label
                )}
              </MenuItem>
            );
          })}
        </>
      ),
      [options, isAllSelected, selectedOption],
    );

    useEffect(() => {
      setSelectedOption(value || []);
    }, [value]);

    return (
      <FieldWrapper
        className={className}
        label={label}
        inputId={fieldName}
        hint={hintText}
        isDisabled={isDisable}
        isInvalid={error}
      >
        {customOpener ? (
          <>
            {customOpener({
              isOpen,
              setAnchorRef: (node) => {
                customOpenerRef.current = node;
              },
              onClick: open,
            })}

            <Menu
              anchorEl={customOpenerRef.current}
              open={isOpen}
              onClose={close}
              marginThreshold={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  className: dropdownClasses.paper,
                  sx: {
                    minWidth: customOpenerRef.current?.offsetWidth,
                  },
                },
              }}
            >
              {optionsList}
            </Menu>
          </>
        ) : (
          <MuiSelect
            multiple
            fullWidth
            className={classNames(dropdownClasses.input, {
              isOpen: isOpen,
              "Mui-disabled": isDisable,
              "Mui-error": error,
            })}
            MenuProps={{
              marginThreshold: null,
              PaperProps: { className: dropdownClasses.paper },
            }}
            size="small"
            inputRef={ref}
            value={selectedOption}
            error={error}
            open={isOpen}
            onOpen={open}
            onClose={close}
            disabled={isDisable}
            displayEmpty={!!placeholder}
            IconComponent={() => <></>}
            endAdornment={
              <InputAdornment position="end" disablePointerEvents={isDisable}>
                {selectedOption.length > 0 && !withoutClearIcon && !isDisable && (
                  <IconButton
                    sx={{ visibility: selectedOption ? "visible" : "hidden" }}
                    onClick={() => handleValueSelect([])}
                  >
                    <XThinIcon />
                  </IconButton>
                )}
                <IconButton onClick={open}>
                  <Chevron size={16} direction={isOpen ? ChevronDirection.UP : ChevronDirection.DOWN}/>
                </IconButton>
              </InputAdornment>
            }
            data-test-id={`select-multi:${dataTestId ?? fieldName}`}
            renderValue={(selected) => {
              const visibleValues = (selected || []).slice(0, visibleCount);

              return (
                <Box
                  ref={badgesContainerRef}
                  className={dropdownClasses.inputArea}
                >
                  {!selected || !selected.length || isFilter ? (
                    <>
                      <span
                        className={dropdownClasses.placeholder}
                        id={'placeholder'}
                      >
                        {placeholder}
                      </span>
                    </>
                  ) : (
                    <>
                      {visibleValues.map((value) => (
                        <Box
                          key={value}
                          className={dropdownClasses.badgeWrapper}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <Badge
                            text={
                              options.find(
                                (item) => String(item.value) === value,
                              )?.label
                            }
                            color={
                              optionsToBadgeColors && typeof value === "string"
                                ? optionsToBadgeColors[value]
                                : undefined
                            }
                            onDelete={
                            () => handleBadgeDelete(value)
                            }
                            hiddenBadgeDeleteIcon={isDisable}
                            hasDot={withOptionsBadges}
                          />
                        </Box>
                      ))}

                      {hiddenCount > 0 && (
                        <Box
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <Badge text={`+${hiddenCount}`} />
                        </Box>
                      )}

                      <Box
                        className={dropdownClasses.badgeContainer}
                      >
                        <Box
                          className={dropdownClasses.badgeBox}
                        >
                          {selected?.map((value, idx) => (
                            <Box
                              key={`measure-${String(value)}`}
                              ref={setBadgeRef(idx)}
                            >
                              <Badge
                                text={
                                  options.find(
                                    (item) => String(item.value) === value,
                                  )?.label
                                }
                                color={
                                  optionsToBadgeColors &&
                                  typeof value === "string"
                                    ? optionsToBadgeColors[value]
                                    : undefined
                                }
                              />
                            </Box>
                          ))}

                          <Box ref={moreRef}>
                            <Badge text={"+99"} />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              );
            }}
          >
            {optionsList}
          </MuiSelect>
        )}
      </FieldWrapper>
    );
  },
);

SelectMulti.displayName = "SelectMulti";

export default SelectMulti;
