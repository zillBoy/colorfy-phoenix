"use client";

// React Dependencies
import React, { useCallback } from "react";

// Internal Dependencies
import { TableWithModal } from "@/components/table/TableWithModal";
import { categoriesData } from "@/db/categories";
import { CategoryProps, ColumnProp } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";

const initialVisibleColumns = ["id", "name", "position", "status", "actions"];
const columns: ColumnProp[] = convertColumnKeysIntoObject(
  initialVisibleColumns
);

export default function Categories() {
  const addCategoryContent = useCallback(() => {
    return (
      <div>
        <p>This is the add category modal!</p>
      </div>
    );
  }, []);

  const updateCategoryContent = useCallback(() => {
    return (
      <div>
        <p>This is the UPDATE category modal!</p>
      </div>
    );
  }, []);

  const deleteCategoryContent = useCallback(() => {
    return (
      <div>
        <p>Delete - Category</p>
      </div>
    );
  }, []);

  const onAddCategory = async () => {
    try {
      console.log("onAddCategory called!: ");
    } catch (err) {
      console.log("Error in onAddCategory: ", err);
    }
  };

  const onUpdateCategory = async (item: CategoryProps) => {
    try {
      console.log("onUpdateCategory called!: ", item);
    } catch (err) {
      console.log("Error in onUpdateCategory: ", err);
    }
  };

  const onDeleteCategory = async (item: CategoryProps) => {
    try {
      console.log("onDeleteCategory called!: ", item);
    } catch (err) {
      console.log("Error in onDeleteCategory: ", err);
    }
  };

  return (
    <TableWithModal
      title="Category"
      initialVisibleColumns={initialVisibleColumns}
      columns={columns}
      data={categoriesData}
      modalAddContent={addCategoryContent}
      modalUpdateContent={updateCategoryContent}
      modalDeleteContent={deleteCategoryContent}
      onAdd={onAddCategory}
      onUpdate={onUpdateCategory}
      onDelete={onDeleteCategory}
      showStatus
    />
  );
}
