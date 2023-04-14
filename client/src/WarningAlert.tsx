import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { WarningAlertType } from "./utils/types";

export default function WarningAlert({ setError }: WarningAlertType) {
  return (
    <Box
      sx={{ display: "flex", gap: 2, width: "100%", flexDirection: "column" }}
    >
      <Alert
        startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
        variant="soft"
        color="danger"
        endDecorator={
          <React.Fragment>
            <IconButton
              variant="soft"
              size="sm"
              color="danger"
              onClick={() => setError(false)}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Typography color="danger" fontWeight="md">
          The URL field must contain a complete YouTube URL.
        </Typography>
      </Alert>
    </Box>
  );
}
