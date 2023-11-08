"use client";

// React Dependencies
import React, { useCallback, useMemo, useState } from "react";

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
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
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
import { CategoryProps, CategoryStatusProps } from "@/types/categories";
import { categoriesData as tableData } from "@/db/categories";

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
    key: "actions",
    label: "ACTIONS",
  },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "position", "status", "actions"];

const statusOptions = [
  { name: "Published", key: "Published" },
  { name: "Inactive", key: "Inactive" },
];

export default function Categories() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns]);

  const getStatusColor = useCallback((status: CategoryStatusProps) => {
    if (status === "Published") {
      return "success";
    } else if (status === "Inactive") {
      return "danger";
    }

    return "default";
  }, []);

  const filteredItems = useMemo(() => {
    let filteredTableData = [...tableData];

    if (hasSearchFilter) {
      filteredTableData = filteredTableData.filter((tableData) =>
        tableData.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredTableData = filteredTableData.filter((tableData) =>
        Array.from(statusFilter).includes(tableData.status)
      );
    }

    return filteredTableData;
  }, [filterValue, statusFilter, hasSearchFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItem = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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

  const onSearchChange = useCallback((value) => {
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
  }, [filterValue, statusFilter, visibleColumns, onClear, onSearchChange]);

  return (
    <div className="mx-auto my-2 w-98per">
      <Table
        aria-label="Categories"
        selectionMode="multiple"
        topContent={topContent}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: ColumnProp) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={sortedItem}>
          {(item: CategoryProps) => (
            <TableRow key={item.id}>
              {(columnKey: ColumnProp) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
