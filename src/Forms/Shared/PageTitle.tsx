import { IconButton, Stack, Tooltip, Typography, TooltipProps } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FC } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export interface TitleWithToolTipProps {
  title: string;
  toolTipText?: string;
  placement?: TooltipProps["placement"];
}

export interface PageTitleProps extends TitleWithToolTipProps {
  page: number;
  showControls: boolean;
  onBackClick: () => void;
  onNextClick: () => void;
}

const pageValidation = [
  ["date", "location"],
  ["timeIn", "timeOut", "highTide", "lowTide"],
  ["swell", "wind"],
];

export const PageTitle: FC<PageTitleProps> = ({
  title,
  page,
  toolTipText,
  showControls,
  onBackClick,
  onNextClick,
}) => {
  const {
    trigger,
    formState: { errors },
    formState,
    getValues,
  } = useFormContext();

  console.log("pageValidation[page]", pageValidation[page - 1]);
  console.log("form values", getValues());

  return (
    <Stack direction="row" justifyContent="space-evenly">
      <TitleWithToolTip title={title} toolTipText={toolTipText} />
      {showControls ? (
        <Stack direction="row">
          <IconButton size="large" onClick={() => onBackClick()} disabled={page === 1}>
            <ChevronLeftIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            size="large"
            onClick={async () => {
              const isStepValid = await trigger(pageValidation[page - 1]);

              console.log("isValidStep", isStepValid);

              if (isStepValid) {
                onNextClick();
              } else {
                console.log(errors);
              }
            }}
            disabled={page === 5}>
            <ChevronRightIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ) : null}
    </Stack>
  );
};

export const TitleWithToolTip: FC<TitleWithToolTipProps> = ({ toolTipText, title, placement = "right" }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{title}</Typography>
      {toolTipText && (
        <Tooltip title={toolTipText} placement={placement}>
          <IconButton disableFocusRipple disableRipple disableTouchRipple>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};
