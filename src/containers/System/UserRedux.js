import React, { Component } from 'react';
import { connect } from 'react-redux';
class UserRedux extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">Medical clinic</div>
        <div className="user-redux-body"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
