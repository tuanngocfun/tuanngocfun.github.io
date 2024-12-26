import React from "react"; 
import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import Github from "./Github";
import '../css/About.css'

const styles = {

    introTextContainer: {
        textAlign: "left",
        fontSize: "1.4em",
        fontWeight: 600,
    },
    honorTextContainer: {
        textAlign: "left",
        fontSize: "1em",
        fontWeight: 600,
        color: "#9AA3BB",
    },
    introImageContainer: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
    },
};

function About({ header }) {
    const fetchAboutData = async () => {
        const res = await fetch(endpoints.about);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    };

    const { data, isLoading, error } = useQuery("aboutData", fetchAboutData);

    const parseIntro = (text, style) => (
        <div style={style}>
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );

    if (isLoading) return <FallbackSpinner />;
    if (error) return <div>Error fetching data</div>;

    return (
        <>
            <Header title={header} />
            <div className="section-content-container">
                <Container>
                    {data && (
                        <Fade>
                            <Row>
                                <Col>
                                    <p style={styles.introTextContainer}>
                                        {parseIntro(data.about)}
                                    </p>
                                    <p style={styles.honorTextContainer}>
                                        {parseIntro(data.honor)}
                                    </p>
                                </Col>
                                <Col style={styles.introImageContainer}>
                                    <img
                                        src={data?.imageSource}
                                        alt="profile"
                                        width="65%"
                                    />
                                </Col>
                            </Row>
                        </Fade>
                    )}
                </Container>
                <Github />
            </div>
        </>
    );
}

About.propTypes = {
    header: PropTypes.string.isRequired,
};

export default About;
