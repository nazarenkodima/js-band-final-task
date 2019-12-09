// Core
import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { signInActions } from '../../bus/signIn/actions';

// Styles
import Styles from './styles.m.css';
import Avatar from '../../theme/images/userLogo.png';

// Validators
import { required, minLength4, maxLength16, renderField } from '../../bus/validators/validators';

const matStateToProps = state => {
  console.log(state);
  return {
    isFetching: state.signInReducer.isFetching,
    username: getFormValues('signIn')(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...signInActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
class SignIn extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const { actions, username } = this.props;

    actions.signInAsync(username);
  };

  render() {
    const { pristine, isFetching } = this.props;

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
            <button className={Styles.buttonStyle} disabled={pristine || isFetching} type="submit">
              {buttonMessage}
            </button>
          </div>
        </form>
      </section>
    );
  }
}

// eslint-disable-next-line no-class-assign
SignIn = reduxForm({
  form: 'signIn',
})(SignIn);

export default SignIn;
