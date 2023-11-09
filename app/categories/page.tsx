"use client";

// React Dependencies
import React, { useState, useMemo, ReactNode } from "react";

// Internal Dependencies
import { useDisclosure } from "@nextui-org/react";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { Modal } from "@/components/modal/Modal";
import { categoriesData } from "@/db/categories";

import { CategoryProps, ModalSizeProp } from "@/types";

type ColumnProp = {
  key: string;
  label: string;
};

type ModalContentProps = {
  title: string;
  size: ModalSizeProp;
  actionBtnText: string;
  bodyContent: ReactNode;
  onAction: (item?: CategoryProps) => void;
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContentProps>({
    title: "",
    size: "md",
    actionBtnText: "",
    bodyContent: null,
    onAction: () => {},
  });

  const addCategoryContent = useMemo(() => {
    return (
      <div>
        <p>This is the add category modal!</p>
      </div>
    );
  }, []);

  const deleteCategoryContent = useMemo(() => {
    return (
      <div>
        <p>Delete - Category</p>
      </div>
    );
  }, []);

  const updateCategoryContent = useMemo(() => {
    return (
      <div>
        <p>This is the UPDATE category modal!</p>
      </div>
    );
  }, []);

  const onAddCategory = () => {
    console.log("onAddCategory called!: ");
  };

  const onDeleteCategory = (item: CategoryProps) => {
    console.log("onDeleteCategory called!: ", item);
  };

  const onUpdateCategory = (item: CategoryProps) => {
    console.log("onUpdateCategory called!: ", item);
  };

  const openAddModal = () => {
    setModalContent({
      title: "Add Category",
      size: "3xl",
      actionBtnText: "Add",
      bodyContent: addCategoryContent,
      onAction: onAddCategory,
    });

    onOpen();
  };

  const openDeleteModal = (item: CategoryProps) => {
    setModalContent({
      title: "Delete Category",
      size: "2xl",
      actionBtnText: "Delete",
      bodyContent: deleteCategoryContent,
      onAction: () => onDeleteCategory(item),
    });

    onOpen();
  };

  const openUpdateModal = (item: CategoryProps) => {
    setModalContent({
      title: "Update Category",
      size: "3xl",
      actionBtnText: "Update",
      bodyContent: updateCategoryContent,
      onAction: () => onUpdateCategory(item),
    });

    onOpen();
  };

  return (
    <>
      <Table
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        data={categoriesData}
        onAdd={openAddModal}
        onDelete={openDeleteModal}
        onUpdate={openUpdateModal}
      />

      <Modal
        title={modalContent.title}
        actionBtnText={modalContent.actionBtnText}
        isOpen={isOpen}
        bodyContent={modalContent.bodyContent}
        size={modalContent.size}
        onOpenChange={onOpenChange}
        onAction={modalContent.onAction}
      />
    </>
  );
}
