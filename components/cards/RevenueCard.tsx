"use client";

// React Dependencies
import React from "react";

// External Dependencies
import { Card } from "@nextui-org/card";
import { CreditCard as CreditCardIcon } from "react-feather";
import { useTheme } from "next-themes";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import clsx from "clsx";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 8398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 4800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 1200,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 6800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 2800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 10300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 12300,
    amt: 2100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 18300,
    amt: 2100,
  },
];

const SVG_COLOR = {
  success: {
    primary: "#28C76F",
    light: "#DFF7E9",
    dark: "#2E4B4F",
  },
};

export type RevenueCardProps = {
  className?: string;
};

export const RevenueCard = ({ className = "" }: RevenueCardProps) => {
  const { theme } = useTheme();

  return (
    <Card className={clsx(className, "p-5")}>
      <div
        className="flex items-center justify-center w-8 h-8 mb-1 rounded-full"
        style={{
          backgroundColor: theme ? SVG_COLOR["success"][theme] : "transparent",
        }}
      >
        <CreditCardIcon color={SVG_COLOR["success"]["primary"]} size={18} />
      </div>
      <h2 className="text-lg font-semibold">97.5k</h2>
      <p className="text-sm">Revenue Generated</p>

      <ResponsiveContainer className="mt-2" width="100%" height="50%">
        <AreaChart
          width={600}
          height={600}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Area
            type="monotone"
            dataKey="pv"
            stroke={SVG_COLOR["success"]["primary"]}
            fill={SVG_COLOR["success"][theme]}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
