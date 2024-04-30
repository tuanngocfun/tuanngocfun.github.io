import React, { Suspense } from 'react';
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
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="home">
                                    <Home />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/about"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="about">
                                    <About header="About" />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/skills"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="skills">
                                    <Skills header="Skills" />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/education"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="education">
                                    <Education header="Education" />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/experience"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="experience">
                                    <Experience header="Experience" />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/projects"
                        render={() => (
                            <Suspense fallback={<FallbackSpinner />}>
                                <PageTransitionWrapper pageKey="projects">
                                    <Projects header="Projects" />
                                </PageTransitionWrapper>
                            </Suspense>
                        )}
                    />
                    {/* Add more routes as needed */}
                </Switch>
            </main>
        </div>
    );
}

export default MainApp;
