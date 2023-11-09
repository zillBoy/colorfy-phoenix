// React Dependencies
import React, { useState, ReactNode } from "react";

// External Dependencies
import { useDisclosure } from "@nextui-org/react";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { Modal } from "@/components/modal/Modal";
import { CategoryProps, ModalSizeProp, ColumnProp } from "@/types";

type ModalContentProps = {
  title: string;
  size: ModalSizeProp;
  actionBtnText: string;
  bodyContent: ReactNode;
  onAction: (item?: CategoryProps | any) => void;
};

type TableWithModalProps = {
  title: string;
  initialVisibleColumns: string[];
  columns: ColumnProp[];
  data: CategoryProps[] | any;
  modalAddContent: ReactNode;
  modalUpdateContent: ReactNode;
  modalDeleteContent: ReactNode;
  onAdd: () => void;
  onUpdate: (item: CategoryProps | any) => void;
  onDelete: (item: CategoryProps | any) => void;
};

export const TableWithModal = ({
  title,
  initialVisibleColumns,
  columns,
  data,
  modalAddContent,
  modalUpdateContent,
  modalDeleteContent,
  onAdd,
  onUpdate,
  onDelete,
}: TableWithModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContentProps>({
    title: "",
    size: "md",
    actionBtnText: "",
    bodyContent: null,
    onAction: () => {},
  });

  const openAddModal = () => {
    setModalContent({
      title: `Add ${title}`,
      size: "3xl",
      actionBtnText: "Add",
      bodyContent: modalAddContent,
      onAction: onAdd,
    });

    onOpen();
  };

  const openUpdateModal = (item: CategoryProps | any) => {
    setModalContent({
      title: `Update ${title}`,
      size: "3xl",
      actionBtnText: "Update",
      bodyContent: modalUpdateContent,
      onAction: () => onUpdate(item),
    });

    onOpen();
  };

  const openDeleteModal = (item: CategoryProps | any) => {
    setModalContent({
      title: `Delete ${title}`,
      size: "2xl",
      actionBtnText: "Delete",
      bodyContent: modalDeleteContent,
      onAction: () => onDelete(item),
    });

    onOpen();
  };

  return (
    <>
      <Table
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        data={data}
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
};
