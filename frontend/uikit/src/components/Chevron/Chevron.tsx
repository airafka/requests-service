import { FC } from "react";
import { ChevronProps, ChevronDirection } from "./types";
import { ChevronIcon } from "../../icons";
import chevronStyles from "./styles";

const Chevron: FC<ChevronProps> = ({
  direction = ChevronDirection.DOWN,
  size = 20,
  color,
  className,
  dataTestId,
  hover
}) => {
  const classes = chevronStyles({ size, color, hover });

  return (
    <ChevronIcon
      className={`${classes.chevron} ${direction} ${className}`}
      data-test-id={dataTestId}
    />
  );
};

export default Chevron;
