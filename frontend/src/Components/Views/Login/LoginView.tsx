import * as React from "react";
import { ControlledInput } from "../../Misc/ControlledInput";
import { Icon, Button } from "antd";

interface LoginViewProps {
  /** Function to handle changes of both user inputs in the view */
  onChange: (e: React.SyntheticEvent) => void;
  /** Function to handle submitting the login */
  submit: (e: React.SyntheticEvent) => void;
}

/**
 * Class to render the view for the login page. This is a Stateless Function Component as it should not have any state, and does not need the lifecycle methods,
 * which should help performance
 */
export const LoginView: React.SFC<LoginViewProps> = props => {
  return (
    <form onSubmit={props.submit}>
      <div>
        <ControlledInput
          onChange={props.onChange}
          prefix={<Icon type="user" />}
          placeholder="Enter your username"
          id="username"
        />
      </div>
      <div>
        <ControlledInput
          onChange={props.onChange}
          placeholder="Please enter your password"
          type="password"
          id="password"
        />
      </div>
      <Button htmlType="submit" type="primary" onClick={props.submit}>
        Login
      </Button>
    </form>
  );
};
