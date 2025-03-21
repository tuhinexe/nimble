import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "@nimble/app/Providers";

import { boogaloo, marker, poppins } from "@nimble/config/fonts";
import { siteConfig } from "@nimble/config/site";
import AuthProvider from "../AuthProvider";
import Sidebar from "@nimble/components/ui/Sidebar";
import Navbar from "@nimble/components/ui/Navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section suppressHydrationWarning>
      <div
        className={clsx(
          "h-screen bg-background font-main",
          poppins.variable,
          boogaloo.variable,
          marker.variable
        )}
      >
        <div className={clsx("w-full flex h-full")}>
          <Sidebar />
          <div className="w-full">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
