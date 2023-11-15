// React Dependencies
import React from "react";

// External Dependencies
import _ from "lodash";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

// Internal Dependencies
import { UserProps } from "@/types";

const inputContainer = "flex flex-wrap justify-around";
const inputClassName = "w-full md:w-[49%] my-1";

export const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      toast.success("Yay!");
      // ...
    } catch (err) {
      console.log("UserForm, error in onSubmit: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={inputContainer}>
        <Input
          className={inputClassName}
          label="Name"
          type="text"
          {...register("name", { required: true })}
          isInvalid={!_.isEmpty(errors["name"])}
          errorMessage={!_.isEmpty(errors["name"]) && "Name is required!"}
        />
        <Input
          className={inputClassName}
          label="Email"
          type="email"
          {...register("email", { required: true })}
          isInvalid={!_.isEmpty(errors["email"])}
          errorMessage={!_.isEmpty(errors["email"]) && "Email is requird!"}
        />
      </div>

      <div className="my-4 ml-0 md:ml-2">
        <Button className="p-3" color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
