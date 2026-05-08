import {
  Autocomplete as MuiAutocomplete,
  Box,
  createFilterOptions,
  ListItemText,
  Popover,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useDropDownClasses } from "../styles";
import { DropDownChangeReason } from "../types";
import { getOptionLabel } from "./lib";
import { dropdownAnchoredPopperModifiers } from "../dropdownAnchoredPopperModifiers";
import { AutocompleteProps } from "./types";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SvgCheckIcon, XThinIcon } from "@/icons";
import { FieldWrapper } from "@/lib";
import { useSwitch } from "@/hooks";
import { Badge } from "../../Badge";
import { getAdornmentChildren } from '@/helpers/getAbornmentChildren'
import { Chevron, ChevronDirection, ITooltype, OverflowText, Preloader } from '@/index'
import { useToken } from '@/theme'

interface IdOnly {
  id: string | null;
}
interface IdCode extends IdOnly {
  code: string;
}
interface IdNonNullabelCodeNullable {
  id: NonNullable<IdCode["id"]>;
  code?: IdCode["code"];
  name?: string | null;
}

export const Autocomplete = <T extends IdNonNullabelCodeNullable>({
  options: optionsInitial,
  inputValue,
  placeholder,
  selectedValue,
  setSelectedValue,
  onChange,
  onClear,
  translatePath,
  renderValuePrimary,
  renderValueSecondary,
  defaultNullValue,
  handleInput,
  error,
  handleItemLoad,
  handleListLoad,
  style,
  fieldName,
  dataTestId,
  useRenderValuePattern,
  isLoading,
  disablePortal,
  className,
  isDisable,
  label,
  hintText,
  customOpener,
  overflowOptionsCount,
  withOptionsBadges,
  optionsToBadgeColors,
  withoutClearIcon = true,
  colors,
  isTable
}: AutocompleteProps<T>) => {
  const { isOn: isOpen, on: open, off: close } = useSwitch();

  const { t } = useTranslation();
  const autoCompleteClasses = useDropDownClasses({open: isOpen, isDisable, customOpener: !!customOpener, error, value: !!inputValue, colors, isTable})();

  const [badgeValue, setBadgeValue] = useState<T>()
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const customOpenerRef = useRef<HTMLElement>(null);

  const handleValueChange = (value: object | null) => {
    setSelectedValue(value as T);
    onChange ? onChange(value as T | null) : "";
  };

  const options = useMemo(() => optionsInitial, [optionsInitial, inputValue]);

  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const callbackRef = useCallback((node: HTMLDivElement) => {
    autocompleteRef.current = node;
    setContainerWidth(node?.getBoundingClientRect().width)
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setContainerWidth(autocompleteRef.current?.getBoundingClientRect().width);
  }, [isOpen]);

  const renderOption = useCallback((props, option, { selected }) => {
    const label = getOptionLabel({
      option,
      translatePath,
      renderValuePrimary,
      renderValueSecondary,
      defaultNullValue,
      useRenderValuePattern,
      hasItem: true,
    });
    return (
      <li
        {...props}
        ref={handleItemLoad}
        key={option.id + "option"}
        className={classNames(autoCompleteClasses.li, props.className)}
      >
        {withOptionsBadges ? (
          <>
            <Badge
              text={label}
              color={
                optionsToBadgeColors
                  ? optionsToBadgeColors[option.id]
                  : undefined
              }
              hasDot={withOptionsBadges}
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
        {selected && (
          <SvgCheckIcon color={String(useToken("dropdown_list_items/color/icon/default"))} size={20}/>
        )}
      </li>
    );
  }, []);

  return (
    <FieldWrapper
      className={autoCompleteClasses[className]}
      inputId={fieldName}
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

          <Popover
            anchorEl={customOpenerRef.current}
            open={isOpen}
            onClose={() => {
              handleInput && handleInput("");
              close();
            }}
            marginThreshold={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            slotProps={{
              paper: {
                sx: {
                  minWidth: customOpenerRef.current?.offsetWidth,
                },
                className: classNames(autoCompleteClasses.paper, autoCompleteClasses.popoverPaper)
              },
            }}
          >
            <MuiAutocomplete
              open
              size="small"
              options={options}
              inputValue={inputValue}
              popupIcon={
                isLoading ? <Preloader/> : <Chevron size={16} direction={isOpen ? ChevronDirection.UP : ChevronDirection.DOWN}/>
              }
              clearIcon={<XThinIcon />}
              disableClearable={false}
              disablePortal
              value={selectedValue}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              onInputChange={(_, value, reason) => {
                if (reason === DropDownChangeReason.RESET) {
                  return;
                }
                if (!value) {
                  setSelectedValue(null);
                }

                handleInput && handleInput(value);
              }}
              noOptionsText={t("Shared:noOptions")}
              openText={t("Shared:open")}
              closeText={t("Shared:close")}
              clearText={t("Shared:clear")}
              onChange={(_event, selectedOption) => {
                handleValueChange(selectedOption as T);
                close();
              }}
              getOptionLabel={(option: T) =>
                getOptionLabel({
                  option,
                  translatePath,
                  renderValuePrimary,
                  renderValueSecondary,
                  defaultNullValue,
                  hasItem: true,
                })
              }
              renderInput={(params) => {
                return (
                <Box
                  className={autoCompleteClasses.listItem}
                  // инпут должен быть всешда отрендерен
                  // иначе ломается Mui Autocomplete
                  hidden={
                    overflowOptionsCount &&
                    options.length <= overflowOptionsCount
                  }
                >
                  <Box className={autoCompleteClasses.input}>
                    <TextField
                      {...params}
                      placeholder={"Поиск..."}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: getAdornmentChildren(params.InputProps.endAdornment)[1],
                        endAdornment: getAdornmentChildren(params.InputProps.endAdornment)[0]
                      }}
                    />
                  </Box>
                </Box>
                )
                }
              }
              renderOption={renderOption}
              slotProps={{
                popper: {
                  className: autoCompleteClasses.innerPopper,
                  placement: "bottom-start",
                  modifiers: dropdownAnchoredPopperModifiers,
                },
                listbox: {
                  ref: handleListLoad,
                  className: autoCompleteClasses.listBox,
                },
              }}
              data-test-id={`autocomplete:${dataTestId ?? fieldName}`}
              filterOptions={createFilterOptions({
                matchFrom: "any",
                stringify: (option) =>
                  getOptionLabel({
                    option,
                    translatePath,
                    renderValuePrimary,
                    renderValueSecondary,
                    defaultNullValue,
                    hasItem: true,
                  }),
              })}
            />
          </Popover>
        </>
      ) : (
        <MuiAutocomplete
          className={classNames( autoCompleteClasses.input, {
            "Mui-disabled": isDisable,
            "Mui-error": error,
          })}
          open={isOpen}
          onOpen={open}
          onClose={close}
          defaultChecked
          size="small"
          ref={callbackRef}
          disabled={isDisable}
          options={options}
          inputValue={inputValue}
          popupIcon={isLoading ? <Preloader/> : <Chevron size={16} direction={isOpen ? ChevronDirection.UP : ChevronDirection.DOWN}/>}
          clearIcon={<XThinIcon />}
          disableClearable={false}
          disablePortal={disablePortal}
          value={selectedValue}
          isOptionEqualToValue={(option, value) =>
            option.id === value.id
          }
          onInputChange={(_, value, reason) => {
            if (reason === DropDownChangeReason.RESET) {
              return;
            }
            if (reason === DropDownChangeReason.CLEAR && onClear) {
              setBadgeValue(null)
              onClear();
            }
            if (reason === DropDownChangeReason.SELECT_OPTION && withOptionsBadges) {
              setBadgeValue(options.find(item => item.code === value))
              handleInput && handleInput('')
            }
            if (!value) {
              setSelectedValue(null);
            }
            if (withOptionsBadges) {
              if (reason !== DropDownChangeReason.SELECT_OPTION && reason !== DropDownChangeReason.BLUR){
                handleInput && handleInput(value);
              }
            } else {
              handleInput && handleInput(value);
            }
          }}
          noOptionsText={t("Shared:noOptions")}
          loadingText={t("Shared:loading")}
          openText={t("Shared:open")}
          closeText={t("Shared:close")}
          clearText={t("Shared:clear")}
          onChange={(_event, selectedOption) =>
            handleValueChange(selectedOption as T)
          }
          getOptionLabel={(option: T) =>
            getOptionLabel({
              option,
              translatePath,
              renderValuePrimary,
              renderValueSecondary,
              defaultNullValue,
              hasItem: true,
            })
          }
          renderInput={(params) =>
            <TextField
              {...params}
              error={error}
              placeholder={placeholder || "Поиск..."}
              disabled={isDisable}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  withOptionsBadges && badgeValue ? (
                    <Badge
                      text={badgeValue.code}
                      color={optionsToBadgeColors?.[badgeValue.id]}
                      hasDot={withOptionsBadges}
                      hiddenBadgeDeleteIcon={isDisable}
                    />
                  ) : null
                ),
              }}
            />
          }
          renderOption={renderOption}
          ListboxProps={{
            className: autoCompleteClasses.listBox,
            ref: handleListLoad,
            style,
          }}
          componentsProps={{
            popper: {
              anchorEl: autocompleteRef.current,
              sx: {
                width: `${containerWidth}px !important`
              },
              placement: "bottom-start",
              modifiers: dropdownAnchoredPopperModifiers,
            },
            clearIndicator: {
              sx: {
                visibility: inputValue ? "visible" : "hidden",
                display: withoutClearIcon ? "none" : "flex"
              },
            },
            paper: { className: autoCompleteClasses.paper },
          }}
          data-test-id={`autocomplete:${dataTestId ?? fieldName}`}
          filterOptions={createFilterOptions({
            matchFrom: "any",
            stringify: (option) =>
              getOptionLabel({
                option,
                translatePath,
                renderValuePrimary,
                renderValueSecondary,
                defaultNullValue,
                hasItem: true,
              }),
          })}
        />
      )}
    </FieldWrapper>
  );
};

export const AutocompleteForwardRef = forwardRef(
  <T extends IdNonNullabelCodeNullable>(
    props: AutocompleteProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return <Autocomplete {...props} ref={ref} />;
  }
);

AutocompleteForwardRef.displayName = "AutocompleteForwardRef";
