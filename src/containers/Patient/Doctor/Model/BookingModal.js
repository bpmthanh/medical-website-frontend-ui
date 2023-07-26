import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { getDoctorInfoById } from '../../../../services/userService';
import NumberFormat, { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.isOpen,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.sendDataToParent(this.state.modal);
  };

  sendDataToParent = (data) => {
    this.props.sendDataToParent(data);
  };

  closeBtn = (
    <button className="close" onClick={this.toggle} type="button">
      &times;
    </button>
  );

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ modal: this.props.isOpen });
    }
  };

  render() {
    const { className } = this.props;
    const { modal } = this.state;

    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className={`booking-modal-container`}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={this.toggle} close={this.closeBtn}>
          ĐẶT LỊCH KHÁM
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
