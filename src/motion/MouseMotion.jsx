import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from "./use-follow-pointer";

const MouseMotion = () => {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

    return (
        <motion.div
            ref={ref}
            className="box"
            style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
            }}
            animate={{ x, y }}
            transition={{
                type: "spring",
                damping: 3,
                stiffness: 50,
                restDelta: 0.001,
            }}
        />
    );
};

export default MouseMotion;
