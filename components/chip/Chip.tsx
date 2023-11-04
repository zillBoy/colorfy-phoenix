// React Dependencies
import React from "react";

// External Dependencis
import { Chip as NChip } from "@nextui-org/chip";

export type ChipProps = {
  chipText: string;
  text: string;
};

export const Chip = ({ chipText, text }: ChipProps) => {
  return (
    <div className="flex gap-2">
      <NChip variant="solid" radius="md" className="font-bold">
        {chipText}
      </NChip>
      <p>{text}</p>
    </div>
  );
};

export default Chip;
