// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import userSlice from "./userSlice";




// const rootReducer = combineReducers({
  
//     user: userSlice,
// });


// export const store = configureStore({
//   reducer: rootReducer,    
//   middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//           serializableCheck: {
//               ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//           },
//       }),
// });







import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const preloadedState = {
  user: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    token: localStorage.getItem("authToken") || null,
  },
};

const rootReducer = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Load persisted state from localStorage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
