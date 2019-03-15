import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import authenticateReducer from './authenticate/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    authenticate: authenticateReducer
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
