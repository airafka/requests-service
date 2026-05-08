import { FC } from "react";
import { Chip, Box, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";

interface TabValidationBadgeProps {
  errorCount?: number;
  showSuccess?: boolean;
}

export const TabValidationBadge: FC<TabValidationBadgeProps> = ({
  errorCount,
  showSuccess = false,
}) => {
  const theme = useTheme();
  if (errorCount && errorCount > 0) {
    return (
      <Chip
        label={errorCount}
        size="small"
        sx={{
          ml: 0.5,
          mb: "7px",
          minWidth: "14px",
          height: "14px",
          borderRadius: "20px",
          backgroundColor: theme.colors.label.red_3,
          color: "white",
          fontSize: "10px",
          fontWeight: 400,
          "& .MuiChip-label": {
            px: 0.5,
          },
        }}
      />
    );
  }

  if (showSuccess) {
    return (
      <Box
        sx={{
          ml: 0.5,
          mb: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "14px",
          height: "14px",
          borderRadius: "20px",
          backgroundColor: "#2e7d32",
        }}
      >
        <Check
          sx={{
            fontSize: "10px",
            color: "white",
          }}
        />
      </Box>
    );
  }

  return null;
};
