import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
};

// Load state from local storage if available
const persistedState = localStorage.getItem("authState")
    ? JSON.parse(localStorage.getItem("authState"))
    : initialState;

const authSlice = createSlice({
    name: "auth",
    initialState: persistedState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            localStorage.setItem("authState", JSON.stringify(state));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem("authState");
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
