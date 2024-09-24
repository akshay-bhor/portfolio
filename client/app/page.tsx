// import About from "@/modules/Home/About";
// import Hero from "@/modules/Home/Hero";
// import Work from "@/modules/Home/Work";
import World from "@/modules/Home/World";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Akshay | Full-Stack Developer | FinTech | Tech Blogger",
    description:
        "Explore Akshay's portfolio showcasing innovative full-stack projects and insightful programming blog. Discover expert web development tips, coding best practices, and the latest tech trends.",
};

export default function Home() {
    return (
        <>
            {/* <Hero />
            <About />
            <Work /> */}
            <World />
        </>
    );
}
