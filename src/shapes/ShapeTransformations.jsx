import React, { Suspense } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { transition } from "./settings";
import { Shapes } from "./Shape";

const ShapeTransformations = ({ isHover, isPress, mouseX, mouseY }) => {
    return (
        <MotionConfig transition={transition}>
            <Canvas
                shadows
                dpr={[1, 2]}
                resize={{ scroll: false, offsetSize: true }}
            >
                <Shapes
                    isHover={isHover}
                    isPress={isPress}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            </Canvas>
        </MotionConfig>
    );
};

export default ShapeTransformations;
