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
  required?: boolean;
  width?: number | string;
  minWidth?: number | string;
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
    <Table>
      <TableHead>
        <TableRow>
          {hasCheckbox && (
            <TableCell sx={{ width: 51 }}>
              <Checkbox checked={!!isSelectedAll} onChange={handleSelectAll} />
            </TableCell>
          )}
          {headersColumn.map(({ label, width, minWidth }) => (
            <TableCell
              key={label}
              sx={{ minWidth, width, flexShrink: 0, mt: "-4px" }}
            >
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  );
};