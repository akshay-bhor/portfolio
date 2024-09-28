import { DownloadOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "../Shared.module.scss";
import { Button } from "antd";
import SkillsModel from "../Models/SkillsModel";

const About = () => {
    return (
        <div className={clsx(styles.aboutContainer)} id="about">
            <div className="flex flex-col md:flex-row items-center justify-between h-[calc(120vh)] md:h-[calc(100vh-75px)] z-10 px-4 md:px-8 my-10">
                <div className="flex items-center justify-start w-full md:h-full md:w-1/2 md:-mt-26">
                    <div className="flex flex-col items-start justify-center">
                        <h2 className={clsx("text-4xl md:text-6xl font-bold mb-4", styles.header)}>{"about.me() {"}</h2>
                        <p className="text-xl font-medium mt-8 mb-2 ml-8">
                            I am a Full Stack developer with 4 years of experiance who turns caffeine into code. I am
                            proficient in JavaScript & it&apos;s various frameworks and I occasionally dabble in Go and
                            Python. My superpower? Turning &quot;It works on my machine&quot; into &quot;It works
                            everywhere... mostly.&quot; Scroll below or download my resume to get to know me.
                            <span className="block">
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon={<DownloadOutlined />}
                                    rootClassName={styles.customButton}
                                    size="large"
                                >
                                    Download Resume
                                </Button>
                            </span>
                        </p>
                        <h2 className={clsx("text-4xl md:text-6xl font-bold mb-4", styles.header)}>{"}"}</h2>
                    </div>
                </div>
                <div className="w-full h-2/5 md:h-full md:w-1/2 md:-mt-26">
                    <SkillsModel />
                </div>
            </div>
        </div>
    );
};

export default About;
