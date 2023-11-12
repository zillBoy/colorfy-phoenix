"use client";

// React Dependencies
import React, { useMemo } from "react";

// Internal Dependencies
import { TableWithModal } from "@/components/table/TableWithModal";
import { usersData } from "@/db/users";
import { CategoryProps, ColumnProp } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";

const initialVisibleColumns = ["id", "name", "email", "actions"];
const columns: ColumnProp[] = convertColumnKeysIntoObject(
  initialVisibleColumns
);

export default function Users() {
  const addUserContent = useMemo(() => {
    return (
      <div>
        <p>This is the ADD user modl!</p>
      </div>
    );
  }, []);

  const updateUserContent = useMemo(() => {
    return (
      <div>
        <p>This is the UPDATE user modal</p>
      </div>
    );
  }, []);

  const deleteUserContent = useMemo(() => {
    return (
      <div>
        <p>This is the delete user modal</p>
      </div>
    );
  }, []);

  const onAddUser = async () => {
    try {
      console.log("onAddUser called!: ");
    } catch (err) {
      console.log("Error in onAddUser: ", err);
    }
  };

  const onUpdateUser = async () => {
    try {
      console.log("onUpdateUser called! ");
    } catch (err) {
      console.log("Error in onUpdateUser: ", err);
    }
  };

  const onDeleteUser = async () => {
    try {
      console.log("onDeleteIser is called!");
    } catch (err) {
      console.log("Error in onDeleteUser: ", err);
    }
  };

  return (
    <TableWithModal
      title="User"
      initialVisibleColumns={initialVisibleColumns}
      columns={columns}
      data={usersData}
      modalAddContent={addUserContent}
      modalUpdateContent={updateUserContent}
      modalDeleteContent={deleteUserContent}
      onAdd={onAddUser}
      onUpdate={onUpdateUser}
      onDelete={onDeleteUser}
    />
  );
}
