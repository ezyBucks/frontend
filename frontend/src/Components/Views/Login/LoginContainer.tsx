import * as React from "react";
import { LoginView } from "./LoginView";

interface LoginContainerState {
  username: string;
  password: string;
}

/**
 * Class to handle the logic for the login page
 */
export class LoginContainer extends React.Component<{}, LoginContainerState> {
  constructor(props: {}) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  /**
   * Handle the input changes in the child component
   *
   * @param e Event passed from onChange event
   */
  private handleInputChange(e: React.SyntheticEvent<any>) {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value || "";
    switch (id) {
      case "username":
        this.setState({ username: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
    }
  }

  /**
   * Handle the submit event from the form. This should trigger a POST to the api to fetch the login JWT
   *
   * @param e Event passed from the onSubmit event
   */
  private handleLogin(e: React.SyntheticEvent<any>) {
    e.preventDefault();
    console.log("POST to the api");
    console.log(this.state);
  }

  public render() {
    return (
      <LoginView onChange={this.handleInputChange} submit={this.handleLogin} />
    );
  }
}
