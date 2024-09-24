"use client";
import { Environment, GradientTexture, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Three from "three";
import { Vector3, AnimationAction, Group } from "three";

const World = () => {
    const [characterPosition] = useState(new Vector3(-28, 0, 8));
    const [shouldRun, setShouldRun] = useState(false);

    return (
        <div className="w-full h-screen">
            <Canvas camera={{ position: [characterPosition.x + 0.4, 1.5, characterPosition.z + 2.5], far: 20 }}>
                <ambientLight intensity={5} />
                <Environment background>
                    <mesh scale={100} rotation={[0, 0, Math.PI / 2]}>
                        <sphereGeometry args={[1, 200, 200]} />
                        <meshBasicMaterial side={Three.BackSide}>
                            <GradientTexture stops={[0, 1]} colors={["white", "#e62d51"]} attach="map" />
                        </meshBasicMaterial>
                    </mesh>
                </Environment>
                <OrbitControls
                    target={[characterPosition.x, 1.5, characterPosition.z]}
                    enablePan={false}
                    enableRotate={false}
                    enableZoom={false}
                />
                <Model characterPosition={characterPosition} shouldRun={shouldRun} setShouldRun={setShouldRun} />
                <Ring shouldRun={shouldRun} />
            </Canvas>
        </div>
    );
};

export default World;

const Model = ({ characterPosition, shouldRun, setShouldRun }: { characterPosition: Vector3, shouldRun: boolean, setShouldRun: Dispatch<SetStateAction<boolean>> }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF("/models/run_idle.glb");
    const { actions, mixer } = useAnimations(animations, ref);
    
    const currentAction = useRef<AnimationAction | null>(null);

    const startRun = useCallback(() => {
        setShouldRun(true);
    }, [setShouldRun]);

    const stopRun = useCallback(() => {
        setShouldRun(false);
    }, [setShouldRun]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "w") {
                startRun();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === "w") {
                stopRun();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("touchstart", startRun);
        window.addEventListener("touchmove", startRun);
        window.addEventListener("touchend", stopRun);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.addEventListener("touchstart", startRun);
            window.removeEventListener("touchmove", startRun);
            window.removeEventListener("touchend", stopRun);
        };
    }, [startRun, stopRun]);

    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const animationList = Object.keys(actions);
            const runAction = actions[animationList[1]];
            const idleAction = actions[animationList[0]];

            // Set up crossfade between animations
            const crossFadeDuration = 0.5;

            if (currentAction.current) currentAction.current.fadeOut(crossFadeDuration);

            currentAction.current = shouldRun ? runAction : idleAction;

            currentAction.current?.reset().fadeIn(crossFadeDuration).play();
        }
    }, [shouldRun, actions, mixer]);

    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const animationList = Object.keys(actions);
            const runAction = actions[animationList[1]];

            // Ensure the model runs in place
            if (runAction) {
                const runClip = runAction.getClip();
                const track = runClip.tracks.find((t) => t.name.includes("position"));
                if (track) {
                    track.setInterpolation(Three.InterpolateLinear);
                    for (let i = 0; i < track.times.length; i++) {
                        track.values[i * 3] = 0; // X
                        track.values[i * 3 + 2] = 0; // Z
                    }
                }
            }
        }
    }, [actions, mixer]);

    return <primitive object={scene} ref={ref} position={characterPosition} rotation={[0, Math.PI * 1.06, 0]} />;
};

const Ring = ({ shouldRun }: { shouldRun: boolean }) => {
    const group = useRef<Group[]>([]);
    const positions = useMemo(() => {
        const output: Vector3[][] = [];
        const ringSphereCount = 1000;
        let radius = 30; // Outer ring

        Array.from(Array(5).keys()).forEach(() => {
            const ringPos: Vector3[] = [];

            for (let i = 0; i < ringSphereCount; i++) {
                // calculate position
                const angle = (i / ringSphereCount) * Math.PI * 2;
                ringPos.push(
                    new Vector3(
                        radius * Math.cos(angle),
                        0, // y is always 0 for equator
                        radius * Math.sin(angle)
                    )
                );
            }

            radius -= 0.4;
            output.push(ringPos);
        });

        return output;
    }, []);

    useFrame((state, delta) => {
        if(shouldRun) {
            group.current.forEach(g => {
                if (g) {
                    // Rotate each ring at a different speed
                    g.rotation.y += delta * (0.5 * 0.2);
                }
            })
        }
    })

    return (
        <>
            {positions.map((ring, xidx) => (
                <group key={xidx} ref={(el) => { if(el) group.current[xidx] = el; }}>
                    {ring.map((positionVector, yidx) => (
                        <mesh key={`dot-${xidx}-${yidx}`} position={positionVector}>
                            <sphereGeometry args={[0.008, 10, 10]} />
                            <meshStandardMaterial color="#14202c" />
                        </mesh>
                    ))}
                </group>
            ))}
        </>
    );
};
