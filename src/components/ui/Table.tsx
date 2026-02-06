import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type React from "react";

export type HeaderColumn = {
  label: string;
  key: string;
  width?: number | string;
  minWidth?: number | string;
  filterType?: "text" | "select";
  options?: { label: string; value: string }[];
};
export interface InputTableProps {
  headersColumn: HeaderColumn[];
  children: React.ReactNode;
  hasCheckbox?: boolean;
  isSelectedAll?: boolean;
  handleSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTableWrapperCustom = ({
  headersColumn,
  children,
  hasCheckbox = true,
  isSelectedAll,
  handleSelectAll,
}: InputTableProps) => {
  return (
    <Table
      sx={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 6px",
      }}
    >
      <TableHead>
        <TableRow
          sx={{
            background:
              "linear-gradient(135deg, rgba(217,70,239,0.15), rgba(147,51,234,0.1))",
          }}
        >
          {hasCheckbox && (
            <TableCell
              sx={{
                width: 48,
                padding: "12px 16px",
                border: "none",
              }}
            >
              <Checkbox
                checked={!!isSelectedAll}
                onChange={handleSelectAll}
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": { color: "primary.main" },
                }}
              />
            </TableCell>
          )}

          {headersColumn.map(({ label, width, minWidth }) => (
            <TableCell
              key={label}
              sx={{
                minWidth,
                width,
                padding: "12px 16px",
                verticalAlign: "middle",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "primary.main",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody
        sx={{
          "& .MuiTableRow-root": {
            background: "#ffffff",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            transition: "all .2s ease",
          },
          "& .MuiTableRow-root:hover": {
            background:
              "linear-gradient(135deg, rgba(217,70,239,0.12), rgba(147,51,234,0.08))",
          },
          "& .MuiTableCell-root": {
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            color: "text.primary",
            fontSize: 14,
            verticalAlign: "middle",
            whiteSpace: "nowrap",
          },
        }}
      >
        {children}
      </TableBody>
    </Table>
  );
};
