/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.scss";
import ThemeProvider from "@/providers/Theme.provider";
import AppErrorBoundary from "@/components/error/ErrorBoundry";

export const metadata: Metadata = {
    title: "Akshay | Full-Stack Developer | FinTech | Tech Blogger",
    description:
        "Explore Akshay's portfolio showcasing innovative full-stack projects and insightful programming blog. Discover expert web development tips, coding best practices, and the latest tech trends.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                <link
                    href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
                    rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <AppErrorBoundary>
                    <ThemeProvider>{children}</ThemeProvider>
                </AppErrorBoundary>
            </body>
        </html>
    );
}
