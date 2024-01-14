"use client";

// React Dependencies
import React, { useState, useEffect, SetStateAction } from "react";

// External Dependencies
import { useDisclosure } from "@nextui-org/react";
import { ClipLoader } from "react-spinners";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { Modal } from "@/components/modal/Modal";
import { CategoriesProps, CategoryProps, ColumnProp } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";
import apiService from "@/services/apiService";
import { COLORS } from "@/styles/style";
import { statusOptions } from "@/utils/constants";
import { CategoryForm } from "./CategoryForm";

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
  const [isFormUpdate, setIsFormUpdate] = useState(false);

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

  const onDeleteCategory = async (item: CategoryProps) => {
    try {
      console.log("onDeleteCategory called!: ", item);
    } catch (err) {
      console.log("Error in onDeleteCategory: ", err);
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
        title="User"
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        data={categories}
        onAdd={() => {
          setIsFormUpdate(false);
          onOpen();
        }}
        onUpdate={() => {
          setIsFormUpdate(true);
          onOpen();
        }}
        onDelete={(user) => {
          // setUser(user);
          // onOpen();
        }}
        showStatus
      />

      <Modal
        title="Add Category"
        actionBtnText="Add"
        isOpen={isOpen}
        size={"3xl"}
        onOpenChange={onOpenChange}
        onAction={isFormUpdate ? onUpdateCategory : onAddCategory}
      >
        <CategoryForm
          id={id}
          name={name}
          position={position}
          status={status}
          setId={setId}
          setName={setName}
          setPosition={setPosition}
          setStatus={setStatus}
          isFormUpdate={isFormUpdate}
        />
      </Modal>
    </>
  );
}
