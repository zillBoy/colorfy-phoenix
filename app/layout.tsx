"use client";

// React & Next Dependencies
import { Metadata } from "next";
import { usePathname } from "next/navigation";

// External Dependencies
import clsx from "clsx";
import { Provider as ReduxProvider } from "react-redux";

// Internal Dependencies
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Menu } from "@/components/menu";
import { menuItems } from "@/utils/constants";
import { store } from "@/store";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname().replace("/", "");
  const currentMenu = menuItems.find(
    (item) => item.name.toLowerCase() === pathname
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReduxProvider store={store}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex h-screen">
              <Menu className="min-w-1/5" currentMenu={currentMenu} />
              <main className="w-4/5">{children}</main>
            </div>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
