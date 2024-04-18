import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";

const iconStyle = {
    width: 40, // Adjust size as needed
    height: 40, // Adjust size as needed
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
};

const iconVariants = {
    rest: {
        scale: 1,
        skewX: 0,
    },
    hover: {
        scale: 1.2,
        skewX: [0, 10, -10, 10, 0],
        transition: { duration: 0.7 },
    },
    press: {
        scale: 0.9,
        rotate: -20, // Degree of rotation on tap
    },
    pulse: {
        scale: [1, 1.05, 1],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    },
    bounce: {
        y: [0, -10, 0],
        transition: { duration: 0.6, repeat: Infinity, ease: "easeOut" },
    },
};

function Social() {
    const theme = useContext(ThemeContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(endpoints.social, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error(err));
    }, []);

    const iconContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    };

    return (
        <div className="social">
            <h5>Contact me at:</h5> <br />
            <div style={iconContainerStyle}>
                {data &&
                    data.social.map((social) => (
                        <motion.div
                            key={social.network}
                            variants={iconVariants}
                            initial="rest"
                            animate="pulse"
                            whileHover="hover"
                            whileTap="press"
                            style={iconStyle}
                        >
                            <SocialIcon
                                url={social.href}
                                network={social.network}
                                bgColor={theme.socialIconBgColor}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        </motion.div>
                    ))}
            </div>
        </div>
    );
}


export default Social;
