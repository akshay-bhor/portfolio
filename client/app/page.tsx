"use client";
import ApplicationLayout from "@/components/layout/Application/ApplicationLayout";
import { useState } from "react";
import { useGLTF } from "@react-three/drei";
import WorldModel from "@/modules/Models/WorldModel";
import Intro from "@/modules/Home/Intro";

export default function Home() {
    const [view, setView] = useState<"default" | "model">("default");

    return (
        <>
            <ApplicationLayout headerVariant={view === "model" ? "transparent" : undefined}>
                {view === "default" ? <Intro setView={setView} /> : null}
                {view === "model" ? <WorldModel /> : null}
            </ApplicationLayout>
        </>
    );
}

// Preload the model
useGLTF.preload("/models/run_idle.glb");
