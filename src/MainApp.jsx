import React, { Suspense } from 'react';
import { useQuery } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const { data, isLoading, error } = useQuery('routesData', () =>
    fetch(endpoints.routes).then((res) => res.json())
  );

  if (isLoading) return <FallbackSpinner />;
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          {data?.sections.map((route) => {
            const SectionComponent = React.lazy(() => import('./components/' + route.component));
            return (
              <Route
                key={route.headerTitle}
                path={route.path}
                render={() => (
                  <Suspense fallback={<FallbackSpinner />}>
                    <SectionComponent header={route.headerTitle} />
                  </Suspense>
                )}
              />
            );
          })}
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
