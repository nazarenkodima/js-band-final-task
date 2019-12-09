import React from 'react';

import Styles from '../../components/SignIn/styles.m.css';

const required = value => (value ? undefined : 'Field is not valid');

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength16 = maxLength(16);

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength4 = minLength(4);

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={Styles}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className={Styles.inputLabel}>{label}</label>
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className={Styles.errorSpan}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export { required, maxLength16, minLength4, renderField };
