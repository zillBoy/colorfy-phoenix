"use client";

// React Dependencies
import React, { useCallback } from "react";

// External Dependencies
import _ from "lodash";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { Trash2 as TrashIcon, Edit3 as EditIcon } from "react-feather";

// Internal Dependencies
import Chip from "@/components/chip/Chip";
import { CategoryProps, CategoryStatusProps } from "@/types/categories";
import { categoriesData } from "@/db/categories";

type ColumnProp = {
  key: string;
  label: string;
};

const columns: ColumnProp[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "position",
    label: "POSITION",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function Categories() {
  const getStatusColor = useCallback((status: CategoryStatusProps) => {
    if (status === "Published") {
      return "success";
    } else if (status === "Inactive") {
      return "danger";
    }

    return "default";
  }, []);

  const renderCell = React.useCallback(
    (category: CategoryProps, columnKey: string) => {
      const cellValue = category[columnKey];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              chipText={category.status}
              color={getStatusColor(category.status)}
              variant="flat"
            />
          );
        case "action":
          return (
            <div className="flex gap-2 p-3">
              <Tooltip color="success" content="Edit category">
                <span className="text-lg cursor-pointer text-danger active:opacity-50">
                  <EditIcon size={20} color="#6C6C75" />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete category">
                <span className="text-lg cursor-pointer text-danger active:opacity-50">
                  <TrashIcon size={20} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [getStatusColor]
  );

  return (
    <div className="mx-auto my-2 w-98per">
      <Table aria-label="Categories" selectionMode="multiple">
        <TableHeader columns={columns}>
          {(column: ColumnProp) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={categoriesData}>
          {(category: CategoryProps) => (
            <TableRow key={category.id}>
              {(columnKey: ColumnProp) => (
                <TableCell>{renderCell(category, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
