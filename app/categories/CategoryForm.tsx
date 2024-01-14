// React & Next Dependencies
import React from "react";

// External Dependencies
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

// Internal Dependencies
import { statusOptions } from "@/utils/constants";

export type CategoryFormProps = {
  id?: string;
  name: string;
  position: string;
  status: string;
  isFormUpdate: boolean;
  setId?: (id: string) => void;
  setName: (name: string) => void;
  setPosition: (position: string) => void;
  setStatus: (status: string) => void;
};

export const CategoryForm = ({
  id,
  name,
  position,
  status,
  setId,
  setName,
  setPosition,
  setStatus,
  isFormUpdate = false,
}: CategoryFormProps) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          label="Position"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div
        className={`flex items-center justify-center gap-4 mb-4 ${
          isFormUpdate ? "" : "flex-row-reverse"
        }`}
      >
        {isFormUpdate ? (
          <Input
            type="text"
            label="ID"
            value={id}
            onChange={(e) => {
              if (typeof setId !== "undefined") {
                setId(e.target.value);
              }
            }}
          />
        ) : (
          <div className="w-full" />
        )}
        <Select
          label="Select status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((status) => (
            <SelectItem key={status.key} value={status.name}>
              {status.name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
