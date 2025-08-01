// // src/redux/slices/userSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import { Endpoints } from '../constant/apiEndPoints';
// import { Login } from '../Apis/apiHandlers';

// const storedUser = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

// const initialState = {
//   user: storedUser || {},  // Ensuring user is at least an empty object
//   isAuthenticated: storedUser ? true : false,
//   isLoading: false,
//   error: null,
// };


// // Async Thunk for User Login

// export const loginUser = createAsyncThunk(
//   Endpoints.LogIn,
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await Login(data)
//       // console.log(response,"res")
//       localStorage.setItem("token",response.acess_token)
//       return response; // Returning user data
//     } catch (error) {
//       toast.error(error.message || 'Something went wrong!');
//       return rejectWithValue(error.message);
//     }
//   }
// );




// // User Slice
// // const userSlice = createSlice({
// //   name: 'user',
// //   initialState,
// //   reducers: {
// //     logoutUser(state) {
// //       state.user = null;
// //       state.isAuthenticated = false;
// //       localStorage.removeItem('token');
// //       toast.info('Logged out successfully');
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.user = action.payload;
// //         state.isAuthenticated = true;
// //         state.isLoading = false;
// //         toast.success('Login successful! 🚀');
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload;
// //       })
// //       .addCase(registerUser.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(registerUser.fulfilled, (state, action) => {
// //         state.user = action.payload;
// //         state.isAuthenticated = true;
// //         state.isLoading = false;
// //         toast.success('Register successful! 🚀');
// //       })
// //       .addCase(registerUser.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     // logoutUser(state) {
//     //   state.user = null;
//     //   state.isAuthenticated = false;
//     //   localStorage.removeItem('user');  // Remove user data
//     //   localStorage.removeItem('token'); // Remove token
//     //   toast.info('Logged out successfully');
//     // },
//     logoutUser(state) {
//       state.user = {};  
//       state.isAuthenticated = false;
//       localStorage.removeItem('user');  
//       localStorage.removeItem('token'); 
//       toast.info('Logged out successfully');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.isLoading = false;

//         // ✅ Store user data in localStorage
//         // localStorage.setItem('user', JSON.stringify(action.payload.message));
//         // localStorage.setItem('token', action.payload.token);

//         toast.success('Login successful!');
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
      
//   },
// });


// // Actions and Reducer Export
// export const { logoutUser } = userSlice.actions;
// export default userSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from '../Apis/apiHandlers';

export const loginUser = createAsyncThunk("user/loginUser", async (loginData, { rejectWithValue }) => {
  try {
    const response = await Login(loginData);
    localStorage.setItem("token", response.acess_token);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    token: localStorage.getItem("authToken") || null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken"); // Clear token on logout
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

