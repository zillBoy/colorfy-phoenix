// React Dependencies
import React, { useState } from "react";

// External Dependencies
import { useDisclosure } from "@nextui-org/react";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { Modal } from "@/components/modal/Modal";
import { ModalSizeProp, ColumnProp, ItemProps, ItemsProps } from "@/types";

type ModalContentProps = {
  title: string;
  size: ModalSizeProp;
  actionBtnText: string;
  bodyContent: () => React.JSX.Element | null;
  onAction: (item?: ItemProps) => void;
};

type TableWithModalProps = {
  title: string;
  initialVisibleColumns: string[];
  columns: ColumnProp[];
  data: ItemsProps;
  modalAddContent: () => React.JSX.Element;
  modalUpdateContent: (item?: ItemProps) => React.JSX.Element;
  modalDeleteContent: (item?: ItemProps) => React.JSX.Element;
  showStatus?: boolean;
  onAdd: () => void;
  onUpdate: (item: ItemProps) => void;
  onDelete: (item: ItemProps) => void;
};

export const TableWithModal = ({
  title,
  initialVisibleColumns,
  columns,
  data,
  modalAddContent,
  modalUpdateContent,
  modalDeleteContent,
  showStatus = false,
  onAdd,
  onUpdate,
  onDelete,
}: TableWithModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<ModalContentProps>({
    title: "",
    size: "md",
    actionBtnText: "",
    bodyContent: () => null,
    onAction: () => {},
  });

  const openAddModal = () => {
    setModalContent({
      title: `Add ${title}`,
      size: "3xl",
      actionBtnText: "Add",
      bodyContent: () => modalAddContent(),
      onAction: onAdd,
    });

    onOpen();
  };

  const openUpdateModal = (item: ItemProps) => {
    setModalContent({
      title: `Update ${title}`,
      size: "3xl",
      actionBtnText: "Update",
      bodyContent: () => modalUpdateContent(item),
      onAction: () => onUpdate(item),
    });

    onOpen();
  };

  const openDeleteModal = (item: ItemProps) => {
    setModalContent({
      title: `Delete ${title}`,
      size: "2xl",
      actionBtnText: "Delete",
      bodyContent: () => modalDeleteContent(item),
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
        showStatus={showStatus}
        title={title}
      />

      <Modal
        title={modalContent.title}
        actionBtnText={modalContent.actionBtnText}
        isOpen={isOpen}
        BodyContent={modalContent.bodyContent}
        size={modalContent.size}
        onOpenChange={onOpenChange}
        onAction={modalContent.onAction}
      />
    </>
  );
};
