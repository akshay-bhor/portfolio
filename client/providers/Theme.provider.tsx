"use client";
import { ReactNode } from "react";
import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: `Source Code Pro, monospace`,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
