"use client";
import About from "@/modules/About/About";
import { useGLTF } from "@react-three/drei";

export default function AboutPage() {
    return <About />;
}

// Preload the model
useGLTF.preload("/models/run_idle.glb");
