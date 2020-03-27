import React, { Suspense, lazy } from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/loading';

const Home = lazy(() => import('./home'));
const Sign = lazy(() => import('./sign'));
const BBS = lazy(() => import('./bbs'));
const NewsDetail = lazy(() => import('./news'));

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
            <Route exact path="/signin" component={Sign} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/bbs" component={BBS} />
            <PrivateRoute exact path="/news/:id" component={NewsDetail} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
