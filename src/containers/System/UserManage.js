import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss';
import {
  getAllUsers,
  createNewUserReact,
  deleteUserReact,
  editUserReact,
} from '../../services/userService';
import ModalUser from './modalUser';
import ModalEditUser from './modalEditUser';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      idNow: null,
      tableHeight: 'auto', // Chiều cao mặc định là auto
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
    this.updateTableHeight();
    window.addEventListener('resize', this.updateTableHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTableHeight);
  }

  getAllUsersFromReact = async () => {
    try {
      let response = await getAllUsers('All');
      if (response && response.errCode === 0) {
        this.setState({
          arrUsers: response.users,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateTableHeight = () => {
    const windowHeight = window.innerHeight;
    const tableContainer = document.querySelector('.users-table');
    const tableContainerRect = tableContainer.getBoundingClientRect();
    const tableContainerTop = tableContainerRect.top;
    const desiredHeight = windowHeight - tableContainerTop - windowHeight * 0.1; // 10vh cách đáy màn hình

    this.setState({
      tableHeight: desiredHeight + 'px',
    });
  };

  toggleUSerModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleUSerEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
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
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModal: false,
        });
      }
    } catch (e) {}
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserReact(user.id);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      alert(
        'An error occurred while deleting the user. Please try again later.'
      );
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      idNow: user.id,
    });
  };

  editUser = async (user) => {
    try {
      // Loại bỏ các thuộc tính có giá trị rỗng
      let filteredUser = Object.fromEntries(
        Object.entries(user).filter(([_, value]) => value !== '')
      );
      let response = await editUserReact(this.state.idNow, filteredUser);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      alert(
        'An error occurred while deleting the user. Please try again later.'
      );
    }
  };

  render() {
    return (
      <div className="user-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          toggleFromParent={this.toggleUSerModal}
          size="lg"
          centered="center"
          className={'modal-user-container'}
          createNewUser={this.createNewUser}
        />

        <ModalEditUser
          size="lg"
          centered="center"
          className={'modal-edit-user-container'}
          isOpenModal={this.state.isOpenEditModal}
          toggleFromParent={this.toggleUSerEditModal}
          editUser={this.editUser}
        />
        <div className="title text-center user-header-title">Manage user</div>
        <div className="container" style={{ marginBottom: '10px' }}>
          <button
            className="custom-add-new-user-button"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add new user
          </button>
        </div>
        <div
          className="container users-table"
          style={{ height: this.state.tableHeight, overflowY: 'auto' }} // Sử dụng chiều cao và overflowY được tính toán từ state
        >
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
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
                        onClick={() => {
                          this.handleEditUser(element);
                        }}
                      >
                        Edit
                        {/* <a href={`/api/edit-user?id=${element.id}`}>Edit</a> */}
                      </button>
                      <button
                        className="bg-danger delete-btn-custom"
                        type="button"
                        onClick={() => {
                          this.handleDeleteUser(element);
                        }}
                      >
                        Delete
                        {/* <a href={`/api/delete-user?id=${element.id}`}>Delete</a> */}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
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
