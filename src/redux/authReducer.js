import { createSlice } from "@reduxjs/toolkit";

// 초기 상태
const initialState = {
  isLoggedIn: false
};

const loginStateSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    // 리듀서 함수 생성
    getLoginSuccess(state, action) {
      state.isLoggedIn = true; // 로그인 성공 시 isLoggedIn을 true로 설정
    },

    getLoginFailed(state, action) {
      state.isLoggedIn = false; // 로그인 실패 시 isLoggedIn을 false로 설정
    },
  }
});

// 리듀서와 액션 생성 함수를 내보냄
export const { getLoginSuccess, getLoginFailed } = loginStateSlice.actions;
export default loginStateSlice.reducer;
