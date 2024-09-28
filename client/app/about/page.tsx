"use client";
import About from "@/modules/About/About";
import { useEnvironment, useGLTF } from "@react-three/drei";

export default function AboutPage() {
    return <About />;
}

// Preload the model & environment
useGLTF.preload("/models/run_idle.glb");
useEnvironment.preload({ preset: "forest" });
