import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
// import '../css/PageTransitions.css'
import styled from "styled-components";

const variants = {
    home: {
        initial: { opacity: 0, y: 300 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -300 },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    about: {
        initial: { opacity: 0, x: -300 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 300 },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    skills: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0 },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    education: {
        initial: { x: "100vw" },
        animate: { x: 0 },
        exit: { x: "-100vw" },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    experience: {
        initial: { scale: 1.5 },
        animate: { scale: 1 },
        exit: { scale: 0.5 },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
    projects: {
        initial: { rotate: 90 },
        animate: { rotate: 0 },
        exit: { rotate: -90 },
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

// Define my styled component outside of the render function
const StyledMotionDiv = styled(motion.div)`
  height: 100%;  // Ensure the div takes full height of the parent
  display: flex; // Using flex to center children
  flexDirection: column; // Align children vertically
  justifyContent: 'center'; // Center children vertically
  alignItems: 'center'; // Center children horizontally
`;

const PageTransitionWrapper = ({ children, pageKey }) => {
    return (
        <AnimatePresence mode="wait">
            <StyledMotionDiv
                key={pageKey}
                variants={variants[pageKey]}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="layout-wrapper">
                    {" "}
                    {/* This div maintains the layout */}
                    {children}
                </div>
            </StyledMotionDiv>
        </AnimatePresence>
    );
};


// Add PropTypes for validation
PageTransitionWrapper.propTypes = {
    children: PropTypes.node.isRequired, // React node expected for children
    pageKey: PropTypes.string.isRequired, // String for pageKey
};

export default PageTransitionWrapper;
