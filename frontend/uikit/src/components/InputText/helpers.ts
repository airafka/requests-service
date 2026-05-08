import { useToken } from "@/theme";

interface GetIconColorParams {
  isDisabled: boolean;
  hasValue: boolean;
  isInvalid: boolean;
}

export const getIconStartColor = ({
  isDisabled,
  hasValue,
  isInvalid,
}: GetIconColorParams): string | number => {
  if (isDisabled) {
    return useToken("input/color/icon/disabled");
  }

  if (hasValue) {
    return isInvalid
      ? useToken("input/color/icon/error")
      : useToken("input/color/icon/filled");
  }

  return useToken("input/color/icon/default");
};
