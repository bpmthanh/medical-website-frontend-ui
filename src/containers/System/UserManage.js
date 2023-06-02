import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./userManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
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
  }

  render() {
    return (
      <div className="uses-container">
        <div className="title text-center">Manage user</div>
        <div className="users-table container">
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
                  <td>
                    <button className="bg-success" type="button">
                      <a href={`/api/edit-user?id=${element.id}`}>Edit</a>
                    </button>
                    <button
                      className="bg-danger"
                      style={{ marginLeft: "20px" }}
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
