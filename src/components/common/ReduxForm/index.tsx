import React from "react";
import cn from "classnames";
import { compose } from "redux";
import { v4 as uuidv4 } from "uuid";
import { FormAction, InjectedFormProps, reduxForm } from "redux-form";
import { createCheckbox, createInput } from "../FormControls/";
import { maxLengthCreator, required, emailValidation } from "../FormControls/utils/validators";

const ExampleReduxForm: React.FC = React.memo(() => {
  const onCancelSubmit = () => {
    console.log("Cancel Submit");
  };

  const onSubmitForm = (values: ExampleFormValuesType, dispatch: (T: FormAction) => void) => {
    console.log("Submitted");
  };
  return (
    <div>
      <ExampleFormRedux onCancelSubmit={onCancelSubmit} onSubmit={onSubmitForm} />
    </div>
  );
});

const maxLength20 = maxLengthCreator(20);

const ExampleForm: React.FC<InjectedFormProps<ExampleFormValuesType, PropsType> & PropsType> = (
  props,
) => {
  const { handleSubmit, onCancelSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      {createInput<ExampleFormValuesTypeKeys>(uuidv4(), `Enter some text`, "text", "text", [
        required,
        maxLength20,
      ])}
      {createInput<ExampleFormValuesTypeKeys>(uuidv4(), "Email*", "email", "text", [
        required,
        emailValidation,
      ])}
      {createCheckbox<ExampleFormValuesTypeKeys>(
        "personalData",
        "personalData",
        "checkbox",
        "I consent to the processing of my personal data",
        [required],
      )}

      {createCheckbox<ExampleFormValuesTypeKeys>(
        "subscribe",
        "subscribe",
        "checkbox",
        "Subscribe to news updates",
        [],
      )}
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <div onClick={onCancelSubmit}>Cancel</div>
      </div>
    </form>
  );
};

type PropsType = {
  onCancelSubmit: () => void;
};

const ExampleFormRedux = reduxForm<ExampleFormValuesType, PropsType>({
  form: "exampleReduxForm",
})(ExampleForm);

export type ExampleFormValuesType = {
  text: string;
  email: string | number;
  personalData: boolean;
  subscribe: boolean;
};

type ExampleFormValuesTypeKeys = Extract<keyof ExampleFormValuesType, string>;

export default compose<React.ComponentType>()(ExampleReduxForm);
