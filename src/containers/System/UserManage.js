import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import { getAllUsers, createNewUserReact } from "../../services/userService";
import ModalUser from "./modalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    try {
      let response = await getAllUsers("All");
      if (response && response.errCode === 0) {
        this.setState({
          arrUsers: response.users,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  toggleUSerModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserReact(data);
      if (response && response.errCode !== 0) {
        alert(response.message)
      }
      else{
        await this.getAllUsersFromReact()
        this.setState({
          isOpenModal:false
        })
      }
    } catch (e) {}
  };

  render() {
    return (
      <div className="user-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          toggleFromParent={this.toggleUSerModal}
          size="lg"
          centered="center"
          className={"modal-user-container"}
          createNewUser={this.createNewUser}
        />
        <div className="title text-center user-header-title">Manage user</div>
        <div className="container" style={{ marginBottom: "10px" }}>
          <button
            className="custom-add-new-user-button"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add new user
          </button>
        </div>
        <div className="container users-table">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Action</th>
            </tr>
            {this.state.arrUsers.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.email}</td>
                  <td>{element.firstName}</td>
                  <td>{element.lastName}</td>
                  <td>{element.address}</td>
                  <td>{element.phoneNumber}</td>
                  <td className="del-edit-btn-custom">
                    <button
                      className="bg-success edit-btn-custom"
                      type="button"
                    >
                      <a href={`/api/edit-user?id=${element.id}`}>Edit</a>
                    </button>
                    <button
                      className="bg-danger delete-btn-custom"
                      type="button"
                    >
                      <a href={`/api/delete-user?id=${element.id}`}>Delete</a>
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
