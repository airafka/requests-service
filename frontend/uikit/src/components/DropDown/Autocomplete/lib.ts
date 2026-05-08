import { t } from "i18next";

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

interface GetOptionLabelProps<T extends IdNonNullabelCodeNullable> {
  option: T;
  translatePath: string | undefined;
  renderValuePrimary?: string;
  renderValueSecondary?: string;
  defaultNullValue?: string;
  useRenderValuePattern?: boolean;
  hasItem?: boolean;
}

function readTrimmedStringField(
  option: object,
  key: string | undefined,
): string {
  if (!key) {
    return "";
  }
  const v = (option as Record<string, unknown>)[key];
  return typeof v === "string" && v.trim() ? v.trim() : "";
}

/** Semantic catalog code for i18n keys — must not use display-name fields here. */
function stableCatalogCode(option: IdNonNullabelCodeNullable): string {
  return typeof option.code === "string" ? option.code : "";
}

function optionDisplayName(option: IdNonNullabelCodeNullable): string {
  if (!("name" in option)) {
    return "";
  }
  const n = (option as { name?: string | null }).name;
  return typeof n === "string" && n.trim() ? n.trim() : "";
}

export const getOptionLabel = <T extends IdNonNullabelCodeNullable>({
  option,
  translatePath,
  renderValuePrimary,
  renderValueSecondary,
  defaultNullValue,
  useRenderValuePattern,
  hasItem = false,
}: GetOptionLabelProps<T>): string => {
  let code: string;
  let name: string;

  if (useRenderValuePattern) {
    code =
      String(
        option[renderValuePrimary as keyof IdNonNullabelCodeNullable] ?? "",
      ) ||
      stableCatalogCode(option) ||
      "";
    name =
      String(
        option[renderValueSecondary as keyof IdNonNullabelCodeNullable] ?? "",
      ) ||
      optionDisplayName(option) ||
      "";
  } else {
    code =
      stableCatalogCode(option) ||
      String(
        option[renderValuePrimary as keyof IdNonNullabelCodeNullable] ?? "",
      ) ||
      "";
    name =
      optionDisplayName(option) ||
      String(
        option[renderValueSecondary as keyof IdNonNullabelCodeNullable] ?? "",
      ) ||
      "";
  }

  if (!stableCatalogCode(option) && !("name" in option) && defaultNullValue) {
    return defaultNullValue;
  }

  if ("customValue" in option) {
    return option.customValue as string;
  }

  if ("customCode" in option) {
    return (
      (translatePath
        ? t(`${translatePath}.${option.customCode}`)
        : String(option.customCode)) + (name ? `_${name}` : "")
    );
  }

  const primaryField = readTrimmedStringField(
    option as object,
    renderValuePrimary,
  );
  if (primaryField) {
    return primaryField;
  }

  const catalogCode = stableCatalogCode(option);
  const apiName = optionDisplayName(option);

  if ("item" in option && hasItem && option.item) {
    const label =
      translatePath && catalogCode
        ? t(`${translatePath}.${catalogCode}`)
        : apiName || catalogCode || code;
    const item = option.item;
    return `${item} — ${label}`;
  }

  if (translatePath && catalogCode) {
    return t(`${translatePath}.${catalogCode}`);
  }

  if (apiName) {
    return apiName;
  }

  return code || catalogCode || defaultNullValue || "";
};
