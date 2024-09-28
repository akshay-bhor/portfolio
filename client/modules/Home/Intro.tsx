"use client";
import clsx from "clsx";
import styles from "../Shared.module.scss";
import { useProgress } from "@react-three/drei";
import { SetStateAction } from "react";

type TProps = {
    setView: React.Dispatch<SetStateAction<"default" | "model">>;
};

const Intro = ({ setView }: TProps) => {
    const { progress } = useProgress();
    const roundedProgress = Math.round(progress);

    return (
        <div className={clsx("relative", styles.introContainer)}>
            <div className="relative flex flex-col md:flex-row items-center justify-around h-[calc(100vh-75px)] z-10 px-4 md:px-8">
                <div className="flex items-center justify-center w-full h-1/2 md:h-full md:w-1/2">
                    <div className="flex flex-col items-start justify-center md:-mt-32">
                        <h1 className={clsx("text-6xl md:text-8xl font-bold mb-4", styles.header)}>
                            Hi, <br /> I&apos;m Akshay
                        </h1>
                        <h2
                            className={clsx(
                                "text-2xl md:text-4xl text-gray-400 pb-2 shadow-text relative",
                                styles.subtitle
                            )}
                        >
                            Full Stack Engineer
                        </h2>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <div
                        className={clsx(
                            "w-48 h-48 rounded-full border-red-500 border-solid flex items-center justify-center overflow-hidden relative",
                            {
                                "cursor-pointer": roundedProgress === 100,
                            }
                        )}
                        style={{
                            background: `linear-gradient(to top, #ef4444 ${roundedProgress}%, transparent ${roundedProgress}%)`,
                        }}
                        onClick={() => roundedProgress === 100 && setView("model")}
                    >
                        <span className="text-xl font-bold text-white z-10">
                            {roundedProgress === 100 ? "Explore" : "Loading..."}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
