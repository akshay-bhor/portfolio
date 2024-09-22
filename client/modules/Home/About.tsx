"use client";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { DownloadOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "./Home.module.scss";
import { Button } from "antd";
import { useMemo, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

const About = () => {
    return (
        <div className={clsx(styles.aboutContainer)}>
            <div className="flex flex-col md:flex-row items-center justify-between h-[calc(100vh-70px)] z-10 px-4 md:px-8 my-10">
                <div className="flex items-center justify-start w-full md:h-full md:w-1/2 md:-mt-26">
                    <div className="flex flex-col items-start justify-center">
                        <h2 className={clsx("text-4xl md:text-6xl font-bold mb-4", styles.header)}>{"<About>"}</h2>
                        <p className="text-xl font-medium mt-8 mb-2 ml-8">
                            I am a Full Stack developer with 4 years of experiance who turns caffeine into code. I am
                            proficient in JavaScript & it&apos;s various frameworks and I occasionally dabble in Go and
                            Python. My superpower? Turning &quot;It works on my machine&quot; into &quot;It works
                            everywhere... mostly.&quot; Scroll below or download my resume to get to know me.
                            <div>
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon={<DownloadOutlined />}
                                    rootClassName={styles.customButton}
                                    size="large"
                                >
                                    Download Resume
                                </Button>
                            </div>
                        </p>
                        <h2 className={clsx("text-4xl md:text-6xl font-bold mb-4", styles.header)}>{"</About>"}</h2>
                    </div>
                </div>
                <div className="w-full h-1/2 md:h-full md:w-1/2 md:-mt-26">
                    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                        <Environment preset="forest" />
                        <ambientLight intensity={20} />
                        <MainSkillsModel />
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default About;

const MainSkillsModel = () => {
    const [skills] = useState([
        "React",
        "NodeJs",
        "Express",
        "MySQL",
        "Docker",
        "Angular",
        "Python",
        "NextJs",
        "Microservices",
        "Golang",
    ]);
    const boxRef = useRef<Mesh[]>([]);

    const positions = useMemo(() => {
        const itemPositions: Vector3[] = [];
        const radius = 5;

        skills.forEach((_, index) => {
            const angle = (index / skills.length) * Math.PI * 2;
            itemPositions.push(
                new Vector3(
                    radius * Math.cos(angle),
                    0, // y is always 0 for equator
                    radius * Math.sin(angle)
                )
            );
        });

        return itemPositions;
    }, [skills]);

    useFrame(() => {
        boxRef.current.forEach((bref) => {
            bref.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), bref.position.clone().normalize());
        });
    });

    return (
        <group>
            {skills.map((skill, i) => (
                <mesh
                    key={i}
                    ref={(e) => {
                        if (e) boxRef.current[i] = e;
                    }}
                    position={positions[i]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshPhysicalMaterial
                        color="#e62d51"
                        opacity={0.9}
                        transmission={0.9}
                        roughness={0.1}
                        metalness={0.6}
                    />
                    <Text
                        position={[0, 0, 0.08]}
                        fontSize={0.15}
                        fontWeight={500}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {skill}
                    </Text>
                </mesh>
            ))}
        </group>
    );
};
