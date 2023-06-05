import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    let arrInput = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing required field " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if(isValid===true){
      this.props.createNewUser(this.state);
    }
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
        // toggle={() => {
        //   this.toggle();
        // }}
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
                  name="firstName"
                  value={this.state.firstName}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "firstName");
                  }}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "lastName");
                  }}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "email");
                  }}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "password");
                  }}
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
                  value={this.state.address}
                  onChange={(e) => {
                    this.handleOnchangeInput(e, "address");
                  }}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">Phone number</label>
                <input
                  type="text"
                  class="form-control"
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
              this.handleAddNewUser();
            }}
          >
            Add new
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
