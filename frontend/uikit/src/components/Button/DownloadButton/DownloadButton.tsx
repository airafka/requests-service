import { getStyles } from "./styles.js";
import { ITooltype } from "../../ITooltype";
import { t } from "i18next";
import { useTheme } from "@mui/material";
import { DownloadToggleIcon } from "../../../icons";
import { ButtonIcon } from "../ButtonIcon";
import { Preloader } from "../../Preloader";
import { ButtonSize } from "../ButtonIcon/types";

export interface IDownloadButton {
  id: string;
  canShowButton: boolean;
  isDownloading: boolean;
  isDisabled?: boolean;
  fetchFileCallback: () => Promise<void>;
  customClasses?: string | null;
  linkReference?: React.MutableRefObject<HTMLAnchorElement | null>;
  buttonIconComponent?: React.ReactElement;
  label?: string;
  dataTestId?: string;
}

export default function DownloadButton({
  id,
  canShowButton,
  isDownloading,
  isDisabled,
  fetchFileCallback,
  customClasses,
  linkReference,
  buttonIconComponent,
  label,
  dataTestId,
}: IDownloadButton) {
  const theme = useTheme();
  const disabled = isDisabled ?? isDownloading;
  const classes = getStyles(theme)();
  const wrapperClass = customClasses ? customClasses : "";

  const icon = isDownloading ? (
    <Preloader />
  ) : (
    (buttonIconComponent ?? <DownloadToggleIcon />)
  );
  const tooltipText = disabled
    ? undefined
    : (label ?? t("Shared:download.label"));
  const buttonClass = `${classes.button} ${
    disabled ? classes.buttonDisabled : ""
  }`;

  return (
    <div className={wrapperClass}>
      {canShowButton && (
        <ITooltype
          id={id}
          item={
            <ButtonIcon
              icon={icon}
              size={ButtonSize.Regular}
              className={buttonClass}
              onClick={fetchFileCallback}
              dataTestId={dataTestId ?? `download-button-${id}`}
            />
          }
          label={tooltipText}
          isTranslate={false}
        />
      )}
      {linkReference && <a ref={linkReference} />}
    </div>
  );
}
