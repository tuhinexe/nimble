import "@nimble/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@nimble/config/site";
import { boogaloo, marker, poppins } from "@nimble/config/fonts";
import { resolveValue, ToastBar, Toaster } from "react-hot-toast";

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
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "h-screen bg-background font-main",
          poppins.variable,
          boogaloo.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className={clsx("w-full flex flex-col h-full")}>
            {/* <Navbar /> */}
            <main className="w-full h-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
