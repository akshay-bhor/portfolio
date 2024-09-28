"use client";
import { OrbitControls, Text, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";

const SkillsModel = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={10} />
            <Model />
            <MainSkillsModel />
            <OrbitControls enablePan={false} enableZoom={false} />
            <directionalLight position={[0, 5, 0]} intensity={10} castShadow />
        </Canvas>
    );
};

export default SkillsModel;

const Model = () => {
    const group = useRef<Group>();
    const { scene, animations } = useGLTF("/models/run_idle.glb");
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

    useFrame(({ camera }) => {
        if (group.current) {
            const lookAtVector = new Vector3(0, 0, 0);
            camera.getWorldPosition(lookAtVector);
            lookAtVector.y = group.current.position.y; // Keep the y-rotation level
            group.current.lookAt(lookAtVector);
        }
    });

    return (
        <group>
            <primitive object={scene} ref={group as RefObject<Group>} scale={[4, 4, 4]} position={[0, -4, 0]} />
            <mesh position={[0, -4, 0]}>
                <cylinderGeometry args={[10, 10, 0.1]} />
                <meshStandardMaterial color="#14202c" />
            </mesh>
        </group>
    );
};

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
