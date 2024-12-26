import React, { Suspense } from 'react';
import PropTypes from "prop-types";
import { useQuery } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import endpoints from './constants/endpoints';

// Lazy load each component
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Education = React.lazy(() => import('./components/Education'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));

// Reusable route component
function RenderRoute({ path, pageKey, Component, header }) {
    return (
        <Route
            path={path}
            render={() => (
                <Suspense fallback={<FallbackSpinner />}>
                    <PageTransitionWrapper pageKey={pageKey}>
                        <Component header={header} />
                    </PageTransitionWrapper>
                </Suspense>
            )}
        />
    );
}

// Define prop types
RenderRoute.propTypes = {
    path: PropTypes.string.isRequired,
    pageKey: PropTypes.string.isRequired,
    Component: PropTypes.elementType.isRequired, // React component
    header: PropTypes.string, // Optional header
};

// Define default props (optional)
RenderRoute.defaultProps = {
    header: null, // Default to null if not provided
};

function MainApp() {
    const { isLoading, error } = useQuery('routesData', () =>
        fetch(endpoints.routes).then(res => res.json())
    );

    if (isLoading) return <FallbackSpinner />;
    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <div className="MainApp">
            <NavBarWithRouter />
            <main className="main">
                <Switch>
                    <RenderRoute exact path="/" Component={Home} />
                    <RenderRoute path="/about" Component={About} header="About" />
                    <RenderRoute path="/skills" Component={Skills} header="Skills" />
                    <RenderRoute path="/education" Component={Education} header="Education" />
                    <RenderRoute path="/experience" Component={Experience} header="Experience" />
                    <RenderRoute path="/projects" Component={Projects} header="Projects" />
                    {/* Add more routes as needed */}
                </Switch>
            </main>
        </div>
    );
}

export default MainApp;
