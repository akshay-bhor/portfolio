"use client";
import {
    Environment,
    GradientTexture,
    OrbitControls,
    useAnimations,
    useGLTF,
    Cloud,
    Billboard,
    Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Three from "three";
import { Vector3, AnimationAction, Group } from "three";

const worldRadius = 30;

const WorldModel = () => {
    const [characterPosition] = useState(new Vector3(-28, 0, 8));
    const [shouldRun, setShouldRun] = useState(false);
    const [rotationSpeed] = useState(0.5 * 0.2);

    useEffect(() => {
        document.body.style.background = "var(--forground)";

        return () => {
            document.body.style.background = "var(--background)";
        };
    }, []);

    return (
        <div className="w-full h-screen">
            <Canvas
                camera={{ position: [characterPosition.x + 0.4, 1.5, characterPosition.z + 2.5], far: 20 }}
                style={{ zIndex: 1 }}
            >
                <ambientLight intensity={5} />
                <Environment background backgroundIntensity={2}>
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
                <Ring shouldRun={shouldRun} rotationSpeed={rotationSpeed} />
                <CloudRing radius={31} count={20} shouldRun={shouldRun} rotationSpeed={rotationSpeed} />
                <CloudRing radius={28} count={15} shouldRun={shouldRun} rotationSpeed={rotationSpeed} />
                <BillBoards shouldRun={shouldRun} rotationSpeed={rotationSpeed} />
                <spotLight
                    position={[characterPosition.x - 1, 3, characterPosition.z + 2.5]}
                    intensity={10}
                    angle={Math.PI / 2}
                    penumbra={0.4}
                    decay={0.6}
                    castShadow
                />
            </Canvas>
        </div>
    );
};

export default WorldModel;

const Model = ({
    characterPosition,
    shouldRun,
    setShouldRun,
}: {
    characterPosition: Vector3;
    shouldRun: boolean;
    setShouldRun: Dispatch<SetStateAction<boolean>>;
}) => {
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

    return <primitive object={scene} ref={ref} position={characterPosition} rotation={[0, Math.PI * 1.06, 0]} scale={[1, 1, 1]} />;
};

const Ring = ({ shouldRun, rotationSpeed }: { shouldRun: boolean; rotationSpeed: number }) => {
    const group = useRef<Group[]>([]);
    const positions = useMemo(() => {
        const output: Vector3[][] = [];
        const ringSphereCount = 1000;
        let radius = worldRadius; // Outer ring

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

    useFrame((_, delta) => {
        if (shouldRun) {
            group.current.forEach((g) => {
                if (g) {
                    // Rotate each ring
                    g.rotation.y += delta * rotationSpeed;
                }
            });
        }
    });

    return (
        <>
            {positions.map((ring, xidx) => (
                <group
                    key={xidx}
                    ref={(el) => {
                        if (el) group.current[xidx] = el;
                    }}
                >
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

const CloudRing = ({
    radius,
    count,
    shouldRun,
    rotationSpeed,
}: {
    radius: number;
    count: number;
    shouldRun: boolean;
    rotationSpeed: number;
}) => {
    const groupRef = useRef<Group>(null);

    const clouds = useMemo(() => {
        return Array.from(Array(count).keys()).map((_, idx) => {
            const angle = (idx / count) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            return (
                <Cloud
                    key={idx}
                    position={new Vector3(x, Math.random() * 4 + 1, z)}
                    opacity={0.8}
                    speed={0.4}
                    scale={0.2}
                />
            );
        });
    }, [count, radius]);

    useFrame((_, delta) => {
        if (shouldRun && groupRef.current) groupRef.current.rotation.y += delta * rotationSpeed;
    });

    return <group ref={groupRef}>{clouds}</group>;
};

const BillBoards = ({ shouldRun, rotationSpeed }: { shouldRun: boolean; rotationSpeed: number }) => {
    const groupRef = useRef<Group>(null);
    const router = useRouter();

    const navigateTo = useCallback((page: string) => {
        page = page.toLowerCase();
        if (page.includes("about")) router.push("/about");
        if (page.includes("work")) router.push("/work");
        if (page.includes("blog")) router.push("/blog");
        if (page.includes("contact")) router.push("/contact");
    }, [router]);

    const boards = useMemo(() => {
        const texts = ["<About />", "<Work />", "<Blog />", "<Contact />"];

        return Array.from(Array(16).keys()).map((_, idx) => {
            const angle = (idx / 16) * Math.PI * 2;
            const x = (worldRadius - (idx % 2 === 0 ? 1.5 : 0.5)) * Math.cos(angle);
            const y = 2;
            const z = worldRadius * Math.sin(angle);
            const page = texts[idx % texts.length];

            return (
                <Billboard
                    key={idx}
                    follow={true}
                    lockX={false}
                    lockY={false}
                    lockZ={false}
                    castShadow
                    receiveShadow
                    position={new Vector3(x, y, z)}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        onPointerOver={() => (document.body.style.cursor = "pointer")}
                        onPointerLeave={() => (document.body.style.cursor = "default")}
                        onClick={() => navigateTo(page)}
                    >
                        <boxGeometry args={[0.5, 0.3, 0.026]} />
                        <meshPhysicalMaterial
                            color="#ef768e"
                            opacity={0.4}
                            transmission={0.4}
                            roughness={0.1}
                            metalness={0.8}
                            envMapIntensity={1.5}
                        />
                        <Text
                            position={[0, 0, 0.014]}
                            fontSize={0.05}
                            color="#14202c"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {page}
                        </Text>
                    </mesh>
                </Billboard>
            );
        });
    }, [navigateTo]);

    useFrame((_, delta) => {
        if (shouldRun && groupRef.current) groupRef.current.rotation.y += delta * rotationSpeed;
    });

    return <group ref={groupRef}>{boards}</group>;
};
