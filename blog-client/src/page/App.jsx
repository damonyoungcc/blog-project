import React, { Suspense, lazy } from 'react';
import './style.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/loading';

const Home = lazy(() => import('./home'));
const Sign = lazy(() => import('./sign'));
const BBS = lazy(() => import('./bbs'));
const BBSDetail = lazy(() => import('./bbs/detail'));
const NewsDetail = lazy(() => import('./news'));
const Mine = lazy(() => import('./mine'));

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
            <PrivateRoute exact path="/bbs/:id" component={BBSDetail} />
            <PrivateRoute exact path="/bbs/:id" component={NewsDetail} />
            <PrivateRoute exact path="/mine" component={Mine} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
