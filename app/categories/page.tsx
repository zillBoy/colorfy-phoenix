"use client";

// React Dependencies
import React from "react";

// Internal Dependencies
import { categoriesData } from "@/db/categories";
import { Table } from "@/components/table/Table";

type ColumnProp = {
  key: string;
  label: string;
};

const initialVisibleColumns = ["id", "name", "position", "status", "actions"];
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
    key: "actions",
    label: "ACTIONS",
  },
];

export default function Categories() {
  return (
    <Table
      initialVisibleColumns={initialVisibleColumns}
      columns={columns}
      data={categoriesData}
    />
  );
}
