import * as React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    isAuthenticated: boolean;
    redirectPath: string;
}

/**
 * A class to restrict access based on the isAuthenticated prop. When this is false, the route will redirect to the redirect prop
 * When the isAuthenticated is true, the route will render the component as per usual.
 * This provides a convienient way to redirect to the login page for pages that are private
 */
export class PrivateRoute extends React.Component<PrivateRouteProps> {
    public constructor(props: PrivateRouteProps) {
        super(props);
    }

    public render() {
        const renderedComponent = () => (
            <Redirect to={this.props.redirectPath} />
        );
        if (!this.props.isAuthenticated) {
            return <Route {...this.props} component={renderedComponent} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}
