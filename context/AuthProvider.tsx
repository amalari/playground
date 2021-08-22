import React, { useReducer } from "react";
import {AuthStateContext, AuthDispatchContext} from './context'
import { initialState, AuthReducer } from "./reducer";

const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export default AuthProvider