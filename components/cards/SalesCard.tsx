// React Dependencies
import React from "react";

// External Dependencies
import { Card } from "@nextui-org/card";
import clsx from "clsx";

export type SalesCardProps = {
  className: string;
};

export const SalesCard = ({ className = "" }: SalesCardProps) => {
  return (
    <Card className={clsx(className, "p-5")}>
      <div className="flex justify-between">
        <p className="text-sm">Sales Overview</p>
        <p className="text-sm text-green-500">+18.2%</p>
      </div>
      <h2 className="text-2xl font-medium">$42.5k</h2>
    </Card>
  );
};
