"use client";
import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

const BouncingCubes = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <Environment preset="forest" />
            <Model />
            <spotLight position={[0, 5, 5]} intensity={50} angle={Math.PI / 2} penumbra={0.4} decay={0.6} castShadow />
        </Canvas>
    );
};

export default BouncingCubes;

const Model = () => {
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
