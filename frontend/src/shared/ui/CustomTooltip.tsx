import { Paper } from "@mui/material";

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  width?: number;
  padding?: number;
  isErrored?: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function CustomTooltip({
  children,
  content,
  isErrored = false,
  open,
  setOpen
}: CustomTooltipProps) {

  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{children}</div>

      {open && (
        <div className="absolute z-50 bottom-full left-0 mb-2">
          <Paper
            className={`shadow-lg! rounded-lg! relative ${
              !isErrored ? "bg-white!" : "bg-[#FEE9E7]!"
            }`}
          >
            <div style={{ padding: `0px 8px` }}>{content}</div>
          </Paper>
        </div>
      )}
    </div>
  );
}