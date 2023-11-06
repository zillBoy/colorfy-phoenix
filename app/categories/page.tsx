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
import { CategoriesProps, CategoryStatusProps } from "@/types/categories";

const categoriesData: CategoriesProps = [
  {
    id: 1,
    name: "Animal",
    position: 1,
    status: "Published",
  },
  {
    id: 2,
    name: "Plant",
    position: 2,
    status: "Inactive",
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

  return (
    <div className="mx-auto my-2 w-98per">
      <Table aria-label="Categories" selectionMode="multiple">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>POSITION</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {categoriesData.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.position}</TableCell>
              <TableCell>
                <Chip
                  chipText={category.status}
                  color={getStatusColor(category.status)}
                  variant="flat"
                />
              </TableCell>
              <TableCell className="flex gap-2 p-3">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
