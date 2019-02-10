import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Class to render the header for the application
 */
export const Header: React.SFC = () => {
    return (
        <header className="App-header">
            <span style={{ marginRight: 'auto' }}>ezyBucks</span>
            <Button type="primary" style={{ margin: '2px' }}>
                <Link to="/">Home</Link>
            </Button>
            <Button type="primary" style={{ margin: '2px' }}>
                <Link to="/login">Login</Link>
            </Button>
            <Button type="primary" style={{ margin: '2px' }}>
                <Link to="/register">Register</Link>
            </Button>
            <Button type="primary" style={{ margin: '2px' }}>
                <Link to="/private">private</Link>
            </Button>
            <Button type="primary" style={{ margin: '2px' }}>
                <Link to="/public">public</Link>
            </Button>
        </header>
    );
};
