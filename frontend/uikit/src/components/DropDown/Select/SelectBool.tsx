import { forwardRef, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { SelectBoolProps, SelectBoolValue } from "./types";
import { Box, IconButton, InputAdornment, Popover, Select as MuiSelect, Typography } from "@mui/material";
import { SvgCheckIcon, SvgXIcon, XThinIcon } from "@/icons";
import { useSelectClasses } from "./styles";
import { FieldWrapper } from "@/lib";
import { Chevron, ChevronDirection } from '@/index'
import { useToken } from '@/theme'

export const SelectBool = forwardRef<HTMLInputElement, SelectBoolProps>(
  (
    {
      label,
      hintText,
      error,
      isDisable,
      value,
      onChange,
      placeholder,
      className,
      fieldName,
      dataTestId,
      customOpener,
      withoutClearIcon = true,
      colors,
      isTable
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [valueLocal, setValueLocal] = useState<SelectBoolValue>(value);
    const dropDownClasses = useSelectClasses({
      error,
      open,
      isDisable,
      customOpener: !!customOpener,
      value,
      colors,
      isTable
    })()
    useEffect(() => {
      setValueLocal(value);
    }, [value]);

    const handleToggle = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (isDisable) {
          return;
        }
        setAnchorEl(e.currentTarget);
        setOpen((prev) => !prev);
      },
      [isDisable]
    );
    const handleSetValue = (val: SelectBoolValue) => {
      if (isDisable) {
        return false;
      }
      setValueLocal(val);
      onChange?.(val);
      setOpen(false);
    };
    return (
      <FieldWrapper
        className={className}
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
              setAnchorRef: setAnchorEl,
              onClick: () => setOpen(true),
            })}
          </>
        ) : (
          <MuiSelect
            className={classNames(dropDownClasses.input, {
              "Mui-disabled": isDisable,
              "Mui-error": error,
            })}
            fullWidth
            size="small"
            inputRef={ref}
            open={false}
            disabled={isDisable}
            data-test-id={`select-bool:${dataTestId ?? fieldName}`}
            displayEmpty
            IconComponent={() => <></>}
            value={
              valueLocal === undefined
                ? ""
                : valueLocal === true
                ? "true"
                : "false"
            }
            onClick={handleToggle}
            renderValue={() => (
              <Box className={dropDownClasses.iconsContainer}>
                <>
                  {valueLocal === true && <SvgCheckIcon color={String(useToken("dropdown_list_items/color/icon/default"))} size={20} />}
                  {valueLocal === false && <SvgXIcon size={20} />}
                </>
                {valueLocal === undefined && !open &&
                    <Typography
                        className={dropDownClasses.placeholder}
                    >
                      {placeholder}
                    </Typography>
                }
              </Box>
            )}
            endAdornment={
              <InputAdornment position="end" disablePointerEvents={isDisable}>
                {valueLocal !== undefined && !withoutClearIcon && !isDisable && (
                  <IconButton onClick={() => handleSetValue(undefined)}>
                    <XThinIcon />
                  </IconButton>
                )}

                <IconButton>
                  <Chevron size={16} direction={open ? ChevronDirection.UP : ChevronDirection.DOWN}/>
                </IconButton>
              </InputAdornment>
            }
          />
        )}

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => {
            setOpen(false);
          }}
          marginThreshold={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: -4, horizontal: "left" }}
        >
          <Box>
            <IconButton
              onClick={() => handleSetValue(true)}
              className={dropDownClasses.selectBoolItem}
            >
              <SvgCheckIcon color={String(useToken("dropdown_list_items/color/icon/default"))} size={20} />
            </IconButton>
            <IconButton
              onClick={() => handleSetValue(false)}
              className={dropDownClasses.selectBoolItem}
            >
              <SvgXIcon size={20} />
            </IconButton>
          </Box>
        </Popover>
      </FieldWrapper>
    );
  }
);

SelectBool.displayName = "Select";

export default SelectBool;
