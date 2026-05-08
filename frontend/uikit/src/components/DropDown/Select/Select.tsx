import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconButton, InputAdornment, Menu, MenuItem, Select as MuiSelect } from "@mui/material";
import classNames from "classnames";
import { SvgCheckIcon, XThinIcon } from "@/icons";
import { useSwitch } from "@/hooks";
import { FieldWrapper } from "@/lib";
import { Badge } from "../../Badge";
import { useSelectClasses } from "./styles";
import { type SelectProps } from "./types";
import { getTranslatedValueForSelect } from "./utils";
import { Chevron, ChevronDirection, OverflowText } from '@/index'
import { useToken } from '@/theme'

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      error,
      isDisable,
      translatePath,
      translate: translateExternal,
      value = "",
      onChange,
      options = [],
      fieldName,
      dataTestId,
      className,
      placeholder,
      label,
      hintText,
      withoutClearIcon = true,
      withBadge,
      withOptionsBadges = false,
      optionsToBadgeColors,
      hideSelectedIconInList,
      customOpener,
      menuPlacement = "bottom",
      colors,
      isTable
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState(value);
    const { isOn: isOpen, on: open, off: close } = useSwitch();
    const checkIconColor = String(useToken("dropdown_list_items/color/icon/default"));

    const dropdownClasses = useSelectClasses({
      value: !!value,
      open: isOpen,
      error,
      isDisable,
      customOpener: !!customOpener,
      colors,
      isTable
    })()

    const [containerWidth, setContainerWidth] = useState<number | null>(null)
    const selectRef = useRef<HTMLDivElement>()

    const callbackRef = useCallback((node: HTMLDivElement) => {
      selectRef.current = node;
      setContainerWidth(node?.getBoundingClientRect().width)
    }, []);

    const customOpenerRef = useRef<HTMLElement>(null);

    const optionsWithLabel = useMemo(
      () =>
        options.map((item) => {
          if (typeof item === "string" || typeof item === "number") {
            return {
              value: item,
              label: ((val: string) =>
                translateExternal
                  ? translateExternal(val)
                  : getTranslatedValueForSelect(val, translatePath))(
                item.toString()
              ),
            };
          }
          return item;
        }),
      [options, translateExternal, translatePath]
    );

    const optionsList = useMemo(
      () =>
        optionsWithLabel.map((item) => {
          const value = item.value;
          const label = item.label;
          const isSelected = selectedOption === item.value;

          return (
            <MenuItem
              key={String(value)}
              className={dropdownClasses.li}
              aria-selected={isSelected}
              value={typeof value === "boolean" ? String(value) : value}
              onClick={() => {
                setSelectedOption(value);
                onChange && onChange(value);
                close();
              }}
            >
              {withOptionsBadges ? (
                <>
                  <Badge
                    customClassName={dropdownClasses.optionBadge}
                    text={label}
                    color={
                      optionsToBadgeColors
                        ? optionsToBadgeColors[value]
                        : undefined
                    }
                    hasDot={withOptionsBadges}
                    hiddenBadgeDeleteIcon={!!optionsToBadgeColors}
                  />
                </>
              ) : (
                <OverflowText
                  tooltipText={label}
                  tooltipType={{
                    anchor: {
                      vertical: "top",
                      horizontal: 'right'
                    },
                    transform: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    }
                  }}
                >
                  <span>{label}</span>
                </OverflowText>
              )}
              {isSelected && !hideSelectedIconInList && (
                <SvgCheckIcon color={checkIconColor} size={20} />
              )}
            </MenuItem>
          );
        }),
      [optionsWithLabel, selectedOption]
    );

    const handleClearClick = () => {
      setSelectedOption("");
      onChange && onChange("");
    };

    useEffect(() => {
      setSelectedOption(value);
    }, [value]);

    return (
      <FieldWrapper
        className={className}
        label={label}
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
                    maxWidth: customOpenerRef.current?.offsetWidth,
                  },
                },
              }}
            >
              {optionsList}
            </Menu>
          </>
        ) : (
          <MuiSelect
            className={classNames(dropdownClasses.input, {
              isOpen: isOpen,
              "Mui-disabled": isDisable,
              "Mui-error": error,
            })}
            MenuProps={{
              marginThreshold: null,
              anchorOrigin: {
                vertical: menuPlacement === "top" ? "top" : "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: menuPlacement === "top" ? "bottom" : "top",
                horizontal: "left",
              },
              PaperProps: {
                className: dropdownClasses.paper,
                sx: {
                  minWidth: `${containerWidth}px`,
                  maxWidth: `${containerWidth}px`
                }
              }
            }}
            size="small"
            fullWidth
            inputRef={ref}
            ref={callbackRef}
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
                {!withoutClearIcon && !isDisable && (
                  <IconButton
                    sx={{ visibility: selectedOption ? "visible" : "hidden" }}
                    onClick={handleClearClick}
                  >
                    <XThinIcon />
                  </IconButton>
                )}
                <IconButton onClick={open}>
                  <Chevron size={16} direction={isOpen ? ChevronDirection.UP : ChevronDirection.DOWN}/>
                </IconButton>
              </InputAdornment>
            }
            data-test-id={`select:${dataTestId ?? fieldName}`}
            renderValue={(val) => {
              if (val) {
                const value =
                  optionsWithLabel.find((item) => item.value === val)?.label ??
                  val;

                if (withBadge) {
                  return (
                    <span
                      className={dropdownClasses.badgeWrapper}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <Badge
                        text={value}
                        color={
                          optionsToBadgeColors
                            ? optionsToBadgeColors[val]
                            : undefined
                        }
                        onDelete={handleClearClick}
                        hiddenBadgeDeleteIcon={!!optionsToBadgeColors || isDisable}
                        hasDot={withOptionsBadges}
                      />
                    </span>
                  );
                }

                return value;
              }
              return (
                <span className={dropdownClasses.placeholder} id={"placeholder"}>{placeholder}</span>
              );
            }}
          >
            {optionsList}
          </MuiSelect>
        )}
      </FieldWrapper>
    );
  }
);

Select.displayName = "Select";

export default Select;
