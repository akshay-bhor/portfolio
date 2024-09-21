"use client";
import { OrbitControls, Text, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";

const Hero = () => {
    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between h-[calc(100vh-75px)] z-10 px-4 md:px-8">
                <div className="flex items-center justify-center w-full h-1/2 md:h-full md:w-1/2">
                    <div className="flex flex-col items-center justify-center md:-mt-32">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4">Akshay Bhor</h1>
                        <h2 className="text-2xl md:text-4xl text-gray-500">Software Engineer</h2>
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
            <div className="z-1 absolute left-0 right-0 top-0 bottom-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={2} />
                    <BackgroundCubes />
                    <OrbitControls />
                    <axesHelper />
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

    useEffect(() => {
        const initPos = [...Array(20)].map(() => ({
            position: new Vector3(Math.random() * 11 - 5, 10, 0),
            velocity: new Vector3(0, Math.random() * 0.02, 0),
        }));

        setCubesInfo(initPos);
    }, []);

    useFrame(() => {
        cubesRef.current.forEach((cube, i) => {
            cube.position.x = cube.position.x + cubesInfo[i].velocity.x;
            cube.position.y = cube.position.y - cubesInfo[i].velocity.y;
            cube.position.z = cube.position.z + cubesInfo[i].velocity.z;

            if (cube.position.y < -10) cube.position.y = cubesInfo[i].position.y;
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
                >
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshPhysicalMaterial
                        color="#e62d51"
                        opacity={0.9}
                        transmission={0.9}
                        roughness={0.1}
                        metalness={0.4}
                    />
                    <Text position={[0, 0, 0.1]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
                        {"</>"}
                    </Text>
                </mesh>
            ))}
        </>
    );
};
