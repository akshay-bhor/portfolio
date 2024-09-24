"use client";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import { Group } from "three";

const TypingModel = () => {
    return (
        <Canvas camera={{ position: [-2, 2, 2] }}>
            <ambientLight intensity={2} />
            <Model />
            <directionalLight color="#e62d51" intensity={2} position={[4, 4, 4]} />
            <OrbitControls />
        </Canvas>
    );
};

export default TypingModel;

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
    return (
        <group>
            <primitive object={scene} ref={group as RefObject<Group>} position={[0, 0, 0.6]} />
            <mesh position={[0, -0.02, 0]}>
                <cylinderGeometry args={[2, 2, 0.1]} />
                <meshStandardMaterial color="#14202c" />
            </mesh>
        </group>
    );
};
