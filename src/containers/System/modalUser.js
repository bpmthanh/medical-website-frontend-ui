import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        size={this.props.size}
        centered={this.props.centered}
        className={this.props.className}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <form action="/put-crud" className="form" method="POST">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">First name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  name="firstName"
                  value=""
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  name="lastName"
                  value=""
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="1234 Main St"
                  value=""
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  value=""
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">Phone number</label>
                <input
                  type="text"
                  class="form-control"
                  name="phoneNumber"
                  value=""
                />
              </div>
              <div class="form-group col-md-3">
                <label for="inputState">Sex</label>
                <select name="gender" class="form-control">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
            </div>
            <input type="text" name="id" value="" hidden />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              this.toggle();
            }}
          >
            Do something
          </Button>
          <Button
            color="danger"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
