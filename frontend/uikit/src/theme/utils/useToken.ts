import { tokens } from "../tokens";

export enum TokenReturnType {
  VALUE = "value",
  PX = "px",
}

type BoxShadowConfig = {
  x: string | number;
  y: string | number;
  blur: string | number;
  spread?: string | number;
  color: string;
  inset?: boolean;
};

export enum BorderStyle {
  SOLID = "solid",
  DASHED = "dashed",
  DOTTED = "dotted",
  DOUBLE = "double",
  NONE = "none",
}

function isColor(value: any): boolean {
  if (typeof value !== "string") {
    return false;
  }
  if (value.startsWith("#")) {
    return true;
  }
  if (value.startsWith("rgb") || value.startsWith("hsl")) {
    return true;
  }
  return false;
}

function transformValue(
  value: any,
  returnType: TokenReturnType,
): string | number | undefined {
  if (returnType === TokenReturnType.PX && isColor(value)) {
    return value;
  }

  if (returnType === TokenReturnType.PX) {
    if (typeof value === "number") {
      return `${value}px`;
    }
    if (typeof value === "string") {
      if (value.endsWith("px")) {
        return value;
      }
      return `${value}px`;
    }
  }
  return value;
}

export function useToken(
  path: string,
  returnType: TokenReturnType = TokenReturnType.VALUE,
  fallback?: any,
): string | number | undefined {
  const keys = path.includes("/") ? path.split("/") : path.split("-");

  let result: any = tokens;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      if (fallback !== undefined) {
        return transformValue(fallback, returnType);
      }
      return undefined;
    }
  }

  return transformValue(result, returnType);
}

export function useBorder(
  config:
    | string
    | {
        width: string | number;
        style: BorderStyle;
        color: string;
      },
): string {
  if (typeof config === "string") {
    return useToken(config) as string;
  }

  const { width, style, color } = config;

  const widthValue =
    typeof width === "string"
      ? useToken(width, TokenReturnType.PX)
      : `${width}px`;

  const colorValue = typeof color === "string" ? useToken(color) : color;

  return `${widthValue} ${style} ${colorValue}`;
}

function createSingleShadow(config: BoxShadowConfig): string {
  const { x, y, blur, spread = 0, color, inset = false } = config;

  const xValue =
    typeof x === "string" ? useToken(x, TokenReturnType.PX) : `${x}px`;
  const yValue =
    typeof y === "string" ? useToken(y, TokenReturnType.PX) : `${y}px`;
  const blurValue =
    typeof blur === "string" ? useToken(blur, TokenReturnType.PX) : `${blur}px`;
  const spreadValue =
    typeof spread === "string"
      ? useToken(spread, TokenReturnType.PX)
      : `${spread}px`;
  const colorValue = typeof color === "string" ? useToken(color) : color;

  const insetPrefix = inset ? "inset " : "";
  return `${insetPrefix}${xValue} ${yValue} ${blurValue} ${spreadValue} ${colorValue}`;
}

export function useBoxShadow(
  config: BoxShadowConfig | BoxShadowConfig[],
): string {
  if (Array.isArray(config)) {
    return config.map(createSingleShadow).join(", ");
  }

  return createSingleShadow(config);
}

export function useSpacing(
  config:
    | string
    | number
    | {
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
        vertical?: string | number;
        horizontal?: string | number;
      },
): string {
  if (typeof config === "string") {
    return useToken(config, TokenReturnType.PX) as string;
  }
  if (typeof config === "number") {
    return `${config}px`;
  }

  if ("vertical" in config || "horizontal" in config) {
    const v = config.vertical;
    const h = config.horizontal;

    const vValue = v
      ? typeof v === "string"
        ? useToken(v, TokenReturnType.PX)
        : `${v}px`
      : "0";
    const hValue = h
      ? typeof h === "string"
        ? useToken(h, TokenReturnType.PX)
        : `${h}px`
      : "0";

    return `${vValue} ${hValue}`;
  }

  const { top = 0, right = 0, bottom = 0, left = 0 } = config;

  const getValue = (val: string | number) =>
    typeof val === "string" ? useToken(val, TokenReturnType.PX) : `${val}px`;

  return `${getValue(top)} ${getValue(right)} ${getValue(bottom)} ${getValue(left)}`;
}

export function useFont(config: {
  weight?: string | number;
  size: string | number;
  lineHeight?: string | number;
  family?: string;
}): string {
  const { size, weight, lineHeight, family } = config;

  const sizeValue =
    typeof size === "string" ? useToken(size, TokenReturnType.PX) : `${size}px`;
  const weightValue = weight
    ? typeof weight === "string"
      ? useToken(weight)
      : weight
    : "";
  const lineHeightValue = lineHeight
    ? typeof lineHeight === "string"
      ? useToken(lineHeight, TokenReturnType.PX)
      : `${lineHeight}px`
    : "";

  const familyValue = family
    ? typeof family === "string"
      ? useToken(family)
      : family
    : useToken("typography/font_family");

  let result = "";
  if (weightValue) result += `${weightValue} `;
  result += sizeValue;
  if (lineHeightValue) result += `/${lineHeightValue}`;
  result += ` ${familyValue}`;

  return result.trim();
}

export function useBorderRadius(config: {
  topLeft?: string | number;
  topRight?: string | number;
  bottomRight?: string | number;
  bottomLeft?: string | number;
}): string {
  const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = config;

  const getValue = (val: string | number) =>
    typeof val === "string" ? useToken(val, TokenReturnType.PX) : `${val}px`;

  return `${getValue(topLeft)} ${getValue(topRight)} ${getValue(bottomRight)} ${getValue(bottomLeft)}`;
}
