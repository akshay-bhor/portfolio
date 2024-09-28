import ApplicationLayout from "@/components/layout/Application/ApplicationLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ApplicationLayout>
            {children}
        </ApplicationLayout>
    );
}
