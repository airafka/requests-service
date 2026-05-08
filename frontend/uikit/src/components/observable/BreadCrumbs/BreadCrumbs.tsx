import { observer } from "mobx-react";
import { FC } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useBreadCrumbsStyles } from "./styles";
import { BreadCrumbsProps } from "./types";

export const BreadCrumbs = observer<FC<BreadCrumbsProps>>(({ store }) => {
  const theme = useTheme();
  const classes = useBreadCrumbsStyles(theme);
  const { breadCrumbs } = store;

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      className={classes.root}
      separator={"-"}
    >
      {breadCrumbs.map((el, index: number) => {
        const isActive = index === breadCrumbs.length - 1;

        return (
          <Link
            to={el.path}
            key={`breadcrumbs-${el.path}`}
            className={classNames(classes.link, {
              [classes.activeLink]: isActive,
            })}
          >
            {el.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
});
