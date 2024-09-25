import clsx from "clsx";
import Header from "../Header/Header";

type TProps = {
    children: React.ReactNode;
    headerVariant?: "transparent"
};

const ApplicationLayout = ({ children, headerVariant }: TProps) => {
    return (
        <div className={clsx("flex flex-col mx-auto", headerVariant === "transparent" ? "w-full" : "max-w-[1920px]")}>
            <Header headerVariant={headerVariant} />
            <div style={{ minHeight: "80vh", marginTop: `${headerVariant === "transparent" ? "-75px" : "0"}` }}>{children}</div>
        </div>
    );
};

export default ApplicationLayout;