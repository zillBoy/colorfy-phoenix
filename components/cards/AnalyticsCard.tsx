// React Dependencies
import React from "react";

// External Dependencies
import { Card } from "@nextui-org/card";
import clsx from "clsx";

// Internal Dependencies
import { Chip } from "@/components/chip/Chip";

type AnalyticsCardProps = {
  className?: string;
};

export const AnalyticsCard = ({ className = "" }: AnalyticsCardProps) => {
  return (
    <Card className={clsx(className, "p-5")}>
      <h1 className="text-xl font-medium">Mobile Analytics</h1>
      <p className="text-sm font-light">Total 28.5% Conversion Rate</p>

      <div className="mt-7">
        <h3 className="mb-3 font-medium">Spending</h3>
        <div className="flex gap-16 mb-2">
          <Chip chipText="12h" text="Spend" />
          <Chip chipText="28%" text="Sessions" />
        </div>
        <div className="flex gap-16">
          <Chip chipText="9.2K" text="Leads" />
          <Chip chipText="12%" text="Conversions" />
        </div>
      </div>
    </Card>
  );
};
