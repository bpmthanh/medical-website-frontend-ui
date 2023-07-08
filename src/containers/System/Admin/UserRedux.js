import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllCodeService } from '../../../services/userService';
import { languages } from '../../../utils';
import * as actions from '../../../store/actions';

class UserRedux extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
    // try {
    //   const fetchData = async () => {
    //     const res = await getAllCodeService('gender');
    //     if (res && res.errCode === 0) {
    //       this.setState({
    //         genderArr: res.data,
    //       });
    //     }
    //   };
    //   fetchData();
    // } catch (error) {
    //   console.error('Error occurred while fetching gender data:', error);
    // Thực hiện các xử lý khác tùy thuộc vào yêu cầu của bạn
    // }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    let genderRedux = this.props.genderRedux;
    console.log("Check: ",genderRedux);
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.title" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.phone" />
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="inputState">
                      <FormattedMessage id="manage-user.gender.title" />
                    </label>
                    <select id="inputState" className="form-control">
                      {genderRedux &&
                        genderRedux.length > 0 &&
                        genderRedux.map((gender, index) => {
                          return (
                            <option key={index}>
                              {language === languages.VI
                                ? gender.value_vi
                                : gender.value_en}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="">
                      <FormattedMessage id="manage-user.position.title" />
                    </label>
                    <select id="" className="form-control"></select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="">
                      <FormattedMessage id="manage-user.role-id.title" />
                    </label>
                    <select id="" className="form-control"></select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputZip">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <input
                      type="image"
                      className="form-control"
                      src="img_submit.gif"
                      alt="Submit"
                      width="33"
                      height="33"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0 15px', margin: '10px 0 0 0' }}
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
