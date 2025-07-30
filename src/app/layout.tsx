import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Pixel Craft",
    description: "Generate custom placeholder images with ease.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-body antialiased bg-white">
                <Header />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
