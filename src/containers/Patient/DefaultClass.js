import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DefaultClass.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getDoctorInfoById } from '../../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

  componentDidUpdate = async (prevProps, prevState, snapshot) => {};

  render() {
    return (
      <>
        <div className="doctor-extra-info-container"></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
