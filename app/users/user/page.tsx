"use client";

// React Dependencies
import React, { useEffect, useState } from "react";

// External Dependencies
import _ from "lodash";

// Internal Dependencies
import { UserForm } from "@/components/form/UserForm";

export default function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // ...
      } catch (err) {
        console.log("Error in getUserData: ", err);
      }
    };

    getUserData();
  });

  return (
    <div className="relative mx-2">
      <h1 className="mx-2 my-4 text-3xl">
        {_.isEmpty(user) ? "Add" : "Edit"} User
      </h1>
      <UserForm />
    </div>
  );
}
