"use client";
import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import clsx from "clsx";

const menuOptions = [
    {
        label: "<About />",
        href: "#about",
    },
    {
        label: "<Blog />",
        href: "#blog",
    },
    {
        label: "<Contact />",
        href: "#contact",
    },
];

const Header = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    return (
        <header
            className={clsx("fixed top-0 left-0 right-0", styles.headerContainer)}
        >
            <div className="max-w-[1920px] mx-auto px-4 py-4 flex items-center">
                <Button
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    size="large"
                    className={clsx("mr-4 bg-transparent border-none shadow-none", styles.menuButton)}
                />
                <div className={clsx("text-3xl font-bold cursor-pointer", styles.headerTitle)}>
                    {`{ Akshay }`}
                </div>
            </div>
            <Drawer
                placement="left"
                onClose={onClose}
                visible={drawerVisible}
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
