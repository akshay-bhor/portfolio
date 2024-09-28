"use client";
import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type TProps = {
    headerVariant?: "transparent"
}

const menuOptions = [
    {
        label: "<About />",
        href: "/about",
    },
    {
        label: "<Work />",
        href: "/work",
    },
    {
        label: "<Blog />",
        href: "/blog",
    },
    {
        label: "<Contact />",
        href: "/contact",
    },
];

const Header = ({ headerVariant }: TProps) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const router = useRouter();

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    return (
        <header
            className={clsx("fixed top-0 left-0 right-0 z-10", styles.headerContainer, headerVariant === "transparent" ? "bg-transparent" : "bg-[var(--background)]")}
            style={{ color: headerVariant === "transparent" ? 'var(--background)' : 'var(--forground)'}}
        >
            <div className="max-w-[1920px] mx-auto px-4 py-4 flex items-center">
                <Button
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    size="large"
                    className={clsx("mr-4 bg-transparent border-none shadow-none", styles.menuButton)}
                    style={{ color: headerVariant === "transparent" ? 'var(--background)' : 'var(--forground)'}}
                />
                <div className={clsx("text-3xl font-bold cursor-pointer", styles.headerTitle)} onClick={() => router.push("/")}>
                    {`{ Akshay }`}
                </div>
            </div>
            <Drawer
                placement="left"
                onClose={onClose}
                open={drawerVisible}
                style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
                rootClassName="headerMenuDrawer"
                closeIcon={<CloseOutlined className="text-white" />}
            >
                <nav>
                    {menuOptions.map((option, index) => (
                        <div key={index} className="text-xl font-bold p-4">
                            <a href={option.href} onClick={onClose} className="text-white">
                                {option.label}
                            </a>
                        </div>
                    ))}
                </nav>
            </Drawer>
        </header>
    );
};

export default Header;
