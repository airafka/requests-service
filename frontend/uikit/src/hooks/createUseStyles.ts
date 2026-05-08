import { useMemo } from "react";
import { useTheme } from "@mui/material";
import { css, cx } from "@emotion/css";

export function createUseStyles(stylesDefinition: any): any {
  // Если это функция - возвращаем хук (как в react-jss)
  if (typeof stylesDefinition === "function") {
    return function useStyles(props = {}) {
      const hookTheme = useTheme();

      return useMemo(() => {
        // Вызываем функцию с theme из хука
        const stylesObj = stylesDefinition(hookTheme);
        const classes = {};

        for (const key in stylesObj) {
          let style = stylesObj[key];

          // Если это функция - выполняем её с props
          if (typeof style === "function") {
            style = style(props);
          }

          // Если это объект со свойствами-функциями - обрабатываем каждое свойство
          if (typeof style === "object" && style !== null) {
            const processedStyle = {};
            for (const prop in style) {
              if (typeof style[prop] === "function") {
                processedStyle[prop] = style[prop](props);
              } else {
                processedStyle[prop] = style[prop];
              }
            }
            style = processedStyle;
          }

          classes[key] = css({
            ...style,
            label: key, // Добавляем лейбл для отладки
          });
        }

        return classes;
      }, [hookTheme, JSON.stringify(props)]);
    };
  }

  // Если это объект - возвращаем функцию (не хук)
  // Но также поддерживаем паттерн useStyles(theme)() из BaseButton
  return function (propsOrTheme = {}) {
    // Если передан theme (имеет colors) - возвращаем функцию для props
    if (propsOrTheme && (propsOrTheme as any).colors) {
      return function (props = {}) {
        const classes = {};

        for (const key in stylesDefinition) {
          const style =
            typeof stylesDefinition[key] === "function"
              ? stylesDefinition[key](props)
              : stylesDefinition[key];

          classes[key] = css({
            ...style,
            label: key, // Добавляем лейбл для отладки
          });
        }

        return classes;
      };
    }

    // Обычное использование с props
    const classes = {};

    for (const key in stylesDefinition) {
      let style = stylesDefinition[key];

      // Если это функция - выполняем её с props
      if (typeof style === "function") {
        style = style(propsOrTheme);
      }

      // Если это объект со свойствами-функциями - обрабатываем каждое свойство
      if (typeof style === "object" && style !== null) {
        const processedStyle = {};
        for (const prop in style) {
          if (typeof style[prop] === "function") {
            processedStyle[prop] = style[prop](propsOrTheme);
          } else {
            processedStyle[prop] = style[prop];
          }
        }
        style = processedStyle;
      }

      classes[key] = css({
        ...style,
        label: key, // Добавляем лейбл для отладки
      });
    }

    return classes;
  };
}

// Экспортируем cx для объединения классов (аналог classNames)
export { cx };
