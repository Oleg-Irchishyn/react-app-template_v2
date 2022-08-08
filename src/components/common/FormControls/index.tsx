import React, { HTMLInputTypeAttribute } from "react";
import styles from "./styles/FormControls.module.scss";
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";

import { FiledValidatorType } from "./utils/validators";

type FormControlPropsType = {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
  label?: string | undefined;
  type: string | undefined;
  placeholder: string | undefined;
  id: string | undefined;
};

const renderedInput: React.FC<FormControlPropsType> = ({
  input,
  label,
  type,
  meta: { touched, error },
  placeholder,
  id,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <input id={id} {...input} placeholder={placeholder} type={type} autoComplete="off" />
      <label htmlFor={id}>
        <p>{label}</p>
      </label>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export function createInput<FormKeysType extends string>(
  id: string | undefined,
  placeholder: string | undefined,
  name: FormKeysType,
  type: HTMLInputTypeAttribute | undefined,
  validators: Array<FiledValidatorType>,
  props = {},
) {
  return (
    <div>
      <Field
        id={id}
        placeholder={placeholder}
        name={name}
        type={type}
        component={renderedInput}
        validate={validators}
        {...props}
      />
    </div>
  );
}

export function createCheckbox<FormKeysType extends string>(
  id: any,
  name: FormKeysType,
  type: HTMLInputTypeAttribute | undefined,
  labelText: string | undefined,
  validators: Array<FiledValidatorType>,
  props = {},
) {
  return (
    <div>
      <Field
        id={id}
        name={name}
        type={type}
        component={renderedInput}
        label={labelText}
        validate={validators}
        {...props}
      />
    </div>
  );
}
