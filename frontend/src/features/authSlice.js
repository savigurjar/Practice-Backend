// // src/features/authSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosClient from "../utils/axiosClient";

// /* -------------------- ASYNC THUNKS -------------------- */

// // Register user
// export const registerUser = createAsyncThunk(
//   "auth/signup",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post("/user/register", userData);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Registration failed"
//       );
//     }
//   }
// );

// // Login user
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post("/user/login", credentials);
//       console.log("Login response:", response.data);
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Login failed"
//       );
//     }
//   }
// );



// // Check authentication status
// export const checkAuth = createAsyncThunk(
//   "auth/check",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.get("/user/check");
//       return response.data.user || null;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Auth check failed"
//       );
//     }
//   }
// );

// // Logout user
// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post("/user/logout");
//       return null;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Logout failed"
//       );
//     }
//   }
// );

// // src/features/authSlice.js

// // Forgot password
// export const forgotPassword = createAsyncThunk(
//   "auth/forgotPassword",
//   async (data, { rejectWithValue }) => {
//     try {
//       // Backend route is '/user/forgetPassword'
//       const response = await axiosClient.post("/user/forgot-password", data);
//       return response.data.message; // backend returns a success message
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || error.message || "Forgot password failed"
//       );
//     }
//   }
// );
// // authSlice.js
// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async ({ token, password }, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post(`/user/reset-password/${token}`, { password });
//       return response.data.message;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );



// /* -------------------- SLICE -------------------- */
// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   checkingAuth: true,
//   error: null,
//   registerSuccess: false,
//   forgotPasswordMessage: null, // <-- NEW
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetRegisterSuccess: (state) => {
//       state.registerSuccess = false;
//     },
//     clearError: (state) => {
//       state.error = null;
//       state.forgotPasswordMessage = null; // <-- also clear success message
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* -------- REGISTER -------- */
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.registerSuccess = false;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = !!action.payload;
//         state.registerSuccess = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.registerSuccess = false;
//         state.error = action.payload;
//       })

//       /* -------- LOGIN -------- */
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = !!action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = action.payload?.message || 'Login failed';
//       })

//       /* -------- FORGOT PASSWORD -------- */
//       .addCase(forgotPassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.forgotPasswordMessage = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.forgotPasswordMessage = action.payload; // show success message
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.forgotPasswordMessage = null;
//       })

//       /* -------- CHECK AUTH -------- */
//       .addCase(checkAuth.pending, (state) => {
//         state.checkingAuth = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.checkingAuth = false;
//         state.user = action.payload;
//         state.isAuthenticated = !!action.payload;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.checkingAuth = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       /* -------- LOGOUT -------- */
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetRegisterSuccess, clearError } = authSlice.actions;
// export default authSlice.reducer;


// src/features/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

/* -------------------- LOCAL STORAGE HELPERS -------------------- */
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        checkingAuth: true,
        error: null,
        registerSuccess: false,
        forgotPasswordMessage: null,
      };
    }
    const state = JSON.parse(serializedState);
    // Don't restore checkingAuth from localStorage
    return { ...state, checkingAuth: true };
  } catch (err) {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      checkingAuth: true,
      error: null,
      registerSuccess: false,
      forgotPasswordMessage: null,
    };
  }
};

const saveAuthState = (state) => {
  try {
    // Only save essential data, exclude loading states
    const stateToSave = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      error: state.error,
      registerSuccess: state.registerSuccess,
      forgotPasswordMessage: state.forgotPasswordMessage,
    };
    localStorage.setItem("authState", JSON.stringify(stateToSave));
  } catch (err) {
    console.error("Could not save auth state", err);
  }
};

/* -------------------- ASYNC THUNKS -------------------- */

// Register user
export const registerUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/login", credentials);
      console.log("Login response:", response.data);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// Check authentication status
export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/user/check");
      return response.data.user || null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Auth check failed"
      );
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("/user/logout");
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Logout failed"
      );
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/forgot-password", data);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Forgot password failed"
      );
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/user/reset-password/${token}`, { password });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* -------------------- SLICE -------------------- */
const initialState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegisterSuccess: (state) => {
      state.registerSuccess = false;
      saveAuthState(state);
    },
    clearError: (state) => {
      state.error = null;
      state.forgotPasswordMessage = null;
      saveAuthState(state);
    },
    // Add a new action to manually update auth state
    updateAuthState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      saveAuthState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- REGISTER -------- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.registerSuccess = true;
        state.error = null;
        saveAuthState(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.registerSuccess = false;
        state.error = action.payload;
        saveAuthState(state);
      })

      /* -------- LOGIN -------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
        saveAuthState(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || 'Login failed';
        saveAuthState(state);
      })

      /* -------- FORGOT PASSWORD -------- */
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.forgotPasswordMessage = action.payload;
        saveAuthState(state);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.forgotPasswordMessage = null;
        saveAuthState(state);
      })

      /* -------- CHECK AUTH -------- */
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkingAuth = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        saveAuthState(state);
      })
      .addCase(checkAuth.rejected, (state) => {
        state.checkingAuth = false;
        state.user = null;
        state.isAuthenticated = false;
        saveAuthState(state);
      })

      /* -------- LOGOUT -------- */
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        // Clear localStorage on logout
        localStorage.removeItem("authState");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        saveAuthState(state);
      });
  },
});

export const { resetRegisterSuccess, clearError, updateAuthState } = authSlice.actions;
export default authSlice.reducer;
