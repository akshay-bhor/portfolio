"use client";
import { Environment, OrbitControls, Text, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import clsx from "clsx";
import { RefObject, useEffect, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";
import styles from "./Home.module.scss";

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
                    <Canvas camera={{ position: [-2, 2, 2] }}>
                        <ambientLight intensity={2} />
                        <Model />
                        <directionalLight color="#e62d51" intensity={5} position={[4, 4, 4]} />
                        <OrbitControls />
                    </Canvas>
                </div>
            </div>
            <div className="z-0 absolute left-0 right-0 top-0 bottom-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Environment preset="forest" />
                    <BackgroundCubes />
                    <spotLight
                        position={[0, 5, 5]}
                        intensity={50}
                        angle={Math.PI / 2}
                        penumbra={0.4}
                        decay={0.6}
                        castShadow
                    />
                </Canvas>
            </div>
        </div>
    );
};

export default Hero;

const Model = () => {
    const group = useRef<Group>();
    const { scene, animations } = useGLTF("/models/typing.glb");
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (group.current && Object.keys(actions).length > 0) {
            const actionNames = Object.keys(actions);
            const action = actions[actionNames[0]];
            if (action) {
                action.play();
            }
        }
    }, [actions]);

    return <primitive object={scene} ref={group as RefObject<Group>} />;
};

const BackgroundCubes = () => {
    const [cubesInfo, setCubesInfo] = useState<Array<{ position: Vector3; velocity: Vector3 }>>([]);
    const cubesRef = useRef<Mesh[]>([]);
    const programmingSymbols = ["<>", "//", "{}", "[]", "()", "=>", "&&", "||", "!=", "==", "+=", "``"];

    useEffect(() => {
        const initPos = [...Array(25)].map(() => ({
            position: new Vector3(Math.random() * 11 - 5, -4, Math.random() * 5 - 5),
            velocity: new Vector3(0, Math.random() * 0.2 + 0.1, 0),
        }));

        setCubesInfo(initPos);
    }, []);

    useFrame((state, delta) => {
        cubesRef.current.forEach((cube, i) => {
            // Apply gravity
            cubesInfo[i].velocity.y -= 0.001;

            // Update position
            cube.position.x += cubesInfo[i].velocity.x * delta * 60;
            cube.position.y += cubesInfo[i].velocity.y * delta * 60;
            cube.position.z += cubesInfo[i].velocity.z * delta * 60;

            // Reset if cube falls below the bottom
            if (cube.position.y < -10) {
                cube.position.set(Math.random() * 11 - 5, -10, Math.random() * 5 - 5);
                cubesInfo[i].velocity.y = Math.random() * 0.2 + 0.1;
            }

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
    });

    return (
        <>
            {cubesInfo.map((cube, i) => (
                <mesh
                    key={i}
                    position={cube.position}
                    ref={(el) => {
                        if (el) cubesRef.current[i] = el;
                    }}
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
                    <Text position={[0, 0, 0.1]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
                        {programmingSymbols[i % programmingSymbols.length]}
                    </Text>
                </mesh>
            ))}
        </>
    );
};
