import "@nimble/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "@nimble/app/providers";

import { siteConfig } from "@nimble/config/site";
import { boogaloo, marker, poppins } from "@nimble/config/fonts";
import { resolveValue, ToastBar, Toaster } from "react-hot-toast";
import AuthProvider from "../AuthProvider";

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
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <AuthProvider>
            <div className={clsx("w-full flex flex-col h-full")}>
              {children}
            </div>
          </AuthProvider>
        </Providers>
      </div>
    </section>
  );
}
