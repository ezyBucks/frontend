import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

interface ControlledInputProps extends InputProps {
    onChange?: (e: React.SyntheticEvent<any>) => void;
    placeholder?: string;
    prefix?: React.ReactNode; // This is the antd prefix icon
    type?: 'password';
    id?: string;
}

/**
 * Component to handle controlled input when needed. Takes an onChange function as part of its props to let the parent handle the state.
 * It will use the antd password type if the type is set to 'password'
 *
 * @param props
 */
export const ControlledInput: React.SFC<ControlledInputProps> = props => {
    return props.type == 'password' ? (
        <Input.Password
            placeholder={props.placeholder}
            prefix={props.prefix}
            onChange={props.onChange}
            id={props.id}
            {...props}
        />
    ) : (
        <Input
            placeholder={props.placeholder}
            prefix={props.prefix}
            onChange={props.onChange}
            id={props.id}
            {...props}
        />
    );
};
