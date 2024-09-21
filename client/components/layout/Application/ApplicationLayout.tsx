import Header from "../Header/Header";

type TProps = {
    children: React.ReactNode;
};

const ApplicationLayout = ({ children }: TProps) => {
    return (
        <div className="flex flex-col max-w-[1920px] mx-auto">
            <Header />
            <div style={{ minHeight: "80vh" }}>{children}</div>
        </div>
    );
};

export default ApplicationLayout;