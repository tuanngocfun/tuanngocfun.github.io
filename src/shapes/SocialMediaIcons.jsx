import React from "react";
import { motion } from "framer-motion";

// Your social media icon paths or components go here
import { ReactComponent as LinkedInIcon } from "../icon/iconmonstr-linkedin-3.svg";
import { ReactComponent as GitHubIcon } from "../icon/iconmonstr-github-1.svg";
import { ReactComponent as EmailIcon } from "../icon/iconmonstr-mail-thin.svg";

const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    press: { scale: 0.9 },
};

export const SocialMediaIcons = () => {
    return (
        <div>
            {/* LinkedIn Icon */}
            <motion.a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="press"
            >
                <LinkedInIcon />
            </motion.a>

            {/* GitHub Icon */}
            <motion.a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="press"
            >
                <GitHubIcon />
            </motion.a>

            {/* Email Icon */}
            <motion.a
                href="mailto:your-email@example.com"
                variants={iconVariants}
                initial="rest"
                whileHover="hover"
                whileTap="press"
            >
                <EmailIcon />
            </motion.a>
        </div>
    );
};
