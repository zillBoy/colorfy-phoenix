"use client";

// React Dependencies
import React, { useState, useEffect, SetStateAction } from "react";

// External Dependencies
import _ from "lodash";
import { Code, useDisclosure } from "@nextui-org/react";
import { ClipLoader } from "react-spinners";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { Modal } from "@/components/modal/Modal";
import { CategoriesProps, CategoryProps, ColumnProp } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";
import { COLORS } from "@/styles/style";
import { statusOptions } from "@/utils/constants";
import { CategoryForm } from "./CategoryForm";
import apiService from "@/services/apiService";

const initialVisibleColumns = ["id", "name", "position", "status", "actions"];
const columns: ColumnProp[] = convertColumnKeysIntoObject(
  initialVisibleColumns
);

export default function Categories() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SetStateAction<CategoriesProps>>(
    []
  );
  const [category, setCategory] = useState<CategoryProps | null>(null);
  const [modalType, setModalType] = useState<string>();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [status, setStatus] = useState(statusOptions[1].name); // By default the status is "Inactive"

  const fetchCategoriesHandler = async () => {
    try {
      setLoading(true);

      const categories = await apiService.getCategories(10);
      setCategories(categories);
    } catch (error) {
      console.log(
        "Error in categories/page.tsx fetchCategoriesHandler: ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  const resetCategory = () => {
    setId("");
    setName("");
    setPosition("");
    setStatus("");
  };

  const onAddCategory = async () => {
    try {
      const payload = {
        name,
        position: Number(position),
        status,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
      };

      const id = await apiService.postCategory(payload);
      resetCategory();

      setCategories((category) => [...category, { id, ...payload }]);
    } catch (err) {
      console.log("Error in onAddCategory: ", err);
    }
  };

  const onUpdateCategory = async () => {
    try {
      const payload = {
        id,
        name,
        position,
        status,
      };

      console.log("onUpdate:payload:  ", payload);
    } catch (err) {
      console.log("Error in onUpdateCategory: ", err);
    }
  };

  const onDeleteCategory = async () => {
    try {
      if (!_.isEmpty(category)) {
        const id = await apiService.deleteCategory(category.id);
        const filteredCategories = _.filter(
          categories,
          (category) => category.id !== id
        );
        resetCategory();

        setCategories(filteredCategories);
      }
    } catch (err) {
      console.log("Error in onDeleteCategory: ", err);
    }
  };

  const onModalAction = (modalType: string) => {
    if (modalType === "Add") {
      return onAddCategory();
    } else if (modalType === "Update") {
      return onUpdateCategory();
    } else if (modalType === "Delete") {
      return onDeleteCategory();
    } else {
      return;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={48} color={COLORS.PRIMARY} />
      </div>
    );
  }

  return (
    <>
      <Table
        title="Category"
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        data={categories}
        onAdd={() => {
          setModalType("Add");
          onOpen();
        }}
        onUpdate={(category) => {
          setCategory(category);
          setModalType("Update");
          onOpen();
        }}
        onDelete={(category) => {
          setCategory(category);
          setModalType("Delete");
          onOpen();
        }}
        showStatus
      />

      <Modal
        title={`${modalType} Category`}
        actionBtnText={modalType!}
        isOpen={isOpen}
        size="3xl"
        onOpenChange={onOpenChange}
        onAction={() => onModalAction(modalType!)}
      >
        {modalType === "Delete" ? (
          <div>
            <p>
              Are you sure you want to delete category with ID{" "}
              <Code>{category && category.id}</Code>
            </p>
          </div>
        ) : (
          <CategoryForm
            id={id}
            name={name}
            position={position}
            status={status}
            setId={setId}
            setName={setName}
            setPosition={setPosition}
            setStatus={setStatus}
            isFormUpdate={modalType === "Update"}
          />
        )}
      </Modal>
    </>
  );
}
