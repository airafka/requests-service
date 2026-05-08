import { FC, ReactNode } from "react";

interface PreloaderPageProps {
  children?: ReactNode;
  isLoading?: boolean;
}

export const PreloaderPage: FC<PreloaderPageProps> = ({
  children,
  isLoading,
}) => {
  if (isLoading === undefined) {
    return <div className="shimmer-loader">{children}</div>;
  } else {
    return isLoading ? (
      <div className="shimmer-loader">{children}</div>
    ) : (
      children
    );
  }
};
