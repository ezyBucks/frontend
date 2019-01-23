import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

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
        </header>
    );
};
