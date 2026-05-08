import classNames from "classnames";
import { Chip, useTheme } from "@mui/material";
import { ITooltype } from "@/components/ITooltype";
import { OverflowText } from "@/components/OverflowText";
import { XIcon } from "@/icons";
import { colorBadge, BadgeProps } from "./types";
import { useStyles } from "./styles";

export const Badge = ({
  type = "default",
  color = colorBadge.gray,
  maxWidth,
  hasDot = false,
  hasHint = false,
  text,
  onClick,
  index,
  customClassName,
  onDelete,
  className,
  hiddenBadgeDeleteIcon,
  dataTestId,
  ...props
}: BadgeProps) => {
  const theme = useTheme();
  const classes = useStyles({ theme, maxWidth, hasDot, hasDelete: !!onDelete });
  const badgeColor = type === "loading" ? colorBadge.loading : color;
  const isLoading = badgeColor === colorBadge.loading;

  const getColorClass = (color: colorBadge): string => {
    switch (color) {
      case colorBadge.gray:
        return classes.badgeGray;
      case colorBadge.purple:
        return classes.badgePurple;
      case colorBadge.red:
        return classes.badgeRed;
      case colorBadge.yellow:
        return classes.badgeYellow;
      case colorBadge.green:
        return classes.badgeGreen;
      case colorBadge.blue:
        return classes.badgeBlue;
      case colorBadge.lightGreen:
        return classes.badgeLightGreen;
      case colorBadge.lightPurple:
        return classes.badgeLightPurple;
      case colorBadge.lightYellow:
        return classes.badgeLightYellow;
      case colorBadge.lightRed:
        return classes.badgeLightRed;
      case colorBadge.softGreen:
        return classes.badgeSoftGreen;
      case colorBadge.darkGray:
        return classes.badgeDarkGray;
      case colorBadge.loading:
      default:
        return classes.badgeLoading;
    }
  };

  const content = isLoading ? (
    <div className="shimmer-loader">
      <Chip
        className={classNames(classes.badge, classes.badgeLoading)}
        label=""
      />
    </div>
  ) : (
    <Chip
      {...props}
      data-test-id={dataTestId}
      className={classNames(customClassName, className, classes.badge, getColorClass(badgeColor))}
      icon={hasDot ? <span className={classes.dot} /> : undefined}
      deleteIcon={onDelete && !hiddenBadgeDeleteIcon ? <XIcon className={classes.xIcon} /> : undefined}
      label={
        maxWidth
          ? <OverflowText tooltipText={text}>{text}</OverflowText>
          : text
      }
      onClick={onClick ? () => onClick(index) : undefined}
      onDelete={onDelete && !hiddenBadgeDeleteIcon ? () => onDelete(index) : undefined}
    />
  );

  return hasHint && !isLoading ? (
    <ITooltype id={""} label={text} item={content} />
  ) : (
    content
  );
};
