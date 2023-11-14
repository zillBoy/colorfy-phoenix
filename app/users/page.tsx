"use client";

// React & Next Dependencies
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// External Dependencoes
import _ from "lodash";
import { useDisclosure } from "@nextui-org/modal";

// Internal Dependencies
import { Table } from "@/components/table/Table";
import { usersData } from "@/db/users";
import { ColumnProp, UserProps, UsersProps } from "@/types";
import { convertColumnKeysIntoObject } from "@/utils/convert";
import { Modal } from "@/components/modal/Modal";

const initialVisibleColumns = ["id", "name", "email", "actions"];
const columns: ColumnProp[] = convertColumnKeysIntoObject(
  initialVisibleColumns
);

export default function Users() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UsersProps>([]);
  const [user, setUser] = useState<UserProps | null>(null);

  const deleteUserHandler = async () => {
    try {
      console.log(user);
    } catch (err) {
      console.log("Users page, error in deleteUserHandler: ", err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsers(usersData);
      } catch (err) {
        console.log("Users page, error in getUsers: ", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <Table
        title="User"
        initialVisibleColumns={initialVisibleColumns}
        columns={columns}
        data={users}
        onAdd={() => router.push("/users/user")}
        onUpdate={() => router.push("/users/user?id=123")}
        onDelete={(user) => {
          setUser(user);
          onOpen();
        }}
      />

      <Modal
        title="Delete User"
        actionBtnText="Delete"
        isOpen={isOpen}
        BodyContent={() => {
          return <div>Well hello there!</div>;
        }}
        onOpenChange={onOpenChange}
        onAction={deleteUserHandler}
      />
    </>
  );
}
