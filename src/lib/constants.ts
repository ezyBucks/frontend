const API_ADDRESS = {
    URL: process.env.REACT_APP_SERVER_HOST ? 'http://ec2-13-239-33-36.ap-southeast-2.compute.amazonaws.com' : 'http://localhost',
    PORT: '8081'
};

/**
 * The url of the api to be used throughout the app
 */
export const HOST = `${API_ADDRESS.URL}:${API_ADDRESS.PORT}`;

/**
 * The hexadecimal colour code which ant.design uses for their components.
 */
export const ANTD_COLOUR = '#1890ff';