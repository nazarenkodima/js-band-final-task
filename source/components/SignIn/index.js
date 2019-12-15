// Core
import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { authActions } from '../../bus/auth/actions';

// Styles
import Styles from './styles.m.css';
import Avatar from '../../theme/images/userLogo.png';

// Validators
import { required, minLength4, maxLength16, renderField } from '../../bus/validators/validators';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    username: getFormValues('signIn')(state),
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...authActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
class SignIn extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { actions, username, valid } = this.props;

    if (valid) actions.signInAsync(username);
  };

  render() {
    const { isFetching } = this.props;

    const buttonMessage = isFetching ? 'Loading...' : 'Sign-In';

    return (
      <section className={Styles.signIn}>
        <div>
          <img src={Avatar} alt="userLogo" />
        </div>
        <form onSubmit={this.handleSubmit}>
          <Field
            name="username"
            type="text"
            component={renderField}
            label="Username"
            validate={[required, maxLength16, minLength4]}
          />
          <div>
            <button className={Styles.buttonStyle} disabled={isFetching} type="submit">
              {buttonMessage}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default reduxForm({
  form: 'signIn',
})(SignIn);
