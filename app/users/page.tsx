"use client";

// React Dependencies
import React, { useCallback } from "react";

// Internal Dependencies
import _ from "lodash";
import { TableWithModal } from "@/components/table/TableWithModal";
import { usersData } from "@/db/users";
import { ColumnProp } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";
import { UserProps } from "@nextui-org/react";

const initialVisibleColumns = ["id", "name", "email", "actions"];
const columns: ColumnProp[] = convertColumnKeysIntoObject(
  initialVisibleColumns
);

export default function Users() {
  const addUserContent = useCallback(() => {
    return (
      <div>
        <p>This is the ADD user modl!</p>
      </div>
    );
  }, []);

  const updateUserContent = useCallback((user: UserProps) => {
    return (
      <div>
        <p>This is the UPDATE user modal `{user.id}`</p>
      </div>
    );
  }, []);

  const deleteUserContent = useCallback(
    (user: UserProps) => (
      <div>
        <p>Are you sure you want to delete user with ID `{user.id}`?</p>
      </div>
    ),
    []
  );

  const onAddUser = async () => {
    try {
      console.log("onAddUser called!");
    } catch (err) {
      console.log("Error in onAddUser: ", err);
    }
  };

  const onUpdateUser = async (user: UserProps) => {
    try {
      console.log("onUpdateUser: ", user);
    } catch (err) {
      console.log("Error in onUpdateUser: ", err);
    }
  };

  const onDeleteUser = async (user: UserProps) => {
    try {
      console.log("onDeleteUser: ", user);
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
