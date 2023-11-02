/* eslint-disable @next/next/no-img-element */
"use client";

// React & Next Dependencies
import React, { useState } from "react";

// External Dependencies
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import clsx from "clsx";

// Internal Dependencies
import { menuItems, MenuItemProps } from "@/utils/constants";

type MenuProps = {
  className?: string;
};

export const Menu = ({ className = "" }: MenuProps) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuItemProps>(menuItems[0]);

  const menuItemClickHandler = (menuItem: MenuItemProps) => {
    setSelectedMenu(menuItem);
  };

  return (
    <Card className={clsx(className, "rounded-none h-screen")}>
      <CardHeader className="p-7">
        <img
          className="object-cover rounded-lg w-14 h-14"
          src="/images/logo.jpg"
          alt="logo"
        />
        <h1 className="ml-4 text-2xl font-semibold">Phoenix</h1>
      </CardHeader>

      <CardBody className="mt-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            className="justify-start p-6 mb-3"
            variant={selectedMenu.name === item.name ? "flat" : "light"}
            startContent={<item.Icon size={14} />}
            onClick={() => menuItemClickHandler(item)}
          >
            {item.name}
          </Button>
        ))}
      </CardBody>
    </Card>
  );
};
