import clsx from "clsx";
import styles from "../Shared.module.scss";
import TypingModel from "./Models/TypingModel";
import BouncingCubes from "./Models/BoundingCubes";

const Hero = () => {
    return (
        <div className={clsx("relative", styles.heroContainer)}>
            <div className="relative flex flex-col md:flex-row items-center justify-between h-[calc(100vh-75px)] z-10 px-4 md:px-8">
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
                <div className="w-full h-1/2 md:h-full md:w-1/2">
                    <TypingModel />
                </div>
            </div>
            <div className="z-0 absolute left-0 right-0 top-0 bottom-0">
                <BouncingCubes />
            </div>
        </div>
    );
};

export default Hero;
