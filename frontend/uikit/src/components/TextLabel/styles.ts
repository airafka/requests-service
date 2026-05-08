import { Theme } from "@mui/material/styles";
import { createUseStyles } from "../../hooks/createUseStyles";
import { useToken, useFont } from "../../theme/utils/useToken";
import { FontSize, FontWeight } from "./types";

export interface TextLabelStyleProps {
  size: FontSize;
  weight: FontWeight;
  theme: Theme;
  error?: boolean;
}

type FontTokenKey = `${FontSize}_${FontWeight}`;

const getFontStyles = (size: FontSize, weight: FontWeight): string => {
  const key: FontTokenKey = `${size}_${weight}`;
  
  const fontTokenMap: Partial<Record<FontTokenKey, { size: string; weight: string;}>> = {
    "8_400": { size: "typography/tooltip/t1/font_size", weight: "typography/tooltip/t1/font_weight"},
    
    "10_400": { size: "typography/paragraph/p6/font_size", weight: "typography/paragraph/p6/font_weight"},
    "10_500": { size: "typography/paragraph/p5/font_size", weight: "typography/paragraph/p5/font_weight"},
    
    "12_500": { size: "typography/badge/font_size", weight: "typography/badge/font_weight" },
    
    "14_400": { size: "typography/paragraph/p4/font_size", weight: "typography/paragraph/p4/font_weight"},
    "14_500": { size: "typography/paragraph/p3/font_size", weight: "typography/paragraph/p3/font_weight"},
    
    "16_400": { size: "typography/paragraph/p2/font_size", weight: "typography/paragraph/p2/font_weight"},
    "16_500": { size: "typography/paragraph/p1/font_size", weight: "typography/paragraph/p1/font_weight"},
    "16_600": { size: "typography/heading/h3/font_size", weight: "typography/heading/h3/font_weight"},
    
    "20_600": { size: "typography/heading/h2/font_size", weight: "typography/heading/h2/font_weight"},
    
    "24_600": { size: "typography/heading/h1/font_size", weight: "typography/heading/h1/font_weight"},
  };
  
  const tokens = fontTokenMap[key];

  if (tokens) {
    return useFont({
      size: tokens.size,
      weight: tokens.weight,
      family: "typography/font_family",
    });
  }

  return "400 16px Inter" //Если токена нет, то он определит дефолтное значение
  
   
};

export const getTextLabelStyles = ({
  size,
  weight,
  theme,
  error,
}: TextLabelStyleProps) => {
  return createUseStyles({
    label: {
      font: getFontStyles(size, weight),
      color: error ? "#E8493D" : useToken("text_label/color/text_label"),
    },
    required: {
      color: "#e8493d",
    },
  });
};
