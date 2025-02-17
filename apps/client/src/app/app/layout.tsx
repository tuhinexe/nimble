import "@nimble/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "@nimble/app/Providers";

import { boogaloo, marker, poppins } from "@nimble/config/fonts";
import { siteConfig } from "@nimble/config/site";
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
