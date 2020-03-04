import React, { Suspense, lazy } from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/loading';

const Home = lazy(() => import('./home'));
const Sign = lazy(() => import('./sign'));

class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense
          fallback={
            <div className="loading">
              <Loading />
            </div>
          }
        >
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/signin" component={Sign} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
