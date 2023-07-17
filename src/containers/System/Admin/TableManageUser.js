import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers.users !== this.props.listUsers.users) {
      this.setState({ userRedux: this.props.listUsers.users.reverse() });
    }
  }

  handleDelete = (userInfo) => {
    this.props.deleteAUser(userInfo.id);
    setTimeout(() => {
      this.props.fetchAllUsers();
    }, 100);
  };

  handleEditUser = (userInfo) => {
    this.props.handleEditUserFromParent(userInfo);
  };

  render() {
    let arrUsers = this.state.userRedux;
    return (
      <div className="container table-manage-user">
        <p className="table-title">Danh sách người dùng</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.gender}</td>
                    <td>{user.positionId}</td>
                    <td>{user.roleId}</td>
                    <td className="action-btn">
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(user)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDelete(user)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <MdEditor
          style={{ height: '500px', margin: '50px 0 0 0' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(actions.fetchAllUSersStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUSerStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
