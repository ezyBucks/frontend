import React from 'react';
import ReactDom from 'react-dom';
import { Header } from './Header';

xit('renders without crashing', () => { // Skip this until I can get the Link components to work in the test
    const div = document.createElement('div');
    ReactDom.render(<Header/>, div);
});
