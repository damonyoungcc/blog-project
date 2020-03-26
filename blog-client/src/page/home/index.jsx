import React from 'react';
import Layout from '../components/layout';
import './style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div>home1111</div>
      </Layout>
    );
  }
}
export default Home;
