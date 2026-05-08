import { t } from "i18next";

export const getTranslatedValueForSelect = (value = "", translatePath?: string) => {
  if (!value) {
    return "";
  }
  const lastChar = translatePath?.slice(-1);
  const pathSeparator = lastChar === ":" ? "" : ".";
  const translatedValue = translatePath ? t(translatePath + pathSeparator + value) : value;
  return translatedValue;
};
