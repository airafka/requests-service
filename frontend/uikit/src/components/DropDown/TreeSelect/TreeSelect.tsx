import classNames from "classnames";
import { Box, IconButton, InputAdornment, Popover } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldWrapper } from "@/lib";
import { SvgCheckIcon, XThinIcon } from "@/icons";
import { useTreeSelectStyles } from "./style";
import { useDropDownClasses } from "../styles";
import type { TreeSelectNodeBase, TreeSelectProps } from "./types";
import { buildOriginalTreeIndex, buildTreeView, filterTreeView, flattenTreeView, toggleExpandedId } from "./utils";
import { t } from "i18next";
import { Chevron, ChevronDirection, Preloader } from '@/index'
import { useToken } from '@/theme'

const defaultGetId = <T extends TreeSelectNodeBase>(n: T) => n.id;
const defaultGetChildren = <T extends TreeSelectNodeBase>(n: T) =>
  n.children as unknown as T[] | undefined;
const defaultGetLabel = <T extends TreeSelectNodeBase>(n: T) =>
  (n.code ?? n.name ?? "").toString();

export const TreeSelect = <T extends TreeSelectNodeBase>({
  options,
  selectedValue,
  onChange,
  inputValue,
  handleInput,
  placeholder = "Выберите",
  label,
  hintText,
  error,
  isDisable,
  isLoading,
  withoutClearIcon,
  fieldName,
  dataTestId,
  getOptionId,
  getOptionLabel,
  getOptionChildren,
}: TreeSelectProps<T>) => {
  const dropDownClasses = useDropDownClasses({})();

  const getId = getOptionId ?? defaultGetId;
  const getChildren = getOptionChildren ?? defaultGetChildren;
  const getLabel = getOptionLabel ?? defaultGetLabel;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const styles = useTreeSelectStyles({
    isDisable,
    value: !!selectedValue,
    error,
  })()

  const selectedId = selectedValue ? getId(selectedValue) : null;

  const originalIndex = useMemo(
    () =>
      buildOriginalTreeIndex<T>({
        options,
        getId,
        getChildren,
      }),
    [options, getId, getChildren]
  );

  const treeView = useMemo(
    () =>
      buildTreeView<T>({
        options,
        getChildren,
      }),
    [options, getChildren]
  );

  const { tree: filteredTree, autoExpandIds } = useMemo(
    () =>
      filterTreeView<T>({
        tree: treeView,
        query: inputValue,
        getId,
        getLabel,
      }),
    [treeView, inputValue, getId, getLabel]
  );

  const expandedIdsEffective = useMemo(() => {
    const q = inputValue.trim();
    if (q) {
      // При поиске авто-раскрываем ветки к совпадениям,
      // но также учитываем ручные раскрытия пользователем.
      return new Set<string>([...autoExpandIds, ...expandedIds]);
    }
    return new Set(expandedIds);
  }, [inputValue, autoExpandIds, expandedIds]);

  const rows = useMemo(
    () =>
      flattenTreeView<T>({
        tree: filteredTree,
        expandedIds: expandedIdsEffective,
        getId,
      }),
    [filteredTree, expandedIdsEffective, getId]
  );

  const isLeafInOriginal = useCallback(
    (id: string) => !originalIndex.hasChildrenById.get(id),
    [originalIndex.hasChildrenById]
  );

  const canOpen = !isDisable && !isLoading;

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!canOpen) {
        return;
      }
      setAnchorEl(containerRef.current);
      setOpen(true);
    },
    [canOpen]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setExpandedIds([]);
    handleInput?.("");
  }, [handleInput]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === e.currentTarget ||
        (e.target as HTMLElement).closest(".tree-select-input-area")
      ) {
        inputRef.current?.focus();
      }
      handleOpen(e);
    },
    [handleOpen]
  );

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleOpen(e);
    },
    [handleOpen]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.(null);
      handleInput?.("");
    },
    [onChange, handleInput]
  );

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => toggleExpandedId(prev, id));
  }, []);

  const handleSelectNode = useCallback(
    (node: T) => {
      onChange?.(node);
      setOpen(false);
      handleInput?.("");
    },
    [onChange, handleInput]
  );

  const handleRowClick = useCallback(
    (rowNode: T, hasChildrenVisible: boolean) => {
      const id = getId(rowNode);
      if (isLeafInOriginal(id)) {
        handleSelectNode(rowNode);
        return;
      }
      if (hasChildrenVisible) {
        handleToggleExpand(id);
      }
    },
    [getId, handleSelectNode, handleToggleExpand, isLeafInOriginal]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClose();
        inputRef.current?.blur();
      }
    },
    [handleClose]
  );

  const displaySelectedLabel = selectedValue ? getLabel(selectedValue) : "";
  const showSelectedText = !open && !!selectedValue;

  return (
    <FieldWrapper
      inputId={fieldName}
      label={label}
      hint={hintText}
      isDisabled={isDisable}
      isInvalid={error}
    >
      <Box
        ref={containerRef}
        onClick={handleContainerClick}
        className={classNames( styles.root,{
          "Mui-disabled": isDisable,
          "Mui-error": error,
          "Mui-expanded": open,
        })}
        data-test-id={`tree-select:${dataTestId ?? fieldName}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Box className={styles.inputArea}>
          {showSelectedText ? (
            <Box className={classNames(styles.selectedText, styles.input)} title={displaySelectedLabel}>
              {displaySelectedLabel}
            </Box>
          ) : (
            <Box
              component="input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput?.(e.target.value)
              }
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={selectedValue ? displaySelectedLabel : placeholder}
              disabled={isDisable}
              aria-label={label || placeholder}
              className={styles.input}
            />
          )}
        </Box>

        {isLoading ? (
            <Preloader/>
        ) : (
          <InputAdornment disablePointerEvents={isDisable} position="end" className={styles.iconsContainer}>
            {!withoutClearIcon && selectedValue && (
              <IconButton
                onClick={handleClear}
                aria-label="Очистить"
                className={styles.chevronButton}
              >
                <XThinIcon />
              </IconButton>
            )}
            <IconButton
              aria-label={open ? "Закрыть список" : "Открыть список"}
              className={styles.chevronButton}
            >
              <Chevron className="chevronIcon" size={16} direction={open ? ChevronDirection.UP : ChevronDirection.DOWN}/>
            </IconButton>
          </InputAdornment>
        )}
      </Box>

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
              minWidth: anchorEl?.clientWidth,
            },
            className: dropDownClasses.paper
          },
        }}
      >
        <Box className={styles.popoverContent}>
          <Box className={dropDownClasses.listBox} role="listbox" aria-label="Дерево опций">
            {rows.length === 0 ? (
              <Box className={styles.label}>{t("Shared:noOptions")}</Box>
            ) : (
              rows.map((r) => {
                const id = getId(r.node);
                const isSelected = selectedId != null && id === selectedId;
                const nodeLabel = getLabel(r.node);
                const isDisabledRow = !!isDisable;
                const isExpanded = expandedIdsEffective.has(id);

                return (
                  <Box
                    key={id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleRowClick(r.node, r.hasChildrenVisible)}
                    className={styles.row}
                  >
                    <Box className={styles.label} title={nodeLabel} sx={{paddingLeft: r.level * 2}}>
                      {nodeLabel}
                    </Box>
                    {r.hasChildrenVisible && (
                      <IconButton
                        className={styles.chevronButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpand(id);
                        }}
                        aria-label={isExpanded ? "Свернуть" : "Развернуть"}
                        disabled={isDisabledRow}
                      >
                        <Chevron
                          size={16}
                          direction={isExpanded ? ChevronDirection.UP : ChevronDirection.DOWN}
                        />
                      </IconButton>
                    )}
                    {isSelected && (
                      <SvgCheckIcon
                        color={String(useToken("dropdown_list_items/color/icon/default"))}
                        size={20}
                      />
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Popover>
    </FieldWrapper>
  );
};
