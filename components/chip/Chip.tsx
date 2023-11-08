// React Dependencies
import React from "react";

// External Dependencis
import { Chip as NChip } from "@nextui-org/chip";

// Internal Dependencis

export type ChipProps = {
  chipText: string;
  text?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "light"
    | "shadow"
    | "flat"
    | "dot"
    | "solid"
    | "bordered"
    | "faded"
    | undefined;
  raidus?: "full" | "lg" | "md" | "none" | "sm";
};

export const Chip = ({
  chipText,
  text,
  variant = "solid",
  color = "default",
  raidus = "md",
}: ChipProps) => {
  return (
    <div className="flex gap-2">
      <NChip
        color={color}
        variant={variant}
        radius={raidus}
        className="font-bold"
      >
        {chipText}
      </NChip>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Chip;
