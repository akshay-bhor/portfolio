import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "./Home.module.scss";

const Work = () => {
    const mainSkills = [
        "JavaScript, Python, Go",
        "React, Angular, NextJs, CSS, SCSS, HTML",
        "NodeJs, Express, MySQL, MongoDB, Docker, Postgres",
    ];

    const experiance = [
        {
            title: "Freelancer",
            at: "Web development",
            duration: "2020-2021"
        },
        {
            title: "Frontend Engineer",
            at: "Ignite Solutions",
            duration: "May 2021 - Oct 2021"
        },
        {
            title: "Full Stack Engineer",
            at: "Theecode Technologies",
            duration: "Feb 2022 - July 2022"
        },
        {
            title: "Full Stack Engineer",
            at: "Loanglide Inc",
            duration: "July 2022 - Sep 2023"
        },
        {
            title: "Frontend Engineer",
            at: "Polymerize",
            duration: "Nov 2023 - Current"
        }
    ]

    return (
        <div className={clsx(styles.workContainer)} id="work">
            <div className="flex flex-col items-start h-auto px-4 md:px-8 my-10 font-semibold">
                <h3 className={clsx("text-4xl md:text-6xl font-bold", styles.header)}>{`my.work() {`}</h3>
                <div className="ml-8">
                    <div id="intro">
                        <div>Full Stack developer powered by caffeine</div>
                        <div>From India</div>
                        <div className="text-gray-400 pt-4">{`// Software Engineer @Polymerize`}</div>
                        <div className="flex flex-row gap-4  mt-4">
                            <a
                                href="https://github.com/akshay-bhor"
                                referrerPolicy="no-referrer"
                                target="_blank"
                                className="text-2xl"
                            >
                                <GithubOutlined />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/akshay-bhor-31312977/"
                                referrerPolicy="no-referrer"
                                target="_blank"
                                className="text-2xl"
                            >
                                <LinkedinOutlined />
                            </a>
                        </div>
                    </div>

                    <div id="main-skills" className="mt-20">
                        <h3 className="text-2xl font-bold">Main skills</h3>
                        <div className="flex flex-row flex-wrap justify-between align-top gap-8 md:gap-32 text-gray-400">
                            {mainSkills.map((skill, idx) => (
                                <div key={idx}>{skill}</div>
                            ))}
                        </div>
                    </div>

                    <div id="exp" className="mt-12">
                        <h3 className="text-2xl font-bold">Experiance</h3>
                        <div className="flex flex-row flex-wrap justify-between align-top gap-8 md:gap-32 text-gray-400">
                            {experiance.reverse().map((exp, idx) => (
                                <div key={idx} className="flex flex-col justify-start align-top gap-2">
                                    <div className={clsx("text-lg font-bold", styles.title)}>{exp.title}</div>
                                    <div>@ {exp.at}</div>
                                    <div>{exp.duration}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="languages" className="mt-12">
                        <h3 className="text-2xl font-bold">Languages</h3>
                        <div className="flex flex-row flex-wrap justify-start align-top gap-8 md:gap-32 text-gray-400">
                                <div className="flex flex-col justify-start align-top gap-2">
                                    <div className={clsx("text-lg font-bold")}>{`// Fluent`}</div>
                                    <div>English</div>
                                    <div>Marathi</div>
                                </div>
                                <div className="flex flex-col justify-start align-top gap-2">
                                    <div className={clsx("text-lg font-bold")}>{`// Intermediate`}</div>
                                    <div>Hindi</div>
                                </div>
                        </div>
                    </div>
                </div>

                <h3 className={clsx("text-4xl md:text-6xl font-bold", styles.header)}>{`}`}</h3>
            </div>
        </div>
    );
};

export default Work;
