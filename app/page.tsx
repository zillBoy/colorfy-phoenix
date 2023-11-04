"use client";

// React Dependencies
import React from "react";

// External Dependencies
import { Card } from "@nextui-org/card";

// Internal Dependencies
import { ThemeSwitch } from "@/components/theme-switch";
import { AnalyticsCard } from "@/components/cards/AnalyticsCard";
import { RevenueCard } from "@/components/cards/RevenueCard";
import { SalesCard } from "@/components/cards/SalesCard";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto">
      <Card className="flex flex-row items-center justify-between px-5 py-3 my-5 rounded-lg backdrop-blur-3xl">
        <div />
        <ThemeSwitch />
      </Card>

      <div className="grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-start-1 col-end-7 " />
        <SalesCard className="col-start-7 col-end-10 " />
        <RevenueCard className="col-start-10 col-end-13" />
      </div>
    </div>
  );
}
