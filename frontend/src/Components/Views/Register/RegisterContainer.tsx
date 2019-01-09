import * as React from "react";
import { RegisterView } from "./RegisterView";

interface RegisterContainerState {
  username: string;
  password: string;
  repassword: string;
}

export class RegisterContainer extends React.Component<
  {},
  RegisterContainerState
> {
  public constructor(props: {}) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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
      case "repassword":
        this.setState({ repassword: value });
        break;
    }
  }

  /**
   * Handle the submit event from the form. This should trigger a POST to the api to fetch the login JWT
   *
   * @param e Event passed from the onSubmit event
   */
  private handleRegister(e: React.SyntheticEvent<any>) {
    e.preventDefault();
    console.log("POST to the api");
    console.log(this.state);
  }

  public render() {
    return (
      <RegisterView
        onChange={this.handleInputChange}
        submit={this.handleRegister}
      />
    );
  }
}
