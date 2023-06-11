import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "email", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        arrInput[0] = "first name";
        arrInput[1] = "last name";
        arrInput[2] = "email";
        arrInput[4] = "address";
        arrInput[5] = "phone number";
        isValid = false;
        alert("Missing required field " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditModalUser = () => {
    // let isValid = this.checkValidateInput();
    let isValid = true;
    if (isValid === true) {
      this.props.editUser(this.state);
      this.setState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      });
    }
    this.toggle();
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
        <ModalHeader>Edit a user</ModalHeader>
        <ModalBody>
          <form action="/put-crud" className="form" method="POST">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail4">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputPassword4">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "lastName");
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "email");
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "address");
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="inputCity">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "phoneNumber");
                  }}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              this.handleEditModalUser();
            }}
          >
            Save changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
