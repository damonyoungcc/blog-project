import React from 'react';
import Layout from '../components/layout';
import './style.scss';

class BBS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <div>bbs</div>
      </Layout>
    );
  }
}
export default BBS;
