"use client";

// React Dependencies
import React, { useState, useCallback, useMemo } from "react";

// External Dependencies
import _ from "lodash";
import {
  Table as NTable,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  Trash2 as TrashIcon,
  Edit3 as EditIcon,
  Search as SearchIcon,
  ChevronDown as ChevronDownIcon,
  Plus as PlusIcon,
} from "react-feather";

// Internal Dependencies
import Chip from "@/components/chip/Chip";
import { StatusProps } from "@/types";

type ColumnProp = {
  key: string;
  label: string;
};

export type TableProps = {
  initialVisibleColumns: string[];
  columns: ColumnProp[];
  data: any;
  filterKey?: "name";
};

const statusOptions = [
  { name: "Published", key: "Published" },
  { name: "Inactive", key: "Inactive" },
];

export const Table = ({
  initialVisibleColumns,
  columns,
  data,
  filterKey = "name",
}: TableProps) => {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string | Set<string>>(
    new Set(initialVisibleColumns)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns, columns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    // Search
    if (hasSearchFilter) {
      filteredData = filteredData.filter((filterData) =>
        filterData[filterKey].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Status
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((filterData) =>
        Array.from(statusFilter).includes(filterData.status)
      );
    }

    return filteredData;
  }, [data, filterKey, filterValue, statusFilter, hasSearchFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const getStatusColor = useCallback((status: StatusProps) => {
    if (status === "Published") {
      return "success";
    } else if (status === "Inactive") {
      return "danger";
    }

    return "default";
  }, []);

  const renderCell = React.useCallback(
    (item: any, columnKey: any) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              chipText={item.status}
              color={getStatusColor(item.status)}
              variant="flat"
              raidus="full"
            />
          );
        case "actions":
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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            placeholder="Search by name..."
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />}>
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.key} className="capitalize">
                    {_.capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />}>
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {_.capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    columns,
    filterValue,
    statusFilter,
    visibleColumns,
    onClear,
    onSearchChange,
  ]);

  return (
    <div className="mx-auto my-2 w-98per">
      <NTable
        aria-label="Categories"
        selectionMode="multiple"
        topContent={topContent}
      >
        <TableHeader columns={headerColumns}>
          {(column: ColumnProp) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={items}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey: ColumnProp) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </NTable>
    </div>
  );
};
