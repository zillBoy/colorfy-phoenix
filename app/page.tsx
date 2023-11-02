"use client";

// React Dependencies
import React from "react";

// External Dependencies
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { CreditCard as CreditCardIcon } from "react-feather";
import {} from "recharts";
import { useTheme } from "next-themes";

// Internal Dependencies
import { ThemeSwitch } from "@/components/theme-switch";
import { RevenueCard } from "@/components/RevenueCard";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="w-11/12 mx-auto">
      <Card className="flex flex-row items-center justify-between px-5 py-3 my-5 rounded-lg backdrop-blur-3xl">
        <div />
        <ThemeSwitch />
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-3">
          <p>App Usage</p>
        </Card>

        <Card className="p-3">
          <p>Sales</p>
        </Card>

        <RevenueCard />
      </div>
    </div>
  );
}
