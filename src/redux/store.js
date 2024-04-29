import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root", // 로컬 스토리지에 저장되는 키
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        login: persistedReducer // persistReducer로 감싼 reducer를 사용
    }
});

const persistor = persistStore(store);

export { store, persistor }; // store와 persistor를 개별적으로 export
