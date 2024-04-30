import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Cursor = styled.div`
    pointer-events: none;
    position: fixed;
    left: ${({ position }) => position.x - 10}px;
    top: ${({ position }) => position.y - 10}px;
    display: ${({ hidden }) => (hidden ? "none" : "block")};
    z-index: 9999;
    width: 20px;
    height: 20px;
    border: ${({ isClicked }) =>
        isClicked ? "8px solid gray" : "1px solid white"};
    border-radius: 50%;
    transform: translate(-50%, -50%)
        scale(${({ isClicked }) => (isClicked ? 3 : 1)});
    opacity: ${({ isClicked }) => (isClicked ? 0 : 1)};
    transition: transform 500ms ease-out, opacity 500ms ease-out;
    background-color: transparent;
`;

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const updatePosition = (x, y) => {
        requestAnimationFrame(() => {
            setPosition({ x, y });
        });
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            updatePosition(event.clientX, event.clientY);
        };
        const handleMouseEnter = () => setHidden(false);
        const handleMouseLeave = () => setHidden(true);
        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 500);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return <Cursor position={position} hidden={hidden} isClicked={isClicked} />;
};

export default CustomCursor;
