import { motion, useMotionValue, useTransform } from "framer-motion";

const MouseTracker = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event) => {
        mouseX.set(event.clientX); // Update motion value
        mouseY.set(event.clientY); // Update motion value
    };

    // If using transformations:
    const xInput = [-100, 0, 100];
    const xOutput = [-1, 0, 1];
    const scaleX = useTransform(mouseX, xInput, xOutput);

    return (
        <div onMouseMove={handleMouseMove}>
            <motion.div style={{ scaleX }} />
        </div>
    );
};

export default MouseTracker;